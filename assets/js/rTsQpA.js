// Aplica color de marca y WhatsApp
(function initBrand(){
document.querySelector(':root').style.setProperty('--violeta', BRAND.color);
const waFab = document.getElementById('waFab');
waFab.href = `https://wa.me/${BRAND.phone}`;
const waFooter = document.getElementById('waFooter');
waFooter.href = `https://wa.me/${BRAND.phone}`;
const logo = document.getElementById('logo');
logo.src = LOGO_URL;
})();


// ===== Banner rotativo =====
(function heroRotator(){
const hero = document.getElementById('heroImg');
const dots = document.getElementById('heroDots');
let idx = 0;
function setHero(i){
idx = i; hero.src = BANNERS[i];
[...dots.children].forEach((c,k)=>c.classList.toggle('active',k===i));
}
BANNERS.forEach((_,i)=>{
const d=document.createElement('div'); d.className='dot'+(i===0?' active':''); d.addEventListener('click',()=>setHero(i)); dots.appendChild(d);
});
setHero(0);
setInterval(()=>{ idx=(idx+1)%BANNERS.length; setHero(idx); }, 3800);
})();


// Helpers
const fmt = n => n.toLocaleString('es-AR',{style:'currency',currency:'ARS'});


// ===== Categorías y productos =====
const catsEl = document.getElementById('cats');
const chipsEl = document.getElementById('chips');
const gridEl = document.getElementById('grid');
let currentCat = null; let currentSub = null;


function renderCats(){
catsEl.innerHTML = '';
CATEGORIES.forEach(c=>{
const el = document.createElement('div'); el.className='cat';
el.innerHTML = `<img src="${c.banner}" alt="${c.nombre}"><div class="ttl">${c.nombre}</div>`;
el.addEventListener('click',()=>toggleCat(c));
catsEl.appendChild(el);
});
}


function toggleCat(c){
if(currentCat && currentCat.id===c.id){ // cerrar
currentCat = null; currentSub=null; chipsEl.style.display='none'; chipsEl.innerHTML=''; renderGrid(PRODUCTS); return;
}
currentCat = c; currentSub = null;
chipsEl.style.display='flex'; chipsEl.innerHTML='';
const all = document.createElement('div'); all.className='chip active'; all.textContent='Todo';
all.addEventListener('click',()=>{currentSub=null;setActiveChip(all); renderGrid(filterProducts())}); chipsEl.appendChild(all);
(c.subcats||[]).forEach(sc=>{
const chip=document.createElement('div'); chip.className='chip'; chip.textContent=sc;
chip.addEventListener('click',()=>{currentSub=sc; setActiveChip(chip); renderGrid(filterProducts())}); chipsEl.appendChild(chip);
});
renderGrid(filterProducts());
chipsEl.scrollIntoView({behavior:'smooth'});
}


function setActiveChip(active){
[...chipsEl.children].forEach(ch=>ch.classList.toggle('active', ch===active));
}


function filterProducts(){
renderCart();