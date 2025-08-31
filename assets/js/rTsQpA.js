// Inicializa marca
(function initBrand(){
  document.querySelector(':root').style.setProperty('--violeta', BRAND.color);
  document.getElementById('waFab').href = `https://wa.me/${BRAND.phone}`;
  document.getElementById('waFooter').href = `https://wa.me/${BRAND.phone}`;
  document.getElementById('logo').src = LOGO_URL;
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
    const d=document.createElement('div');
    d.className='dot'+(i===0?' active':'');
    d.addEventListener('click',()=>setHero(i));
    dots.appendChild(d);
  });
  setHero(0);
  setInterval(()=>{ idx=(idx+1)%BANNERS.length; setHero(idx); }, 3800);
})();

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
  if(currentCat && currentCat.id===c.id){
    currentCat=null; currentSub=null; chipsEl.style.display='none'; chipsEl.innerHTML=''; renderGrid(PRODUCTS); return;
  }
  currentCat=c; currentSub=null;
  chipsEl.style.display='flex'; chipsEl.innerHTML='';
  const all=document.createElement('div'); all.className='chip active'; all.textContent='Todo';
  all.addEventListener('click',()=>{currentSub=null;setActiveChip(all); renderGrid(filterProducts())}); chipsEl.appendChild(all);
  (c.subcats||[]).forEach(sc=>{
    const chip=document.createElement('div'); chip.className='chip'; chip.textContent=sc;
    chip.addEventListener('click',()=>{currentSub=sc; setActiveChip(chip); renderGrid(filterProducts())}); chipsEl.appendChild(chip);
  });
  renderGrid(filterProducts());
  chipsEl.scrollIntoView({behavior:'smooth'});
}
function setActiveChip(active){ [...chipsEl.children].forEach(ch=>ch.classList.toggle('active', ch===active)); }
function filterProducts(){ return PRODUCTS.filter(p=> p.cat===currentCat.id && (!currentSub || p.sub===currentSub)); }

function renderGrid(list){
  const q=document.getElementById('search').value.trim().toLowerCase();
  const filtered=list.filter(p=>!q||p.nombre.toLowerCase().includes(q)||p.codigo.toLowerCase().includes(q));
  gridEl.innerHTML='';
  if(filtered.length===0){ gridEl.innerHTML='<div class="note">No hay resultados para tu búsqueda.</div>'; return; }
  filtered.forEach(p=>{
    const el=document.createElement('div'); el.className='card';
    el.innerHTML=`
      <img src="${p.img}" alt="${p.nombre}">
      <div class="info">
        <div class="name">${p.nombre}</div>
        <div class="code">Cod. ${p.codigo}</div>
        <div class="price">${fmt(p.precio)}</div>
        ${p.desc?`<div class="desc">${p.desc}</div>`:''}
        <button class="add">Agregar</button>
      </div>`;
    el.querySelector('.add').addEventListener('click',()=>addToCart(p));
    gridEl.appendChild(el);
  });
}
document.getElementById('search').addEventListener('input',()=>{ const base=currentCat?filterProducts():PRODUCTS; renderGrid(base); });

// ===== Carrito =====
const panel=document.getElementById('panel');
const cartCount=document.getElementById('cartCount');
const cartItemsEl=document.getElementById('cartItems');
const cartItemsCount=document.getElementById('cartItemsCount');
const cartTotal=document.getElementById('cartTotal');
let CART=JSON.parse(localStorage.getItem('CART_SYX')||'[]');

function saveCart(){ localStorage.setItem('CART_SYX', JSON.stringify(CART)); }
function addToCart(p){ const idx=CART.findIndex(i=>i.id===p.id); if(idx>-1){ CART[idx].qty+=1; } else { CART.push({...p,qty:1}); } renderCart(); panel.classList.add('open'); }
function changeQty(id,delta){ const i=CART.findIndex(x=>x.id===id); if(i===-1)return; CART[i].qty+=delta; if(CART[i].qty<=0)CART.splice(i,1); renderCart(); }
function removeItem(id){ CART=CART.filter(i=>i.id!==id); renderCart(); }
function clearCart(){ CART=[]; renderCart(); }

