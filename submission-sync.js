import { firebaseConfig, configured } from './firebase-config.js';
const QUEUE = 'busbasePendingVehicleChecks';
let busy = false;
const getQueue = () => { try { const v=JSON.parse(localStorage.getItem(QUEUE)||'[]'); return Array.isArray(v)?v:[]; } catch { return []; } };
const setQueue = arr => localStorage.setItem(QUEUE,JSON.stringify(arr));
function notice(message,problem=false){
  let el=document.getElementById('syncNotice');
  if(!el){ el=document.createElement('div');el.id='syncNotice';el.style.cssText='position:fixed;bottom:16px;left:16px;right:16px;max-width:450px;margin:auto;z-index:200;padding:13px 17px;border-radius:10px;box-shadow:0 12px 36px #0009;font:600 13px system-ui;';document.body.appendChild(el); }
  el.style.background=problem?'#5b2225':'#173d2c';el.style.color='white';el.textContent=message;
}
window.addEventListener('busbase-check-completed',e=>{
  const report=structuredClone(e.detail);
  const queue=getQueue();queue.push(report);setQueue(queue);
  if(!configured){notice('Saved on this device. Supervisor sync needs Firebase setup.',true);return;}
  flush();
});
if(configured){window.addEventListener('online',flush);flush();}
async function flush(){
  if(!configured||busy||!getQueue().length)return;
  busy=true;
  try{
    const [{initializeApp},{getAuth,signInAnonymously},{getFirestore,doc,setDoc}] = await Promise.all([
      import('https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js'),
      import('https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js'),
      import('https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js')
    ]);
    const app=initializeApp(firebaseConfig);
    const auth=getAuth(app);
    if(!auth.currentUser) await signInAnonymously(auth);
    const db=getFirestore(app);
    let queue=getQueue();
    while(queue.length){
      const report=queue[0];
      const id=`${auth.currentUser.uid}_${report.id}`;
      // A stable id makes upload retries idempotent. Store the full checklist snapshot.
      await setDoc(doc(db,'vehicleChecks',id),{...report,submittedBy:auth.currentUser.uid,receivedAt:new Date().toISOString()});
      queue.shift();setQueue(queue);
      notice('Vehicle check received by supervisor system.');
    }
  }catch(err){console.error('Vehicle check sync:',err);notice('Check saved locally; supervisor upload pending. Open this page again when connected.',true);}
  finally{busy=false;}
}
