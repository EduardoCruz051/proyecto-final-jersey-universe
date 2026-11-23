// Catálogo de Jersey Universe. Las fotografías se encuentran en la carpeta ./img
// Productos que ya estaban en el catálogo original: se conservan sus rutas de imagen.

// ======================================
// CONEXIÓN CON SUPABASE
// ======================================

const SUPABASE_URL = "https://sjftzxgnfvwkmtbnlekv.supabase.co";
const SUPABASE_KEY = "sb_publishable_g57R4Xxc22L6Ky7wyrRIfA_R1NJ9-r2";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

let currentUser = null;
let authMode = "login";
let captchaCode = "";

const originalProducts = [
  {
    id: 101, name: "Jersey PSG local", team: "PSG", category: "Clubes",
    price: 899, oldPrice: 1099, tag: "DESTACADO", color: "#1764a5", code: "10",
    image: "./img/psg-local.png",
    description: "Playera local del Paris Saint-Germain.",
    details: ["Diseño local del PSG", "Escudo del club al frente", "Imagen original del catálogo"]
  },
  {
    id: 102, name: "Jersey Real Madrid local", team: "Real Madrid", category: "Clubes",
    price: 849, tag: "NUEVO", color: "#d9e2e8", code: "07", dark: true,
    image: "./img/madrid-local.png",
    description: "Playera local del Real Madrid.",
    details: ["Diseño local del Real Madrid", "Escudo del club al frente", "Imagen original del catálogo"]
  },
  {
    id: 103, name: "Jersey Barcelona", team: "Barcelona", category: "Clubes",
    price: 799, oldPrice: 949, tag: "OFERTA", color: "#087b52", code: "09",
    image: "./img/barcelona-local.png",
    description: "Playera del FC Barcelona.",
    details: ["Diseño del FC Barcelona", "Escudo del club al frente", "Imagen original del catálogo"]
  },
  {
    id: 104, name: "Jersey América visitante", team: "América", category: "Clubes",
    price: 899, tag: "POPULAR", color: "#b72e3b", code: "11",
    image: "./img/america-visitante.png",
    description: "Playera visitante del Club América.",
    details: ["Diseño visitante del América", "Escudo del club al frente", "Imagen original del catálogo"]
  },
  {
    id: 105, name: "Jersey selección Francia", team: "Francia", category: "Selecciones",
    price: 829, tag: "NUEVO", color: "#234b91", code: "08",
    image: "./img/francia.png",
    description: "Playera de la selección de Francia.",
    details: ["Diseño de la selección francesa", "Escudo de la selección", "Imagen original del catálogo"]
  },
  {
    id: 106, name: "Jersey Holanda retro", team: "Retro", category: "Selecciones",
    price: 999, oldPrice: 1199, tag: "OFERTA", color: "#252a35", code: "90",
    image: "./img/holanda-retro.png",
    description: "Modelo retro negro que ya figuraba en tu catálogo.",
    details: ["Estilo retro", "Color negro", "Fotografía pendiente"]
  },
  {
    id: 107, name: "Jersey Manchester united", team: "Clubes", category: "Clubes",
    price: 799, tag: "CLÁSICO", color: "#e8e8e4", code: "04", dark: true,
    image: "./img/manchester-united-local.png",
    description: "Modelo blanco de selección que ya estaba en el catálogo original.",
    details: ["Diseño blanco clásico", "Categoría selecciones", "Fotografía pendiente"]
  },
  {
    id: 108, name: "Jersey edición especial Milan", team: "Edición especial", category: "Clubes",
    price: 949, tag: "ESPECIAL", color: "#75459a", code: "21",
    image: "./img/milan-retro.png",
    description: "Modelo de edición especial que ya formaba parte de tu catálogo.",
    details: ["Edición especial", "Diseño de colección", "Fotografía pendiente"]
  }
];

