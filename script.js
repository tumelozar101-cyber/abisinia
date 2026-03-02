/* =========================
   Abisinia Demo (Home & Apparel)
   - Update WhatsApp number below
   - Put images in /images with the names used here
   ========================= */

const WHATSAPP_NUMBER = "27XXXXXXXXX"; // <-- put Thami/Abisinia number here (no +)
const BUSINESS_NAME = "abisinia.";

const products = [
  // MIRRORS
  {
    id: "m1",
    type: "mirrors",
    name: "Crystal Round Mirror",
    price: "Request quote",
    img: "images/mirror-crystal-round.jpg",
    desc: "Luxury crystal round mirror — a statement piece for lounge, entrance, or bedroom."
  },
  {
    id: "m2",
    type: "mirrors",
    name: "Sunburst Crystal Mirror",
    price: "Request quote",
    img: "images/mirror-sunburst-crystal.jpg",
    desc: "Bold sunburst style with crystal detail — instantly elevates any wall."
  },
  {
    id: "m3",
    type: "mirrors",
    name: "Chrome Block Mirror",
    price: "Request quote",
    img: "images/mirror-chrome-block.jpg",
    desc: "High-gloss chrome frame mirror — clean, premium, and modern."
  },
  {
    id: "m5",
    type: "mirrors",
    name: "Vertical Bar Mirror",
    price: "Request quote",
    img: "images/mirror-bars.jpg",
    desc: "Art-style bar mirror — creates a luxury hotel feel in your home."
  },
  {
    id: "m6",
    type: "mirrors",
    name: "Large Wall Mirror (Statement)",
    price: "Request quote",
    img: "images/mirror-wall-large.jpg",
    desc: "Large statement mirror — perfect for shops, salons, lounges, or entrance walls."
  },

  // WALL ART / DECOR
  {
    id: "d1",
    type: "decor",
    name: "Framed Wall Art (Red)",
    price: "Request quote",
    img: "images/art-red.jpg",
    desc: "Bold warm tones — adds depth and character to your wall."
  },
  {
    id: "d2",
    type: "decor",
    name: "Framed Wall Art (Yellow)",
    price: "Request quote",
    img: "images/art-yellow.jpg",
    desc: "Warm abstract piece — clean and elegant for lounge or hallway."
  },
  {
    id: "d3",
    type: "decor",
    name: "Framed Wall Art (Neutral)",
    price: "Request quote",
    img: "images/art-neutral.jpg",
    desc: "Neutral modern art — matches most interior color palettes."
  },

  // FURNITURE
  {
    id: "f1",
    type: "furniture",
    name: "Tufted Headboard (Grey)",
    price: "Request quote",
    img: "images/headboard-grey.jpg",
    desc: "Luxury tufted headboard — premium bedroom upgrade."
  },
  {
    id: "f2",
    type: "furniture",
    name: "White Sofa (Statement)",
    price: "Request quote",
    img: "images/sofa-white.jpg",
    desc: "Statement sofa piece — clean look, premium finish."
  } 
];

const featured = [
  { name: "Crystal Round Mirror", price: "Request quote", img: "images/mirror-crystal-round.jpg", type: "mirrors" },
  { name: "Chrome Block Mirror", price: "Request quote", img: "images/mirror-chrome-block.jpg", type: "mirrors" },
  { name: "Framed Wall Art (Red)", price: "Request quote", img: "images/art-red.jpg", type: "decor" },
  { name: "Tufted Headboard (Grey)", price: "Request quote", img: "images/headboard-grey.jpg", type: "furniture" },
];

const saved = new Map();

// Elements
const yearEl = document.getElementById("year");
const productGrid = document.getElementById("productGrid");
const filterBtns = document.querySelectorAll(".filterBtn");
const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");

const drawer = document.getElementById("drawer");
const openDrawerBtn = document.getElementById("openDrawerBtn");
const closeDrawerBtn = document.getElementById("closeDrawerBtn");
const drawerOverlay = document.getElementById("drawerOverlay");
const drawerBody = document.getElementById("drawerBody");
const drawerWhatsAppBtn = document.getElementById("drawerWhatsAppBtn");
const bagCount = document.getElementById("bagCount");

const modal = document.getElementById("modal");
const modalOverlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");
const modalContent = document.getElementById("modalContent");

const heroWhatsAppBtn = document.getElementById("heroWhatsAppBtn");
const contactWhatsAppBtn = document.getElementById("contactWhatsAppBtn");
const waFloat = document.getElementById("waFloat");
const quickOrderForm = document.getElementById("quickOrderForm");
const waNumberText = document.getElementById("waNumberText");

// Featured carousel
const newCarousel = document.getElementById("newCarousel");
const prevNew = document.getElementById("prevNew");
const nextNew = document.getElementById("nextNew");