function renderCart(){
  cartItemsEl.innerHTML=''; let items=0,total=0;
  CART.forEach(it=>{items+=it.qty; total+=it.precio*it.qty;});
  cartCount.textContent=items; cartItemsCount.textContent=items; cartTotal.textContent=fmt(total);
  if(CART.length===0){ cartItemsEl.innerHTML='<div class="note">Tu carrito está vacío.</div>'; saveCart(); return; }
  CART.forEach(it=>{
    const row=document.createElement('div'); row.className='item';
    row.innerHTML=`
      <img src="${it.img}" alt="${it.nombre}">
      <div style="flex:1">
        <div style="font-weight:600">${it.nombre}</div>
        <div class="muted">Cod. ${it.codigo}</div>
        <div style="margin-top:4px;color:var(--violeta);font-weight:700">${fmt(it.precio)} x ${it.qty}</div>
        <div class="qty" style="margin-top:6px">
          <button aria-label="menos">−</button>
          <span>${it.qty}</span>
          <button aria-label="más">+</button>
        </div>
      </div>
      <button class="rm">✕</button>`;
    const [minus,plus]=row.querySelectorAll('.qty button');
    minus.addEventListener('click',()=>changeQty(it.id,-1));
    plus.addEventListener('click',()=>changeQty(it.id,1));
    row.querySelector('.rm').addEventListener('click',()=>removeItem(it.id));
    cartItemsEl.appendChild(row);
  });
  saveCart();
}
document.getElementById('openCart').onclick=()=>panel.classList.add('open');
document.getElementById('closeCart').onclick=()=>panel.classList.remove('open');
document.getElementById('clearCart').onclick=()=>{ if(confirm('¿Vaciar carrito?')) clearCart(); };

// ===== Checkout =====
const modal=document.getElementById('modal');
document.getElementById('checkout').onclick=()=>{ if(CART.length===0){ alert('Agregá productos al carrito antes de enviar el pedido.'); return; } modal.classList.add('open'); };
document.getElementById('closeModal').onclick=()=>modal.classList.remove('open');
document.getElementById('yy').textContent=new Date().getFullYear();

function genOrderCode(){ const d=new Date(); const pad=n=>String(n).padStart(2,'0'); return `SYX-${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())}-${d.getHours()}${d.getMinutes()}${d.getSeconds()}-${Math.floor(Math.random()*900+100)}`; }
function cartText(){ return CART.map(i=>`• ${i.nombre} (Cod ${i.codigo}) x ${i.qty} — ${fmt(i.precio*i.qty)}`).join('\\n'); }

async function postToSystem(payload){
  const ENDPOINT=""; // 👉 tu URL de backend
  if(!ENDPOINT) return {ok:false,skipped:true};
  try{ const res=await fetch(ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)}); return {ok:res.ok}; }
  catch(e){ return {ok:false,error:String(e)} }
}

const form=document.getElementById('form');
const orderResult=document.getElementById('orderResult');
const orderCodeEl=document.getElementById('orderCode');
const orderSummaryEl=document.getElementById('orderSummary');
const waLink=document.getElementById('waLink');

form.addEventListener('submit', async (e)=>{
  e.preventDefault();
  const buyer={cuit:document.getElementById('f_cuit').value.trim(), razon:document.getElementById('f_razon').value.trim(), mail:document.getElementById('f_mail').value.trim(), cel:document.getElementById('f_cel').value.trim(), msg:document.getElementById('f_msg').value.trim()};
  const items=CART.map(i=>({id:i.id,codigo:i.codigo,nombre:i.nombre,precio:i.precio,qty:i.qty}));
  const total=CART.reduce((a,b)=>a+b.precio*b.qty,0);
  const code=genOrderCode();

  const summary=`Pedido ${code}\\nCliente: ${buyer.razon}\\nCUIT/DNI: ${buyer.cuit}\\nEmail: ${buyer.mail} | Cel: ${buyer.cel}\\nMensaje: ${buyer.msg||'-'}\\n\\nProductos:\\n${cartText()}\\n\\nTotal: ${fmt(total)} (IVA inc.)`;
  orderCodeEl.textContent=code; orderSummaryEl.textContent=summary;

  const text=encodeURIComponent(`Hola, quiero consultar sobre mi pedido ${code}.\\n\\n${summary}`);
  waLink.href=`https://wa.me/${BRAND.phone}?text=${text}`;

  const payload={code,buyer,items,total,currency:'ARS',createdAt:new Date().toISOString()};
  const sys=await postToSystem(payload);
  if(!sys.ok&&!sys.skipped){ console.warn('No se pudo guardar en el sistema', sys.error); }

  orderResult.style.display='block';
});
document.getElementById('copyOrder').onclick=()=>{ const txt=orderSummaryEl.textContent.trim()||'Aún no generaste el pedido.'; navigator.clipboard.writeText(txt).then(()=>alert('Resumen copiado.')); };
document.getElementById('closeOk').onclick=()=>{ modal.classList.remove('open'); /* CART=[]; renderCart(); */ };

// Init
renderCats(); renderGrid(PRODUCTS); renderCart();
