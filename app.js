
const BACKEND_READY=false; // Firebase/Supabase connect karne ke baad true karein.
function toggleMenu(){document.querySelector('.menu')?.classList.toggle('open')}
function validMobile(v){return /^[6-9][0-9]{9}$/.test(v)}
function saveLead(prefix,source){
 const n=document.getElementById(prefix+'Name'),m=document.getElementById(prefix+'Mobile'),msg=document.getElementById(prefix+'Msg');
 if(!n||!m)return;
 if(!n.value.trim()){msg.className='error';msg.textContent='Please enter your name.';return}
 if(!validMobile(m.value.trim())){msg.className='error';msg.textContent='Please enter a valid 10-digit Indian mobile number.';return}
 if(!BACKEND_READY){msg.className='success';msg.textContent='Form ready hai. Permanent saving backend connect hote hi active hogi.';return}
}
function closeLead(){document.getElementById('leadModal')?.classList.remove('show');sessionStorage.setItem('leadClosed','1')}
window.addEventListener('DOMContentLoaded',()=>{
 setTimeout(()=>{if(!sessionStorage.getItem('leadClosed'))document.getElementById('leadModal')?.classList.add('show')},4500);
});
function calcSolar(){
 const units=Number(document.getElementById('units')?.value||0),bill=Number(document.getElementById('bill')?.value||0);
 const out=document.getElementById('calcResult');
 if(units<=0 && bill<=0){out.innerHTML='Monthly units ya electricity bill enter karein.';return}
 let estUnits=units>0?units:Math.max(1,Math.round(bill/7));
 let kw=Math.max(1,Math.ceil(estUnits/120));
 let genLow=kw*110,genHigh=kw*140;
 out.innerHTML='<b>Indicative system size: '+kw+' kW</b><br>Approx. generation range: '+genLow+'–'+genHigh+' units/month.<br><small>Actual sizing roof, location, sanctioned load, shadow and consumption profile par depend karega. Final recommendation site assessment ke baad.</small>';
}
