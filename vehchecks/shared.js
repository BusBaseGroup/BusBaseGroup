import {welcomeText} from './greeting.js';
import {workerURL} from './worker-config.js';
import {initializeApp,deleteApp} from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js';
import {getAuth,onAuthStateChanged,signInWithEmailAndPassword,signOut,sendPasswordResetEmail,updatePassword,createUserWithEmailAndPassword,setPersistence,inMemoryPersistence} from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js';
import {getFirestore,doc,getDoc,onSnapshot,collection,query,where,orderBy,limit,getDocs} from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js';
import {firebaseConfig} from './firebase-config.js';
export const app=initializeApp(firebaseConfig),auth=getAuth(app),db=getFirestore(app);
export {onAuthStateChanged,signOut,doc,getDoc,onSnapshot,collection,query,where,orderBy,limit,getDocs};
export const roles={general_manager:'General Manager',supervisor:'Supervisor',lead_controller:'Lead Controller',controller:'Controller',junior_controller:'Junior Controller',scheduler:'Scheduler',lead_driver:'Lead Driver',driver:'Driver'};
export const managers=['general_manager','supervisor','lead_controller'];
export const reviewers=['general_manager','supervisor','lead_controller','controller'];
export const catalogueEditors=['general_manager','supervisor'];
export const roleRank={general_manager:80,supervisor:70,lead_controller:60,controller:50,junior_controller:40,scheduler:30,lead_driver:20,driver:10};
export const $=id=>document.getElementById(id);
export const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function status(message,good=false){const modal=document.querySelector('dialog[open]');let e=modal?.querySelector('.dialog-status');if(modal&&!e){e=document.createElement('div');e.className='dialog-status';e.setAttribute('role','status');modal.prepend(e);}if(!e)e=$('status');e.textContent=message;e.className=(modal?'dialog-status ':'')+'notice '+(good?'good':'error');e.hidden=false;}
export async function workerRequest(name,data,token){
 if(!/^https:\/\/[^/]+\.workers\.dev$/.test(workerURL)){const e=new Error('Configure the Worker address in worker-config.js.');e.code='functions/failed-precondition';throw e;}
 let response;try{response=await fetch(workerURL+'/api/'+encodeURIComponent(name),{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+token},body:JSON.stringify(data)});}catch{const e=new Error('The free staff service is unavailable. Check the Worker deployment and allowed website origins.');e.code='functions/unavailable';throw e;}
 let result;try{result=await response.json();}catch{throw new Error('The Worker returned an invalid response. Paste the full Worker code and deploy it.');}
 if(!response.ok||result.error){const e=new Error(result.error?.message||'Request failed.');e.code='functions/'+(result.error?.code||'internal');throw e;}return result.data;
}
export function errorText(e){if(e.code==='auth/invalid-credential')return'Email or password is incorrect.';if(e.code==='auth/too-many-requests')return'Too many attempts. Please try again later.';if(e.code==='auth/requires-recent-login')return'Sign out and sign back in before changing your password.';if(e.code==='functions/not-found'||e.code==='functions/unavailable')return'The staff service is unavailable. Your manager needs to finish the Firebase setup.';return e.message?.replace(/^Firebase:\s*/,'')||'Could not complete that action. Please try again.';
}
export async function call(name,data){if(!auth.currentUser){const e=new Error('Sign in first.');e.code='functions/unauthenticated';throw e;}return workerRequest(name,data,await auth.currentUser.getIdToken());}
export async function registerDriverAccount(email,password,discordUsername){
 const secondary=initializeApp(firebaseConfig,'driver-signup-'+Date.now());const signupAuth=getAuth(secondary);
 try{await setPersistence(signupAuth,inMemoryPersistence);let credential;try{credential=await createUserWithEmailAndPassword(signupAuth,email,password);}catch(e){if(e.code!=='auth/email-already-in-use')throw e;credential=await signInWithEmailAndPassword(signupAuth,email,password);}
  try{await workerRequest('registerDriverProfile',{discordUsername},await credential.user.getIdToken());}catch(e){if(e.code!=='functions/already-exists'||!e.message.includes('staff profile'))throw e;}
  await signInWithEmailAndPassword(auth,email,password);
 }finally{await signOut(signupAuth).catch(()=>{});await deleteApp(secondary).catch(()=>{});}
}
function firstLoginNameGate(){
 let gate=$('firstLoginNameGate');if(gate)return gate;
 gate=document.createElement('section');gate.id='firstLoginNameGate';gate.className='card login';gate.hidden=true;
 gate.innerHTML='<p class="eyebrow">Welcome to Go-Ahead London</p><h1>Please enter your name</h1><p class="muted">Before you continue, tell us the name you would like us to use.</p><form id="firstLoginNameForm"><div class="field"><label for="firstLoginName">Your name</label><input id="firstLoginName" required maxlength="100" autocomplete="given-name" placeholder="e.g. Jack"></div><button class="primary full" id="firstLoginContinue">Continue</button></form>';
 $('workspace').before(gate);
 $('firstLoginNameForm').onsubmit=async e=>{e.preventDefault();const name=$('firstLoginName').value.trim();if(!name){$('firstLoginName').setCustomValidity('Please enter your name.');$('firstLoginName').reportValidity();return;}$('firstLoginContinue').disabled=true;try{await call('updateOwnName',{fullName:name});}catch(err){status(errorText(err));}finally{$('firstLoginContinue').disabled=false;}};
 $('firstLoginName').oninput=()=>$('firstLoginName').setCustomValidity('');
 return gate;
}
export function connectLogin(onProfile){
 const nameGate=firstLoginNameGate();
 $('loginForm').addEventListener('submit',async e=>{e.preventDefault();const b=$('loginButton');b.disabled=true;try{await signInWithEmailAndPassword(auth,$('email').value.trim(),$('password').value);$('password').value='';}catch(err){status(errorText(err));}finally{b.disabled=false;}});
 $('resetPassword').onclick=async()=>{if(!$('email').value.trim()){status('Enter your account email first.');return;}try{await sendPasswordResetEmail(auth,$('email').value.trim());status('If that account exists, a password reset email has been sent.',true);}catch(e){status(errorText(e));}};
 $('signOut').onclick=()=>signOut(auth);
 let unsubscribe;let generation=0;
 onAuthStateChanged(auth,user=>{generation++;unsubscribe?.();unsubscribe=null;const current=generation;$('status').hidden=true;$('login').hidden=!!user;if($('driverSignup'))$('driverSignup').hidden=true;$('workspace').hidden=true;$('signOut').hidden=!user;$('account').textContent='';nameGate.hidden=true;$('firstLoginName').value='';onProfile(null);
 if(!user)return;
 unsubscribe=onSnapshot(doc(db,'staff',user.uid),snap=>{if(current!==generation)return;const p=snap.exists()?{...snap.data(),uid:user.uid}:null;if(!p||!p.active){$('workspace').hidden=true;onProfile(null);status('This account has no active staff profile. Contact your Supervisor, Lead Controller or General Manager.');return;}if(p.nameConfirmed!==true||typeof p.fullName!=='string'||!p.fullName.trim()){nameGate.hidden=false;$('firstLoginName').value=typeof p.fullName==='string'?p.fullName:'';$('workspace').hidden=true;$('account').textContent='@'+p.discordUsername;onProfile(null);$('firstLoginName').focus();return;}nameGate.hidden=true;$('welcomeMessage').textContent=welcomeText(p.fullName||p.discordUsername);$('welcomeRole').textContent=roles[p.role]||p.role;$('account').textContent='@'+p.discordUsername+' · '+(roles[p.role]||p.role);if($('assignedRoleBanner'))$('assignedRoleBanner').textContent='Your assigned role: '+(roles[p.role]||p.role)+' · @'+p.discordUsername;$('workspace').hidden=false;$('status').hidden=true;onProfile(p);},e=>{if(current!==generation)return;status(errorText(e));});
 });
}
export function dateText(value){if(!value)return'—';const d=value.toDate?.()||new Date(value);return Number.isNaN(d.getTime())?String(value):d.toLocaleString('en-GB');}
export function badge(status){const labels={submitted:'Awaiting review',reviewed:'Reviewed',hold:'Do not use',resolved:'Resolved'};const color=status==='hold'?'red':status==='resolved'?'green':'amber';return`<span class="pill ${color}">${esc(labels[status]||status||'Legacy report')}</span>`;}
export function showReport(report,canReview=false){
 const legacy=!Array.isArray(report.answers);const answers=Array.isArray(report.answers)?report.answers:[];
 $('reportContent').innerHTML=`<p class="eyebrow">Vehicle check record</p><h2>${esc(report.fleetNumber||report.fleet||report.registration||'Vehicle report')} <span class="muted">${esc(report.registration||'')}</span></h2><p class="report-id">${esc(report.id)}</p><div class="meta"><div><small>Name</small><strong>${esc(report.staffName||report.driverName||report.name||'Not recorded')}</strong></div><div><small>Discord username</small><strong>${esc(report.discordUsername?'@'+report.discordUsername:report.driverName||report.name||'Legacy record')}</strong></div><div><small>Staff role</small><strong>${esc(roles[report.driverRole]||report.driverRole||'Not recorded')}</strong></div><div><small>Vehicle</small><strong>${esc(report.vehicleName||report.vehicleType||'—')}</strong></div><div><small>Submitted</small><strong>${esc(dateText(report.date))}</strong></div><div><small>Duty / route</small><strong>${esc(report.duty||'—')} / ${esc(report.route||'—')}</strong></div><div><small>Depot</small><strong>${esc(report.depot||'—')}</strong></div><div><small>Driver assessment</small><strong>${esc(report.vehicleStatus||'—')}</strong></div></div>${badge(report.status)}<p style="margin-top:16px">${esc(report.notes||'No additional notes.')}</p>${answers.map(a=>`<div class="review-line"><div><strong>${esc(a.title)}</strong><p>${esc(a.note||'')}</p></div><span class="pill ${a.result==='defect'?'red':a.result==='pass'?'green':''}">${esc(a.result==='na'?'Not applicable':a.result)}</span></div>`).join('')}${legacy?'<p class="notice">This report uses the previous format. Its saved data is shown below.</p><pre style="white-space:pre-wrap;overflow-wrap:anywhere">'+esc(JSON.stringify(report,null,2))+'</pre>':''}<h3 style="margin-top:24px">Review history</h3>${(report.reviewHistory||[]).map(x=>`<div class="review-line"><div><strong>${esc(x.by)}</strong><p>${esc(x.note)}</p><small>${esc(dateText(x.date))}</small></div>${badge(x.status)}</div>`).join('')||'<p class="muted">No staff reviews yet.</p>'}`;
 $('reportDialog').querySelector('.dialog-status')?.remove();$('reviewForm').hidden=!canReview;$('reviewNote').value='';$('reviewStatus').value='reviewed';$('reportDialog').showModal();
}
export function wireReport(){ $('closeReport').onclick=()=>$('reportDialog').close();$('printReport').onclick=()=>window.print();$('downloadReport').onclick=()=>{const content='<!doctype html><html><head><meta charset="utf-8"><title>Vehicle check report</title><style>body{font:15px/1.6 system-ui;max-width:900px;padding:35px;margin:auto}small,.muted{color:#63717c}.meta{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}.meta small{display:block}.review-line{border-bottom:1px solid #ddd;padding:12px 0;display:flex;justify-content:space-between;gap:20px}.pill{padding:4px 8px;background:#eee;border-radius:4px}.red{color:#a51229}.green{color:#197149}pre{white-space:pre-wrap}</style></head><body>'+$('reportContent').innerHTML+'</body></html>';const url=URL.createObjectURL(new Blob([content],{type:'text/html'}));const a=document.createElement('a');a.href=url;a.download='vehicle-check-report.html';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};}
