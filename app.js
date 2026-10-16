const products = [
 {id:1,name:'The Rowe Merino',category:'Knitwear',price:128,rating:4.9,badge:'Best seller',image:'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=700&q=80',color:'Oat'},
 {id:2,name:'Nora Wide Leg Trouser',category:'Bottoms',price:148,rating:4.8,badge:'',image:'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=700&q=80',color:'Ink'},
 {id:3,name:'Sculpted Cotton Tee',category:'Tops',price:64,rating:4.7,badge:'New',image:'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80',color:'White'},
 {id:4,name:'The Everyday Scarf',category:'Accessories',price:78,rating:4.9,badge:'',image:'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=700&q=80',color:'Sage'},
 {id:5,name:'Marin Silk Shirt',category:'Tops',price:138,rating:4.8,badge:'',image:'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=700&q=80',color:'Rust'},
 {id:6,name:'Milo Rib Cardigan',category:'Knitwear',price:118,rating:4.6,badge:'New',image:'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=80',color:'Stone'},
 {id:7,name:'Linea Tailored Pant',category:'Bottoms',price:158,rating:4.9,badge:'',image:'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?auto=format&fit=crop&w=700&q=80',color:'Charcoal'},
 {id:8,name:'Studio Leather Tote',category:'Accessories',price:188,rating:4.8,badge:'Limited',image:'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=80',color:'Cocoa'}
];
let activeCategory='All', maxPrice=250, cart=0, wishlisted=[];
const grid=document.getElementById('productGrid');
const productCard=p=>`<article class="product-card"><div class="product-image"><img src="${p.image}" alt="${p.name}">${p.badge?`<span class="badge">${p.badge}</span>`:''}<button class="wishlist ${wishlisted.includes(p.id)?'liked':''}" data-wish="${p.id}" aria-label="Save ${p.name}">♡</button><button class="quick-add" data-add="${p.id}">Quick add</button></div><div class="product-info"><div><h3>${p.name}</h3><p>${p.color} · ${p.category}</p></div><strong>$${p.price}</strong></div><div class="rating">★★★★★ <span>${p.rating}</span></div></article>`;
function render(){let selected=[...document.querySelectorAll('.filters input[type=checkbox]:checked')].map(x=>x.value);let items=products.filter(p=>(activeCategory==='All'||p.category===activeCategory)&&(!selected.length||selected.includes(p.category))&&p.price<=maxPrice);const sort=document.getElementById('sort').value;if(sort==='low')items.sort((a,b)=>a.price-b.price);if(sort==='high')items.sort((a,b)=>b.price-a.price);if(sort==='rating')items.sort((a,b)=>b.rating-a.rating);grid.innerHTML=items.map(productCard).join('')||'<p class="no-results">No pieces found. Try expanding your filters.</p>';document.getElementById('resultCount').textContent=`${items.length} ${items.length===1?'piece':'pieces'}`;}
render();
document.querySelectorAll('.category').forEach(b=>b.onclick=()=>{activeCategory=b.dataset.category;document.querySelectorAll('.category').forEach(x=>x.classList.toggle('active',x===b));render()});
document.querySelectorAll('.filters input[type=checkbox], #sort').forEach(e=>e.onchange=render);
document.getElementById('priceRange').oninput=e=>{maxPrice=+e.target.value;document.getElementById('priceValue').textContent=maxPrice;render()};
document.getElementById('clearFilters').onclick=()=>{activeCategory='All';maxPrice=250;document.querySelectorAll('input[type=checkbox]').forEach(x=>x.checked=false);document.getElementById('priceRange').value=250;document.getElementById('priceValue').textContent='250';document.querySelectorAll('.category').forEach(x=>x.classList.toggle('active',x.dataset.category==='All'));render()};
document.addEventListener('click',e=>{let add=e.target.dataset.add,wish=e.target.dataset.wish;if(add){cart++;document.querySelector('.bag b').textContent=cart;let toast=document.getElementById('toast');toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2200)}if(wish){wishlisted=wishlisted.includes(+wish)?wishlisted.filter(x=>x!==+wish):[...wishlisted,+wish];render()}});
document.getElementById('suggestionGrid').innerHTML=products.slice(4,8).map(productCard).join('');
const overlay=document.getElementById('searchOverlay'), input=document.getElementById('searchInput'), results=document.getElementById('searchResults');
document.querySelector('.search-toggle').onclick=()=>{overlay.classList.add('open');setTimeout(()=>input.focus(),100)};document.querySelector('.close-search').onclick=()=>overlay.classList.remove('open');
input.oninput=()=>{let term=input.value.toLowerCase();let matches=products.filter(p=>p.name.toLowerCase().includes(term)||p.category.toLowerCase().includes(term));results.innerHTML=term?(matches.length?matches.slice(0,5).map(p=>`<button class="search-result" data-go="${p.id}"><img src="${p.image}" alt=""><span>${p.name}<small>${p.category} · $${p.price}</small></span><b>→</b></button>`).join(''):'<p class="search-hint">No matching pieces found.</p>'):'<p class="search-hint">Try “knitwear”, “trousers”, or “scarf”</p>'};
results.onclick=e=>{if(e.target.closest('[data-go]')){overlay.classList.remove('open');document.getElementById('shop').scrollIntoView({behavior:'smooth'})}};

