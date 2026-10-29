
function toggleMenu(){document.querySelector('.menu')?.classList.toggle('open')}
function calcSolar(){const u=Number(document.getElementById('units')?.value||0);const kw=Math.max(1,Math.ceil(u/110));const annual=kw*110*12;const el=document.getElementById('result');if(el)el.innerHTML=`Estimated size: <strong>${kw} kW</strong><br><small>Approx. annual generation benchmark: ${annual.toLocaleString()} units. Actual generation varies by site and system.</small>`}
