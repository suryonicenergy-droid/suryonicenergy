const menu=document.querySelector('.menu'),hamb=document.querySelector('.hamb');
if(hamb&&menu){
  const closeMenu=()=>{menu.classList.remove('open');hamb.setAttribute('aria-expanded','false')};
  hamb.setAttribute('aria-expanded','false');
  hamb.onclick=()=>{const open=menu.classList.toggle('open');hamb.setAttribute('aria-expanded',String(open))};
  document.querySelectorAll('.menu a').forEach(a=>a.addEventListener('click',closeMenu));
  document.addEventListener('click',e=>{if(menu.classList.contains('open')&&!menu.contains(e.target)&&e.target!==hamb)closeMenu()});
}

const getReviews=()=>{try{return JSON.parse(localStorage.getItem('suryonicReviews')||'[]')}catch{return []}};
function escapeHTML(s){return String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
function submitReview(e){e.preventDefault();const f=new FormData(e.target),file=f.get('photo');const save=photo=>{const r={id:Date.now(),name:f.get('name'),location:f.get('location'),rating:Number(f.get('rating')),text:f.get('text'),photo:photo||'',status:'pending',createdAt:new Date().toISOString()};const arr=getReviews();arr.push(r);localStorage.setItem('suryonicReviews',JSON.stringify(arr));const m=document.getElementById('reviewMsg');if(m)m.innerHTML='<div class="success">Thank you! Your review is submitted. It will appear on the website after admin approval.</div>';e.target.reset()};if(file&&file.size){const reader=new FileReader();reader.onload=()=>save(reader.result);reader.readAsDataURL(file)}else save('')}
function showApprovedReviews(){const box=document.getElementById('approvedReviews');if(!box)return;const approved=getReviews().filter(r=>r.status==='approved');box.innerHTML=approved.length?approved.map(r=>`<div class="card review"><div class="stars">${'★'.repeat(Math.min(5,Math.max(0,r.rating)))}${'☆'.repeat(5-Math.min(5,Math.max(0,r.rating)))}</div><b>${escapeHTML(r.name)}</b><div class="small">${escapeHTML(r.location)}</div>${r.photo?`<img class="review-photo" src="${r.photo}" alt="Customer photo" loading="lazy">`:''}<p>${escapeHTML(r.text)}</p></div>`).join(''):'<div class="notice">Customer reviews will appear here after approval.</div>'}
showApprovedReviews();
function calcSolar(){const units=Number(document.getElementById('units')?.value||0);const kw=units<=0?0:units<=150?1:units<=300?2:units<=450?3:units<=600?4:5;const el=document.getElementById('calcResult');if(el)el.innerHTML=kw?`Indicative system size: <strong>${kw} kW</strong><br><span class="small">Final sizing depends on site, roof, load and generation assessment.</span>`:'Enter monthly units to calculate.'}

(function(){
 const reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 document.querySelectorAll('img').forEach((img,i)=>{if(i>0&&!img.loading)img.loading='lazy'});
 const targets=document.querySelectorAll('main > section:not(.hero), .grid > .card, .grid4 > .card, .project-card, .price-card, .stat, .contact-box, .review, .brand-strip span');
 targets.forEach((el,i)=>{el.classList.add('reveal');if(i%5===1)el.classList.add('from-left');if(i%5===3)el.classList.add('from-right')});
 const reveals=document.querySelectorAll('.reveal');
 if(reduced)reveals.forEach(el=>el.classList.add('show'));
 else if('IntersectionObserver' in window){const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('show');io.unobserve(entry.target)}}),{threshold:.10,rootMargin:'0px 0px -35px'});reveals.forEach(el=>io.observe(el))}else reveals.forEach(el=>el.classList.add('show'));
 document.querySelectorAll('.stat b').forEach(el=>{const raw=el.textContent.trim(),m=raw.match(/^(\d+)(.*)$/);if(!m)return;const target=Number(m[1]),suffix=m[2]||'';if(reduced||target===0)return;el.textContent='0'+suffix;let started=false;const start=()=>{if(started)return;started=true;const duration=1250,t0=performance.now(),tick=now=>{const p=Math.min((now-t0)/duration,1),ease=1-Math.pow(1-p,3);el.textContent=Math.round(target*ease)+suffix;if(p<1)requestAnimationFrame(tick)};requestAnimationFrame(tick)};if('IntersectionObserver' in window){const o=new IntersectionObserver(es=>{if(es.some(x=>x.isIntersecting)){start();o.disconnect()}},{threshold:.45});o.observe(el)}else start()});
 let ticking=false;const onScroll=()=>{if(ticking)return;ticking=true;requestAnimationFrame(()=>{document.documentElement.classList.toggle('nav-scrolled',scrollY>18);ticking=false})};addEventListener('scroll',onScroll,{passive:true});onScroll();
 if(!location.pathname.endsWith('admin.html')&&!document.querySelector('.float')){const call=document.createElement('a');call.className='float callfloat';call.href='tel:+918797711255';call.setAttribute('aria-label','Call Suryonic Energy');call.textContent='☎';const wa=document.createElement('a');wa.className='float';wa.href='https://wa.me/918797711255';wa.target='_blank';wa.rel='noopener';wa.setAttribute('aria-label','WhatsApp Suryonic Energy');wa.textContent='✆';document.body.append(call,wa)}
})();