// Helpers
function encodeWA(text){ return encodeURIComponent(text); }
function waLink(message){ return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeWA(message)}`; }
function openWA(message){ window.open(waLink(message), "_blank", "noopener,noreferrer"); }

function formatTag(type){
  if (type === "mirrors") return "Mirrors";
  if (type === "decor") return "Wall Art";
  if (type === "furniture") return "Furniture";
  return "Women’s Fashion";
}
function tagClass(type){
  if (type === "mirrors") return "tag tag--mirrors";
  if (type === "decor") return "tag tag--decor";
  if (type === "furniture") return "tag tag--furniture";
  return "tag tag--apparel";
}

function defaultWAIntro(){
  return `Hi ${BUSINESS_NAME} 👋\n\nI’d like a quote.\n\n• Item(s): \n• Size / Dimensions (if any): \n• Delivery area: \n• Notes: \n`;
}
function productMessage(p){
  return `Hi ${BUSINESS_NAME} 👋\n\nPlease quote me for:\n\n• Item: ${p.name}\n• Price: ${p.price}\n• Size / Dimensions (if any): \n• Delivery area: \n\nI can send a screenshot if needed. Thank you.`;
}

// Render products
function renderProducts(filter = "all"){
  const list = products.filter(p => filter === "all" ? true : p.type === filter);

  productGrid.innerHTML = list.map(p => `
    <article class="product reveal" data-type="${p.type}">
      <div class="product__img" role="button" tabindex="0" data-quickview="${p.id}">
        ${
          p.img
            ? `<img src="${p.img}" alt="${p.name}"
                 onerror="this.style.display='none'; this.parentElement.innerHTML='<div class=\\'placeholderTxt\\'>Image not found<br>(check file name)</div>';" />`
            : `<div class="placeholderTxt">Add product photo<br>(Women’s fashion)</div>`
        }
      </div>

      <div class="product__body">
        <div class="product__title">${p.name}</div>

        <div class="product__meta">
          <div class="price">${p.price}</div>
          <div class="${tagClass(p.type)}">${formatTag(p.type)}</div>
        </div>

        <div class="product__actions">
          <button class="actionBtn actionBtn--primary" data-order="${p.id}">Get quote</button>
          <button class="actionBtn heartBtn" data-save="${p.id}" aria-label="Save item">
            ${saved.has(p.id) ? "🖤" : "♡"}
          </button>
        </div>
      </div>
    </article>
  `).join("");

  observeReveals();
}

// Render featured carousel
function renderFeatured(){
  newCarousel.innerHTML = featured.map(n => `
    <div class="newCard reveal">
      <div class="newCard__img">
        <img src="${n.img}" alt="${n.name}"
             onerror="this.style.display='none'; this.parentElement.innerHTML='<div class=\\'placeholderTxt\\'>Missing image</div>';" />
      </div>
      <div class="newCard__body">
        <div style="font-weight:900">${n.name}</div>
        <div class="muted" style="display:flex; justify-content:space-between; gap:10px;">
          <span>${n.price}</span>
          <span class="${tagClass(n.type)}">${formatTag(n.type)}</span>
        </div>
        <button class="btn btn--primary" data-order-new="${n.name}">Get quote on WhatsApp</button>
      </div>
    </div>
  `).join("");

  observeReveals();
}

// Drawer
function setDrawer(open){ drawer.setAttribute("aria-hidden", open ? "false" : "true"); }
function updateSavedUI(){
  bagCount.textContent = String(saved.size);

  if (saved.size === 0){
    drawerBody.innerHTML = `<p class="muted">No saved items yet. Tap the ♡ on a product.</p>`;
    return;
  }

  drawerBody.innerHTML = Array.from(saved.values()).map(p => `
    <div class="savedItem">
      ${
        p.img
          ? `<img src="${p.img}" alt="${p.name}" onerror="this.style.display='none'" />`
          : `<div style="width:60px;height:60px;border-radius:14px;border:1px solid rgba(255,255,255,0.12);display:grid;place-items:center;">🖤</div>`
      }
      <div class="savedItem__meta">
        <div class="savedItem__title">${p.name}</div>
        <div class="savedItem__price">${p.price}</div>
        <div class="tiny muted">${formatTag(p.type)}</div>
      </div>
      <button class="savedItem__btn" data-remove="${p.id}" aria-label="Remove">Remove</button>
    </div>
  `).join("");
}

// Modal
function openModal(productId){
  const p = products.find(x => x.id === productId);
  if (!p) return;

  modalContent.innerHTML = `
    <div class="modalImg">
      ${
        p.img
          ? `<img src="${p.img}" alt="${p.name}"
                  onerror="this.style.display='none';" />`
          : `<div class="placeholderTxt" style="height:100%;display:grid;place-items:center;">Add product image</div>`
      }
    </div>

    <div class="modalInfo">
      <div class="${tagClass(p.type)}" style="display:inline-flex;">${formatTag(p.type)}</div>
      <h3>${p.name}</h3>
      <div class="price" style="font-size:18px">${p.price}</div>
      <p>${p.desc}</p>

      <div class="row">
        <button class="btn btn--primary" data-order="${p.id}">Get quote on WhatsApp</button>
        <button class="btn btn--ghost" data-save="${p.id}">
          ${saved.has(p.id) ? "Saved 🖤" : "Save ♡"}
        </button>
      </div>

      <p class="tiny muted" style="margin-top:12px;">
        Tip: Send your wall size / window size / mirror size for the fastest quote.
      </p>
    </div>
  `;

  modal.setAttribute("aria-hidden", "false");
}
function closeModal(){
  modal.setAttribute("aria-hidden", "true");
  modalContent.innerHTML = "";
}

// Reveal on scroll
let revealObserver;
function observeReveals(){
  if (!revealObserver){
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting){
          e.target.classList.add("is-visible");
          revealObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
  }
  document.querySelectorAll(".reveal:not(.is-visible)").forEach(el => revealObserver.observe(el));
}

// Events
document.addEventListener("click", (e) => {
  const t = e.target;

  // Filters
  if (t.classList.contains("filterBtn")){
    filterBtns.forEach(b => b.classList.remove("is-active"));
    t.classList.add("is-active");
    renderProducts(t.dataset.filter);
  }

  // Orders
  if (t.dataset.order){
    const p = products.find(x => x.id === t.dataset.order);
    if (p) openWA(productMessage(p));
  }
  if (t.dataset.orderNew){
    openWA(`Hi ${BUSINESS_NAME} 👋\n\nPlease quote me for:\n\n• Item: ${t.dataset.orderNew}\n• Delivery area: \n• Notes: \n\nThank you.`);
  }

  // Save
  if (t.dataset.save){
    const p = products.find(x => x.id === t.dataset.save);
    if (!p) return;

    if (saved.has(p.id)) saved.delete(p.id);
    else saved.set(p.id, p);

    updateSavedUI();
    renderProducts(document.querySelector(".filterBtn.is-active")?.dataset.filter || "all");
  }

  // Remove saved
  if (t.dataset.remove){
    saved.delete(t.dataset.remove);
    updateSavedUI();
    renderProducts(document.querySelector(".filterBtn.is-active")?.dataset.filter || "all");
  }

  // Quick view
  if (t.dataset.quickview){
    openModal(t.dataset.quickview);
  }

  // Collection cards jump + filter
  if (t.dataset.filterlink){
    setTimeout(() => {
      filterBtns.forEach(b => b.classList.remove("is-active"));
      const btn = Array.from(filterBtns).find(b => b.dataset.filter === t.dataset.filterlink);
      if (btn){
        btn.classList.add("is-active");
        renderProducts(t.dataset.filterlink);
      }
    }, 150);
  }
});

// Keyboard
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape"){
    closeModal();
    setDrawer(false);
    mobileNav.style.display = "none";
    mobileNav.setAttribute("aria-hidden", "true");
  }
});

// Modal controls
modalOverlay.addEventListener("click", closeModal);
modalClose.addEventListener("click", closeModal);

// Drawer controls
openDrawerBtn.addEventListener("click", () => setDrawer(true));
closeDrawerBtn.addEventListener("click", () => setDrawer(false));
drawerOverlay.addEventListener("click", () => setDrawer(false));
drawerWhatsAppBtn.addEventListener("click", () => {
  if (saved.size === 0){
    openWA(defaultWAIntro());
    return;
  }
  const lines = Array.from(saved.values()).map(p => `• ${p.name} (${p.price})`);
  openWA(`Hi ${BUSINESS_NAME} 👋\n\nPlease quote me for these items:\n\n${lines.join("\n")}\n\n• Delivery area: \n• Notes: \n`);
});

// Mobile menu
menuBtn.addEventListener("click", () => {
  const isOpen = mobileNav.style.display === "block";
  mobileNav.style.display = isOpen ? "none" : "block";
  mobileNav.setAttribute("aria-hidden", isOpen ? "true" : "false");
});

// Hero + Contact WhatsApp
heroWhatsAppBtn.addEventListener("click", () => openWA(defaultWAIntro()));
contactWhatsAppBtn.addEventListener("click", () => openWA(defaultWAIntro()));
waFloat.addEventListener("click", () => openWA(defaultWAIntro()));

// Form -> WhatsApp
quickOrderForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(quickOrderForm);

  const msg =
`Hi ${BUSINESS_NAME} 👋

My name: ${data.get("name")}
Interested in: ${data.get("interest")}
Size / Dimensions: ${data.get("size") || "-"}
Delivery area: ${data.get("area")}
Notes: ${data.get("notes") || "-"}

Please send me a quote + delivery options.`;

  openWA(msg);
});

// Featured carousel nav
prevNew.addEventListener("click", () => newCarousel.scrollBy({ left: -290, behavior: "smooth" }));
nextNew.addEventListener("click", () => newCarousel.scrollBy({ left: 290, behavior: "smooth" }));

// Init
yearEl.textContent = String(new Date().getFullYear());
waNumberText.textContent = WHATSAPP_NUMBER === "27XXXXXXXXX" ? "+27 XX XXX XXXX" : `+${WHATSAPP_NUMBER}`;

renderProducts("all");
renderFeatured();
updateSavedUI();
observeReveals();