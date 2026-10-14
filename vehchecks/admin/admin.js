import {canOpenPage} from '../page-access.js';
import {$,auth,db,roles,roleRank,managers,reviewers,catalogueEditors,connectLogin,status,errorText,call,esc,collection,query,orderBy,limit,getDocs,dateText,badge,showReport,wireReport} from '../shared.js';
import {updatePassword} from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js';
import {defaultVehicleTypes} from '../vehicle-defaults.js';
let profile=null,reports=[],staff=[],selectedReport=null,selectedStaff=null,catalogue={...defaultVehicleTypes};
const allowedRoles=()=>Object.keys(roles).filter(r=>profile.role==='general_manager'||roleRank[r]<roleRank[profile.role]);
const mayManage=p=>p.uid!==profile.uid&&(profile.role==='general_manager'||roleRank[p.role]<roleRank[profile.role]);
const currentPage=document.body.dataset.page||'dashboard';
function openCurrentPage(){
 ['reports','staff','catalogue','permissions','dashboard'].forEach(t=>$(t+'Panel').hidden=t!==currentPage);
 $('dashboardStats').hidden=!['dashboard','reports'].includes(currentPage)||!canOpenPage(profile.role,'reports');
 if(currentPage==='staff')loadStaff();
 if(currentPage==='catalogue')loadCatalogue();
 if(['dashboard','reports'].includes(currentPage)&&canOpenPage(profile.role,'reports'))loadReports();
}
connectLogin(p=>{
 profile=p;reports=[];staff=[];selectedStaff=null;selectedReport=null;
 $('reportRows').innerHTML='';$('staffRows').innerHTML='';
 ['totalStat','pendingStat','holdStat'].forEach(id=>$(id).textContent='—');
 if($('reportDialog').open)$('reportDialog').close();if($('staffDialog').open)$('staffDialog').close();
 if(!p)return;
 if(!canOpenPage(p.role,currentPage)){
  $('workspace').hidden=true;
  status('Your '+roles[p.role]+' role cannot open this page. Use Driver checks to return to your vehicle checks.');
  return;
 }
 document.querySelectorAll('[data-page-link]').forEach(link=>{link.hidden=!canOpenPage(p.role,link.dataset.pageLink);link.classList.toggle('active',link.dataset.pageLink===currentPage);if(link.dataset.pageLink===currentPage)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');});
 document.querySelectorAll('[data-feature]').forEach(link=>link.hidden=!canOpenPage(p.role,link.dataset.feature));
 $('roleDescription').textContent='Signed in as '+roles[p.role]+' · @'+p.discordUsername;
 $('permissionList').innerHTML=[['Submit vehicle checks',true],['View all vehicle reports',canOpenPage(p.role,'reports')],['Record report reviews',reviewers.includes(p.role)],['Create and manage staff accounts',managers.includes(p.role)],['Edit vehicle types and checklists',catalogueEditors.includes(p.role)]].map(([label,yes])=>`<div class="review-line"><span>${label}</span><span class="pill ${yes?'green':''}">${yes?'Allowed':'Not allowed'}</span></div>`).join('');
 $('newRole').innerHTML=allowedRoles().map(role=>`<option value="${role}">${roles[role]}</option>`).join('');$('newRole').value='driver';
 openCurrentPage();
});
async function loadReports(){if(!profile)return;const uid=profile.uid;$('reportRows').innerHTML='<tr><td colspan="6" class="empty">Loading reports…</td></tr>';try{const s=await getDocs(query(collection(db,'vehicleChecks'),orderBy('date','desc'),limit(300)));if(profile?.uid!==uid)return;reports=s.docs.map(d=>({id:d.id,...d.data()}));$('totalStat').textContent=reports.length;$('pendingStat').textContent=reports.filter(r=>r.status==='submitted').length;$('holdStat').textContent=reports.filter(r=>r.status==='hold').length;drawReports();}catch(e){$('reportRows').innerHTML='<tr><td colspan="6" class="empty">Reports could not load.</td></tr>';status(errorText(e));}}
function drawReports(){const term=$('searchReports').value.toLowerCase(),filter=$('filterStatus').value;const rows=reports.filter(r=>(!filter||r.status===filter)&&[r.discordUsername,r.driverName,r.name,r.fleetNumber,r.fleet,r.registration,r.route,r.duty].join(' ').toLowerCase().includes(term));$('reportRows').innerHTML=rows.map(r=>`<tr><td><strong>${esc(r.fleetNumber||r.fleet||'—')}</strong><small>${esc(r.registration||'')}</small></td><td>${esc(r.discordUsername?'@'+r.discordUsername:r.driverName||r.name||'Legacy record')}</td><td>${esc(r.duty||'—')} / ${esc(r.route||'—')}</td><td>${esc(dateText(r.date))}</td><td>${badge(r.status)}</td><td><button data-id="${esc(r.id)}">Open</button></td></tr>`).join('')||'<tr><td colspan="6" class="empty">No reports match.</td></tr>';}
$('searchReports').oninput=drawReports;$('filterStatus').onchange=drawReports;$('refreshReports').onclick=loadReports;$('reportRows').onclick=e=>{const b=e.target.closest('[data-id]');if(!b)return;selectedReport=reports.find(r=>r.id===b.dataset.id);showReport(selectedReport,reviewers.includes(profile.role));};wireReport();
$('reviewForm').onsubmit=async e=>{e.preventDefault();$('reviewButton').disabled=true;try{await call('reviewVehicleCheck',{id:selectedReport.id,status:$('reviewStatus').value,note:$('reviewNote').value.trim()});$('reportDialog').close();await loadReports();status('Report review saved.',true);}catch(err){status(errorText(err));}finally{$('reviewButton').disabled=false;}};
async function loadStaff(){if(!profile||!managers.includes(profile.role))return;const uid=profile.uid;$('staffRows').innerHTML='<tr><td colspan="4" class="empty">Loading staff…</td></tr>';try{const s=await getDocs(collection(db,'staff'));if(profile?.uid!==uid)return;staff=s.docs.map(d=>({uid:d.id,...d.data()})).sort((a,b)=>(b.active-a.active)||((roleRank[b.role]||0)-(roleRank[a.role]||0)));$('staffRows').innerHTML=staff.map(p=>`<tr><td><strong>@${esc(p.discordUsername)}</strong><small>${esc(p.email)}</small></td><td>${esc(roles[p.role])}</td><td><span class="pill ${p.active?'green':'red'}">${p.active?'Active':'Disabled'}</span></td><td>${mayManage(p)?`<button data-uid="${esc(p.uid)}">Manage</button>`:'—'}</td></tr>`).join('');}catch(e){status(errorText(e));}}
$('refreshStaff').onclick=loadStaff;
$('createStaffForm').onsubmit=async e=>{e.preventDefault();$('createStaffButton').disabled=true;try{await call('createStaffAccount',{discordUsername:$('newDiscord').value.trim(),email:$('newEmail').value.trim(),role:$('newRole').value,password:$('newPassword').value});$('createStaffForm').reset();$('newRole').value='driver';await loadStaff();status('Account created. Give the member their sign-in details privately.',true);}catch(err){status(errorText(err));}finally{$('newPassword').value='';$('createStaffButton').disabled=false;}};
$('staffRows').onclick=e=>{const b=e.target.closest('[data-uid]');if(!b)return;selectedStaff=staff.find(p=>p.uid===b.dataset.uid);$('editDiscord').value=selectedStaff.discordUsername;$('editRole').innerHTML=allowedRoles().map(role=>`<option value="${role}">${roles[role]}</option>`).join('');$('editRole').value=selectedStaff.role;$('editActive').value=String(selectedStaff.active);$('editPassword').value='';$('staffDialog').querySelector('.dialog-status')?.remove();$('staffDialog').showModal();};$('closeStaff').onclick=()=>$('staffDialog').close();
$('editStaffForm').onsubmit=async e=>{e.preventDefault();$('saveStaffButton').disabled=true;try{await call('updateStaffAccount',{uid:selectedStaff.uid,discordUsername:$('editDiscord').value.trim(),role:$('editRole').value,active:$('editActive').value==='true',password:$('editPassword').value});$('staffDialog').close();await loadStaff();status('Staff account updated.',true);}catch(err){status(errorText(err));}finally{$('editPassword').value='';$('saveStaffButton').disabled=false;}};
async function loadCatalogue(){try{catalogue={...defaultVehicleTypes};const s=await getDocs(collection(db,'vehicleTypes'));s.forEach(d=>{if(d.data().groups)catalogue[d.id]=d.data();});$('catalogueSelect').innerHTML=Object.entries(catalogue).sort((a,b)=>a[1].name.localeCompare(b[1].name)).map(([id,v])=>`<option value="${esc(id)}">${esc(v.name)}</option>`).join('');chooseCatalogue();}catch(e){status(errorText(e));}}
function chooseCatalogue(){const id=$('catalogueSelect').value;$('catalogueId').value=id;const v=catalogue[id];$('catalogueJSON').value=JSON.stringify({name:v.name,manufacturer:v.manufacturer||'',power:v.power||'',groups:v.groups},null,2);}$('catalogueSelect').onchange=chooseCatalogue;$('newCatalogue').onclick=()=>{$('catalogueId').value='';$('catalogueJSON').value=JSON.stringify({name:'New vehicle',manufacturer:'',power:'',groups:[{title:'Exterior',description:'Walk-around checks.',checks:[['Bodywork','Check for visible damage.']]}]},null,2);$('catalogueId').focus();};
$('saveCatalogue').onclick=async()=>{$('saveCatalogue').disabled=true;try{await call('saveVehicleType',{id:$('catalogueId').value.trim(),definition:JSON.parse($('catalogueJSON').value)});await loadCatalogue();status('Vehicle type saved.',true);}catch(e){status(errorText(e));}finally{$('saveCatalogue').disabled=false;}};
$('changePasswordForm').onsubmit=async e=>{e.preventDefault();$('changePasswordButton').disabled=true;try{await updatePassword(auth.currentUser,$('ownPassword').value);status('Your password has been changed.',true);}catch(err){status(errorText(err));}finally{$('ownPassword').value='';$('changePasswordButton').disabled=false;}};
