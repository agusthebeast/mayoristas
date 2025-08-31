// ===== Config =====


function decQty(i){ CART[i].cantidad=Math.max(1,CART[i].cantidad-1); saveCart(); renderCart(); }
function incQty(i){ CART[i].cantidad+=1; saveCart(); renderCart(); }
function removeItem(i){ CART.splice(i,1); saveCart(); renderCart(); }


// ===== Checkout =====
async function sendOrder(){
if(!CART.length) return toast('Agregá productos al pedido.');
const customer = {
cuit_dni: $('#cuit_dni').value.trim(),
razon_social: $('#razon_social').value.trim(),
email: $('#email').value.trim(),
celular: $('#celular').value.trim(),
descripcion: $('#descripcion').value.trim()
};
if(!customer.cuit_dni || !customer.razon_social || !customer.email || !customer.celular){
return toast('Completá CUIT/DNI, Razón Social, Email y Celular.');
}


const totals = {
items: CART.reduce((a,b)=>a+b.cantidad,0),
monto: CART.reduce((a,b)=>a+b.cantidad*b.precio,0)
};


const items = CART.map(it=>({ producto_id: it.producto_id, nombre: it.nombre, codigo: it.codigo, cantidad: it.cantidad, precio: it.precio }));


const res = await apiPost('createOrder', { customer, items, totals });
if(!res.ok){ return toast('Error al enviar pedido'); }


// Mostrar código y botón WhatsApp
const code = res.pedido_code;
toast(`Pedido enviado. Código: ${code}`);
// limpiar carrito
CART = []; saveCart(); renderCart();


// Abrir WhatsApp con mensaje (opcional):
const url = res.whatsapp_link || `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hola, quiero consultar sobre mi pedido '+code)}`;
window.open(url, '_blank');


// Cerrar modal
toggleCheckout(false);
}


function toggleCheckout(show){ $('#checkoutModal').classList.toggle('hidden', !show); }
function toggleCart(show){ $('#cartPanel').classList.toggle('hidden', !show); }


// ===== Init =====
async function init(){
loadCart();
const banners = await apiGet('banners');
renderHero(banners.banners||[]);
const cat = await apiGet('catalog');
CATALOG = cat; renderCats(); renderProducts(CATALOG.productos);


$('#searchInput').addEventListener('input', ()=>renderProducts(CATALOG.productos));
$('#cartBtn').addEventListener('click', ()=>toggleCart(true));
$('#closeCart').addEventListener('click', ()=>toggleCart(false));
$('#checkoutBtn').addEventListener('click', ()=>toggleCheckout(true));
$('#cancelCheckout').addEventListener('click', ()=>toggleCheckout(false));
$('#sendOrder').addEventListener('click', sendOrder);
}


init();