const newProducts = [
  {
    id: 1, name: "Jersey Manchester City local", team: "Manchester City", category: "Clubes",
    price: 899, tag: "DESTACADO", image: "./img/manchester-city-local.png",
    description: "Playera celeste del Manchester City, con detalles blancos y diagonales al frente. Un diseño inspirado en la indumentaria local del club inglés.",
    details: ["Color celeste con detalles blancos", "Escudo del Manchester City al frente", "Diseño de inspiración local"]
  },
  {
    id: 2, name: "Jersey Deportivo Toluca local", team: "Deportivo Toluca", category: "Clubes",
    price: 849, tag: "NUEVO", image: "./img/toluca-local.png",
    description: "Playera roja del Deportivo Toluca, con patrón horizontal y detalles del club. Ideal para mostrar tu apoyo a los Diablos Rojos.",
    details: ["Color rojo con franjas horizontales", "Escudo del Deportivo Toluca", "Detalles de patrocinadores visibles en la imagen"]
  },
  {
    id: 3, name: "Jersey selección Colombia", team: "Colombia", category: "Selecciones",
    price: 829, tag: "SELECCIÓN", image: "./img/colombia-local.png",
    description: "Playera amarilla de la selección de Colombia, con vivos azules y rojos. Una opción para acompañar a los Cafeteros.",
    details: ["Color amarillo", "Detalles azules y rojos", "Escudo de la selección colombiana"]
  },
  {
    id: 4, name: "Jersey selección Inglaterra", team: "Inglaterra", category: "Selecciones",
    price: 829, tag: "CLÁSICO", image: "./img/inglaterra-local.png",
    description: "Playera blanca de la selección de Inglaterra, con detalles azul marino y acentos en las mangas. Un diseño sobrio para los Three Lions.",
    details: ["Color blanco", "Detalles azul marino", "Escudo de la selección inglesa"]
  },
  {
    id: 5, name: "Jersey selección Brasil", team: "Brasil", category: "Selecciones",
    price: 829, tag: "POPULAR", image: "./img/brasil-local.png",
    description: "Playera amarilla de la selección de Brasil, acompañada de detalles verdes en cuello y mangas. Inspirada en los colores tradicionales de la Canarinha.",
    details: ["Color amarillo", "Detalles verdes", "Escudo de la selección brasileña"]
  },
  {
    id: 6, name: "Jersey México negro edición especial", team: "México", category: "Selecciones",
    price: 899, tag: "ESPECIAL", image: "./img/mexico-negra.png",
    description: "Playera negra de la selección mexicana con detalles dorados en mangas y escudo. Una propuesta de estilo especial en los colores de México.",
    details: ["Color negro", "Detalles dorados", "Escudo de México al frente"]
  },
  {
    id: 7, name: "Jersey México edicion retro 1998", team: "México", category: "Selecciones",
    price: 899, tag: "ESPECIAL", image: "./img/mexico-retro.png",
    description: "Playera retro de la selección mexicana con detalles de el calendario maya. Una propuesta de estilo especial en los colores de México.",
    details: ["Color negro", "Detalles dorados", "Escudo de México al frente"]
  }
];

const products = [...originalProducts, ...newProducts];
const sizes = ["CH", "M", "G", "XG"];

const money = value =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN"
  }).format(value);

let cart = [];

try {
  cart = JSON.parse(localStorage.getItem("ju-cart") || "[]");
  if (!Array.isArray(cart)) cart = [];
  cart = cart.map(item => ({ ...item, size: item.size || "M" }));
} catch {
  cart = [];
}

let activeFilter = "Todos";
let selectedProductId = null;

const productGrid = document.getElementById("productGrid");
const cartPanel = document.getElementById("cartPanel");
const overlay = document.getElementById("overlay");
const accountModal = document.getElementById("accountModal");
const productModal = document.getElementById("productModal");

// ======================================
// CAPTCHA
// ======================================

function generateCaptcha() {
  const canvas = document.getElementById("captchaCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  captchaCode = "";

  ctx.fillStyle = "#101827";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 6; i++) {
    ctx.strokeStyle = i % 2 === 0
      ? "rgba(56, 189, 248, 0.35)"
      : "rgba(249, 115, 22, 0.35)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
    ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
    ctx.stroke();
  }

  ctx.font = "bold 24px monospace";
  ctx.textBaseline = "middle";

  for (let i = 0; i < 5; i++) {
    const char = chars[Math.floor(Math.random() * chars.length)];
    captchaCode += char;

    ctx.save();
    ctx.translate(22 + i * 28, canvas.height / 2);
    ctx.rotate((Math.random() - 0.5) * 0.45);
    ctx.fillStyle = i % 2 === 0 ? "#38bdf8" : "#f1f5f9";
    ctx.fillText(char, 0, 0);
    ctx.restore();
  }

  for (let i = 0; i < 28; i++) {
    ctx.fillStyle = "rgba(255,255,255,0.25)";
    ctx.fillRect(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      2,
      2
    );
  }

  const input = document.getElementById("captchaInput");
  const error = document.getElementById("captchaError");

  if (input) input.value = "";
  if (error) error.textContent = "";
}

document.getElementById("refreshCaptcha").addEventListener("click", () => {
  generateCaptcha();
});