// Storefront flows: local cart, product detail, coupon, checkout and account UI
let cartItems = JSON.parse(localStorage.getItem('seora-cart') || '[]');
const money = n => `$${n.toFixed(2)}`;
const byId = id => products.find(p => p.id === Number(id));
const saveCart = () => localStorage.setItem('seora-cart', JSON.stringify(cartItems));
function updateCart() {
  const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + byId(item.id).price * item.quantity, 0);
  const discount = document.getElementById('couponMessage').dataset.discount === 'true' ? subtotal * .1 : 0;
  cart = count;
  document.querySelector('.bag b').textContent = count;
  document.getElementById('cartItemsCount').textContent = `(${count})`;
  document.getElementById('cartSubtotal').textContent = money(subtotal);
  document.getElementById('cartTotal').textContent = money(Math.max(0, subtotal - discount));
  document.getElementById('checkoutPrice').textContent = money(Math.max(0, subtotal - discount));
  document.getElementById('cartItems').innerHTML = cartItems.length ? cartItems.map(item => { const p = byId(item.id); return `<article class="cart-item"><img src="${p.image}" alt="${p.name}"><div><strong>${p.name}</strong><small>${p.color} · $${p.price}</small><div class="quantity"><button data-quantity="${p.id}" data-change="-1">−</button><span>${item.quantity}</span><button data-quantity="${p.id}" data-change="1">+</button></div></div><button class="remove-item" data-remove="${p.id}" aria-label="Remove ${p.name}">×</button></article>`; }).join('') : '<p class="empty-cart">Your bag is waiting for something beautiful.</p>';
  saveCart();
}
function addToCart(id) { const item = cartItems.find(i => i.id === Number(id)); if (item) item.quantity++; else cartItems.push({id:Number(id), quantity:1}); updateCart(); const toast=document.getElementById('toast'); toast.classList.add('show'); setTimeout(()=>toast.classList.remove('show'),2200); }
function openModal(id) { document.getElementById(id).classList.add('open'); document.getElementById(id).setAttribute('aria-hidden','false'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); document.getElementById(id).setAttribute('aria-hidden','true'); }
document.querySelector('.bag').onclick = () => openModal('cartDrawer');
document.querySelectorAll('[data-close-cart]').forEach(x => x.onclick = () => closeModal('cartDrawer'));
document.querySelectorAll('[data-close-product]').forEach(x => x.onclick = () => closeModal('productModal'));
document.querySelectorAll('[data-close-checkout]').forEach(x => x.onclick = () => closeModal('checkoutModal'));
document.querySelectorAll('[data-close-account]').forEach(x => x.onclick = () => closeModal('accountModal'));
document.querySelectorAll('.header-actions .icon-btn')[1].onclick = () => openModal('accountModal');
document.addEventListener('click', e => {
  const addButton = e.target.closest('[data-add]');
  const card = e.target.closest('.product-card');
  if (addButton) { e.stopPropagation(); addToCart(addButton.dataset.add); }
  else if (card && !e.target.closest('[data-wish]')) { const heading=card.querySelector('h3'); const p=products.find(x=>x.name===heading?.textContent); if(p) showProduct(p); }
  if (e.target.dataset.remove) { cartItems = cartItems.filter(i => i.id !== Number(e.target.dataset.remove)); updateCart(); }
  if (e.target.dataset.quantity) { const item = cartItems.find(i => i.id === Number(e.target.dataset.quantity)); item.quantity += Number(e.target.dataset.change); if (item.quantity < 1) cartItems=cartItems.filter(i=>i!==item); updateCart(); }
});
function showProduct(p) { document.getElementById('productModalContent').innerHTML=`<div class="product-detail"><img src="${p.image}" alt="${p.name}"><div><p class="eyebrow">${p.category} / ${p.color}</p><h2>${p.name}</h2><p class="detail-price">$${p.price}</p><p class="detail-copy">Designed for the rhythm of real life. This small-batch piece is crafted from considered materials and made to be worn on repeat.</p><p class="detail-rating">★★★★★ <span>${p.rating} · Loved by Seora customers</span></p><div class="detail-sizes"><strong>Select size</strong><div><button>XS</button><button>S</button><button class="selected">M</button><button>L</button><button>XL</button></div></div><button class="checkout-button" data-add="${p.id}">Add to bag — $${p.price}</button><details class="product-accordion"><summary>Shipping & returns <span>+</span></summary><p>Complimentary standard shipping over $75. Easy returns within 30 days.</p></details><details class="product-accordion"><summary>Reviews <span>+</span></summary><p>“The fit is wonderful and the quality feels exceptional.” — Verified customer</p></details></div></div>`; openModal('productModal'); }
document.getElementById('applyCoupon').onclick = () => { const message=document.getElementById('couponMessage'); if(document.getElementById('couponCode').value.trim().toUpperCase()==='WELCOME10'){message.textContent='WELCOME10 applied — 10% off.';message.dataset.discount='true'}else{message.textContent='Try code WELCOME10.';message.dataset.discount='false'} updateCart(); };
document.getElementById('checkoutButton').onclick = () => { if(!cartItems.length) return; closeModal('cartDrawer'); openModal('checkoutModal'); };
document.getElementById('checkoutForm').onsubmit = e => {e.preventDefault(); cartItems=[]; document.getElementById('couponMessage').dataset.discount='false'; updateCart(); closeModal('checkoutModal'); const toast=document.getElementById('toast');toast.innerHTML='Order placed — thank you! <span>✓</span>';toast.classList.add('show');setTimeout(()=>{toast.classList.remove('show');toast.innerHTML='Added to bag <span>→</span>'},3000);};
updateCart();
