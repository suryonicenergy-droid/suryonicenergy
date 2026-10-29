

function openLeadPopup(){const p=document.getElementById("leadPopup");if(p){p.classList.add("show");p.setAttribute("aria-hidden","false");}}
function closeLeadPopup(){const p=document.getElementById("leadPopup");if(p){p.classList.remove("show");p.setAttribute("aria-hidden","true");}}
document.addEventListener("click",e=>{const p=document.getElementById("leadPopup");if(p&&e.target===p)closeLeadPopup();});
document.addEventListener("DOMContentLoaded",()=>{
  const f=document.getElementById("leadForm");
  if(f) f.addEventListener("submit",e=>{
    e.preventDefault();
    const d=new FormData(f);
    const name=d.get("name"), mobile=d.get("mobile"), city=d.get("city"), req=d.get("requirement");
    const msg=`Solar Enquiry%0AName: ${encodeURIComponent(name)}%0AMobile: ${encodeURIComponent(mobile)}%0ACity: ${encodeURIComponent(city)}%0ARequirement: ${encodeURIComponent(req)}`;
    window.open(`https://wa.me/919905281688?text=${msg}`,"_blank");
    closeLeadPopup();
  });
});