// ======================================
// CAMBIAR ENTRE INICIO Y REGISTRO
// ======================================

function updateAuthMode() {
  const button = document.getElementById("accountSubmitButton");
  const switchButton = document.getElementById("switchAuthMode");
  const description = document.getElementById("accountDescription");

  if (authMode === "login") {
    button.textContent = "Iniciar sesión";
    switchButton.textContent = "¿No tienes cuenta? Crear una";
    description.textContent = "Ingresa a tu cuenta de Jersey Universe.";
  } else {
    button.textContent = "Crear cuenta";
    switchButton.textContent = "¿Ya tienes cuenta? Iniciar sesión";
    description.textContent = "Regístrate para crear tu cuenta.";
  }

  document.getElementById("accountMessage").textContent = "";
}

document.getElementById("switchAuthMode").addEventListener("click", () => {
  authMode = authMode === "login" ? "register" : "login";
  updateAuthMode();
  generateCaptcha();
});

// ======================================
// ACTUALIZAR ESTADO DE LA CUENTA
// ======================================

function updateAccount() {
  const message = document.getElementById("accountMessage");
  const logoutButton = document.getElementById("logoutButton");
  const form = document.getElementById("loginForm");
  const switchButton = document.getElementById("switchAuthMode");

  if (currentUser) {
    message.textContent = `Sesión iniciada como ${currentUser.email}`;
    logoutButton.classList.remove("hidden");
    form.classList.add("hidden");
    switchButton.classList.add("hidden");
  } else {
    message.textContent = "";
    logoutButton.classList.add("hidden");
    form.classList.remove("hidden");
    switchButton.classList.remove("hidden");
  }
}

// ======================================
// REGISTRO E INICIO DE SESIÓN
// ======================================

document.getElementById("loginForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("emailInput").value.trim();
  const password = document.getElementById("passwordInput").value;
  const captchaInput = document.getElementById("captchaInput").value.trim().toUpperCase();
  const message = document.getElementById("accountMessage");
  const captchaError = document.getElementById("captchaError");
  const submitButton = document.getElementById("accountSubmitButton");

  captchaError.textContent = "";

  if (captchaInput !== captchaCode) {
    captchaError.textContent = "El código no coincide. Inténtalo nuevamente.";
    generateCaptcha();
    document.getElementById("captchaInput").value = "";
    return;
  }

  submitButton.disabled = true;
  message.textContent = "Procesando...";

  try {
    if (authMode === "register") {
      const { data, error } = await supabaseClient.auth.signUp({
        email: email,
        password: password
      });

      if (error) throw error;

      if (data.session) {
        currentUser = data.user;
        updateAccount();
        toast("Cuenta creada correctamente");
      } else {
        message.textContent =
          "Cuenta creada. Revisa tu correo para confirmar el registro.";
      }

    } else {
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password
      });

      if (error) throw error;

      currentUser = data.user;
      updateAccount();

      const { error: historyError } =
        await supabaseClient.rpc("record_login");

      if (historyError) {
        console.warn("Error al guardar el acceso:", historyError.message);
      }

      toast("Bienvenido a Jersey Universe");
    }

  } catch (error) {
    message.textContent = error.message || "No se pudo completar la operación.";
  } finally {
    submitButton.disabled = false;
    generateCaptcha();
    document.getElementById("captchaInput").value = "";
  }
});

// ======================================
// CERRAR SESIÓN
// ======================================

document.getElementById("logoutButton").addEventListener("click", async () => {
  const { error } = await supabaseClient.auth.signOut();

  if (error) {
    document.getElementById("accountMessage").textContent = error.message;
    return;
  }

  currentUser = null;
  authMode = "login";

  updateAuthMode();
  updateAccount();
  generateCaptcha();

  toast("Sesión cerrada");
});

// ======================================
// RECUPERAR SESIÓN AL ABRIR LA PÁGINA
// ======================================

supabaseClient.auth.onAuthStateChange((_event, session) => {
  currentUser = session?.user ?? null;
  updateAccount();
});

async function initializeAccount() {
  const { data, error } = await supabaseClient.auth.getSession();

  if (!error) {
    currentUser = data.session?.user ?? null;
  }

  updateAuthMode();
  updateAccount();
  generateCaptcha();
}

initializeAccount();

// ======================================
// CARRITO
// ======================================

function saveCart() {
  localStorage.setItem("ju-cart", JSON.stringify(cart));
  renderCart();
}

function renderProducts() {
  const query = document.getElementById("searchInput").value.trim().toLowerCase();

  const filtered = products.filter(product => {
    const matchesFilter = activeFilter === "Todos" ||
      (activeFilter === "Ofertas"
        ? Boolean(product.oldPrice)
        : product.category === activeFilter);

    return matchesFilter &&
      (product.name + " " + product.team).toLowerCase().includes(query);
  });

  productGrid.innerHTML = filtered.length ? filtered.map(product => `
    <article class="product-card">
      <button class="product-open" data-detail="${product.id}" aria-label="Ver detalles de ${product.name}">
        <div class="product-visual">
          <span class="tag">${product.tag}</span>
          ${product.image
            ? `<img class="product-image" src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.outerHTML='<div class=&quot;detail-image-placeholder&quot;>Imagen no disponible</div>'">`
            : `<div class="detail-image-placeholder">Fotografía próximamente</div>`}
        </div>
        <div class="product-info">
          <span class="product-category">${product.category}</span>
          <h3>${product.name}</h3>
          <span class="view-details">Ver descripción y tallas <span aria-hidden="true">→</span></span>
        </div>
      </button>
      <div class="product-card-bottom">
        <span class="price">${money(product.price)}</span>
        <button class="add-button" data-detail="${product.id}">Elegir talla</button>
      </div>
    </article>
  `).join("") : `<p class="empty-products">No encontramos productos con esa búsqueda.</p>`;
}

function openProductDetail(id) {
  const product = products.find(item => item.id === Number(id));
  if (!product) return;

  selectedProductId = product.id;

  document.getElementById("productDetail").innerHTML = `
    <div class="product-detail-layout">
      <div class="detail-image-wrap">
        ${product.image
          ? `<img src="${product.image}" alt="${product.name}" class="detail-image" onerror="this.outerHTML='<div class=&quot;detail-image-placeholder&quot;>Fotografía no disponible</div>'">`
          : `<div class="detail-image-placeholder">Fotografía próximamente</div>`}
      </div>
      <div class="detail-content">
        <p class="eyebrow">${product.category} · JERSEY UNIVERSE</p>
        <h2 id="detailName">${product.name}</h2>
        <p class="detail-price">${money(product.price)} <span>MXN</span></p>
        <p class="detail-description">${product.description}</p>
        <h3>Características</h3>
        <ul class="detail-list">${product.details.map(detail => `<li>${detail}</li>`).join("")}</ul>
        <label class="size-label" for="sizeSelect">Selecciona tu talla</label>
        <select id="sizeSelect" class="size-select">
          ${sizes.map(size => `<option value="${size}">${size}</option>`).join("")}
        </select>
        <p class="size-note">Tallas de demostración: CH, M, G y XG.</p>
        <button class="primary-button full-button" id="detailAddButton">Agregar al carrito</button>
      </div>
    </div>`;

  closePanels();
  productModal.classList.add("open");
  productModal.setAttribute("aria-hidden", "false");
  showOverlay();
}

function addToCart(id, size) {
  const found = cart.find(item => item.id === Number(id) && item.size === size);

  if (found) found.qty++;
  else cart.push({ id: Number(id), size, qty: 1 });

  saveCart();
  closePanels();
  toast("Jersey agregado al carrito");
}

function renderCart() {
  document.getElementById("cartCount").textContent =
    cart.reduce((sum, item) => sum + item.qty, 0);

  const container = document.getElementById("cartItems");

  if (!cart.length) {
    container.innerHTML =
      `<p class="muted empty-cart">Tu carrito está vacío. ¡Agrega tu jersey favorito!</p>`;
  } else {
    container.innerHTML = cart.map(item => {
      const product = products.find(x => x.id === item.id);
      if (!product) return "";

      return `
        <div class="cart-row">
          <img class="cart-thumb-image" src="${product.image}" alt="">
          <div class="cart-product-info">
            <h4>${product.name}</h4>
            <small>${money(product.price)} · Talla ${item.size}</small>
            <div class="quantity-controls">
              <button data-qty="${product.id}" data-size="${item.size}" data-change="-1" aria-label="Restar">−</button>
              <span>${item.qty}</span>
              <button data-qty="${product.id}" data-size="${item.size}" data-change="1" aria-label="Sumar">+</button>
            </div>
          </div>
          <button class="remove-item" data-remove="${product.id}" data-size="${item.size}">Quitar</button>
        </div>`;
    }).join("");
  }

  const subtotal = cart.reduce((sum, item) => {
    const product = products.find(p => p.id === item.id);
    return sum + (product ? product.price * item.qty : 0);
  }, 0);

  document.getElementById("cartSubtotal").textContent = money(subtotal);
}

// ======================================
// MENSAJES Y PANELES
// ======================================

function toast(message) {
  const element = document.getElementById("toast");
  element.textContent = message;
  element.classList.add("show");

  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => element.classList.remove("show"), 2300);
}

function showOverlay() {
  overlay.classList.add("open");
}

function closePanels() {
  cartPanel.classList.remove("open");
  cartPanel.setAttribute("aria-hidden", "true");

  accountModal.classList.remove("open");
  accountModal.setAttribute("aria-hidden", "true");

  productModal.classList.remove("open");
  productModal.setAttribute("aria-hidden", "true");

  overlay.classList.remove("open");
}

function openCart() {
  closePanels();
  cartPanel.classList.add("open");
  cartPanel.setAttribute("aria-hidden", "false");
  showOverlay();
}

function openAccount() {
  closePanels();
  accountModal.classList.add("open");
  accountModal.setAttribute("aria-hidden", "false");
  showOverlay();
  updateAccount();
  generateCaptcha();
}

// ======================================
// EVENTOS DE PRODUCTOS Y CARRITO
// ======================================

productGrid.addEventListener("click", event => {
  const detailButton = event.target.closest("[data-detail]");
  if (detailButton) openProductDetail(detailButton.dataset.detail);
});

document.getElementById("productDetail").addEventListener("click", event => {
  if (event.target.closest("#detailAddButton")) {
    const size = document.getElementById("sizeSelect").value;
    addToCart(selectedProductId, size);
  }
});

document.getElementById("cartItems").addEventListener("click", event => {
  const quantityButton = event.target.closest("[data-qty]");
  const removeButton = event.target.closest("[data-remove]");

  if (quantityButton) {
    const id = Number(quantityButton.dataset.qty);
    const size = quantityButton.dataset.size;
    const item = cart.find(entry => entry.id === id && entry.size === size);

    if (item) {
      item.qty += Number(quantityButton.dataset.change);

      if (item.qty <= 0) {
        cart = cart.filter(entry => !(entry.id === id && entry.size === size));
      }

      saveCart();
    }
  }

  if (removeButton) {
    cart = cart.filter(item =>
      !(item.id === Number(removeButton.dataset.remove) &&
        item.size === removeButton.dataset.size)
    );

    saveCart();
  }
});

// ======================================
// FILTROS Y BÚSQUEDA
// ======================================

document.getElementById("filters").addEventListener("click", event => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;

  activeFilter = button.dataset.filter;

  document.querySelectorAll(".filter").forEach(filter => {
    filter.classList.toggle("active", filter === button);
  });

  renderProducts();
});

document.getElementById("searchInput").addEventListener("input", renderProducts);

// ======================================
// BOTONES PRINCIPALES
// ======================================

document.getElementById("cartButton").addEventListener("click", openCart);
document.getElementById("accountButton").addEventListener("click", openAccount);

document.querySelectorAll("[data-close]").forEach(button => {
  button.addEventListener("click", closePanels);
});

overlay.addEventListener("click", closePanels);

// ======================================
// MENÚ DE NAVEGACIÓN
// ======================================

document.getElementById("menuToggle").addEventListener("click", () => {
  const nav = document.getElementById("mainNav");
  const opened = nav.classList.toggle("open");

  document.getElementById("menuToggle")
    .setAttribute("aria-expanded", String(opened));
});

document.querySelectorAll(".main-nav a").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("mainNav").classList.remove("open");
    document.getElementById("menuToggle")
      .setAttribute("aria-expanded", "false");
  });
});

// ======================================
// CONTINUAR PEDIDO
// ======================================

document.getElementById("checkoutButton").addEventListener("click", () => {
  if (!cart.length) {
    toast("Tu carrito está vacío");
    return;
  }

  if (!currentUser) {
    closePanels();
    openAccount();
    toast("Inicia sesión para continuar");
    return;
  }

  const lines = cart.map(item => {
    const product = products.find(p => p.id === item.id);
    return `${product.name} · Talla ${item.size} x ${item.qty} — ${money(product.price * item.qty)}`;
  }).join("\n");

  const total = cart.reduce((sum, item) => {
    const product = products.find(p => p.id === item.id);
    return sum + product.price * item.qty;
  }, 0);

  alert(
    `RESUMEN DE PEDIDO DEMO\n\n${lines}\n\nTotal: ${money(total)}\n\nEste prototipo no procesa pagos ni envía pedidos reales.`
  );
});

// ======================================
// INICIAR PÁGINA
// ======================================

document.getElementById("year").textContent = new Date().getFullYear();

renderProducts();
renderCart();