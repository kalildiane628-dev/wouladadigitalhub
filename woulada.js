const products = [
  {
    id: 'p1',
    title: 'Ordinateur Portable Ultrabook',
    description: 'Puissant et l�ger, id�al pour le t�l�travail et les pr�sentations.',
    category: 'electronics',
    price: 899,
    image: 'https://via.placeholder.com/520x360.png?text=Ordinateur+Portable',
  },
  {
    id: 'p2',
    title: 'Smartphone Haute Performance',
    description: 'Appareil photo 48MP et batterie longue dur�e pour une utilisation quotidienne.',
    category: 'electronics',
    price: 349,
    image: 'https://via.placeholder.com/520x360.png?text=Smartphone',
  },
  {
    id: 'p3',
    title: 'Montre Connect�e',
    description: 'Surveillez activit�, notifications et performances sportives en continu.',
    category: 'fashion',
    price: 129,
    image: 'https://via.placeholder.com/520x360.png?text=Montre+Connect%C3%A9e',
  },
  {
    id: 'p4',
    title: 'Enceinte Bluetooth',
    description: 'Son clair et basses profondes pour vos pr�sentations et �v�nements.',
    category: 'home',
    price: 79,
    image: 'https://via.placeholder.com/520x360.png?text=Enceinte+Bluetooth',
  },
  {
    id: 'p5',
    title: 'Lampe LED Design',
    description: 'Eclairage d'ambiance intelligent pour un espace de travail moderne.',
    category: 'home',
    price: 54,
    image: 'https://via.placeholder.com/520x360.png?text=Lampe+LED',
  },
  {
    id: 'p6',
    title: 'Sac a Main Premium',
    description: 'Style contemporain avec finitions haut de gamme pour les professionnels.',
    category: 'fashion',
    price: 179,
    image: 'https://via.placeholder.com/520x360.png?text=Sac+%C3%A0+Main',
  },
  {
    id: 'p7',
    title: 'Ensemble Soins de Peau',
    description: 'Routine beaute complete pour un teint lumineux et raffermi.',
    category: 'beauty',
    price: 69,
    image: 'https://via.placeholder.com/520x360.png?text=Soin+de+Peau',
  },
  {
    id: 'p8',
    title: 'Casque Audio Sans Fil',
    description: 'Isolation phonique et confort longue duree pour la productivite.',
    category: 'electronics',
    price: 149,
    image: 'https://via.placeholder.com/520x360.png?text=Casque+Audio',
  },
];

let cart = JSON.parse(localStorage.getItem('wouladaCart')) || [];
let users = JSON.parse(localStorage.getItem('wouladaUsers')) || [];
let authState = JSON.parse(localStorage.getItem('wouladaAuth')) || { loggedIn: false, name: null };

const productGrid = document.getElementById('productGrid');
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.filter-btn');
const cartToggle = document.querySelector('.cart-toggle');
const cartPanel = document.getElementById('cartPanel');
const closeCart = document.getElementById('closeCart');
const cartItemsContainer = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.querySelector('.cart-count');
const checkoutBtn = document.getElementById('checkoutBtn');
const loginBtn = document.querySelector('.login-btn');
const heroStart = document.getElementById('heroStart');
const authModal = document.getElementById('authModal');
const modalBackdrop = document.getElementById('modalBackdrop');
const closeAuth = document.getElementById('closeAuth');
const authTabs = document.querySelectorAll('.auth-tab');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const openSellerDashboard = document.getElementById('openSellerDashboard');
const sellerForm = document.getElementById('sellerForm');
const contactForm = document.getElementById('contactForm');
const contactFeedback = document.getElementById('contactFeedback');
const newsletterForm = document.getElementById('newsletterForm');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const conversationItems = document.querySelectorAll('.conversation-item');
const chatUserName = document.getElementById('chatUserName');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatWindow = document.getElementById('chatWindow');
const voiceCallBtn = document.getElementById('voiceCallBtn');
const videoCallBtn = document.getElementById('videoCallBtn');

const conversations = {
  Claire: [
    { incoming: true, text: 'Bonjour ! Je voudrais en savoir plus sur le produit.' },
    { incoming: false, text: 'Bien sur, je peux vous aider avec les details et la livraison.' },
  ],
  Alex: [
    { incoming: true, text: 'Avez-vous encore des stocks ce mois-ci ?' },
    { incoming: false, text: 'Oui, nous mettons a jour les stocks quotidiennement.' },
  ],
  Sofia: [
    { incoming: true, text: 'Je cherche un service de publicites video.' },
    { incoming: false, text: 'Nous proposons des packages pour tous les budgets.' },
  ],
};

const renderProducts = (query = '', category = 'all') => {
  productGrid.innerHTML = '';

  const filtered = products.filter((product) => {
    const matchesCategory = category === 'all' || product.category === category;
    const searchTerm = query.toLowerCase();
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      product.price.toString().includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    productGrid.innerHTML = '<p class="empty-state">Aucun produit ne correspond � votre recherche. Essayez un autre mot-cle.</p>';
    return;
  }

  filtered.forEach((product) => {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <div class="product-card-content">
        <div>
          <h3>${product.title}</h3>
          <p>${product.description}</p>
        </div>
        <div>
          <p class="price">${product.price} �</p>
          <button type="button" data-id="${product.id}">Ajouter au panier</button>
        </div>
      </div>
    `;
    productGrid.appendChild(card);
  });
};

const saveCart = () => {
  localStorage.setItem('wouladaCart', JSON.stringify(cart));
};

const saveUsers = () => {
  localStorage.setItem('wouladaUsers', JSON.stringify(users));
};

const saveAuth = () => {
  localStorage.setItem('wouladaAuth', JSON.stringify(authState));
};

const updateCartUI = () => {
  cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
  cartTotal.textContent = `${cart.reduce((total, item) => total + item.price * item.quantity, 0)} �`;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p class="empty-state">Votre panier est vide. Ajoutez des produits pour commencer.</p>';
    return;
  }

  cartItemsContainer.innerHTML = cart
    .map(
      (item) => `
        <article class="cart-item">
          <img src="${item.image}" alt="${item.title}">
          <div class="cart-item-details">
            <strong>${item.title}</strong>
            <span>${item.quantity} � ${item.price} �</span>
          </div>
          <div class="cart-item-actions">
            <button type="button" data-action="remove" data-id="${item.id}">Supprimer</button>
          </div>
        </article>
      `
    )
    .join('');
};

const addToCart = (productId) => {
  const product = products.find((item) => item.id === productId);
  if (!product) return;

  const existing = cart.find((item) => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart();
  updateCartUI();
  openCartPanel();
};

const removeFromCart = (productId) => {
  cart = cart.filter((item) => item.id !== productId);
  saveCart();
  updateCartUI();
};

const openCartPanel = () => {
  cartPanel.classList.add('open');
  cartPanel.setAttribute('aria-hidden', 'false');
};

const closeCartPanel = () => {
  cartPanel.classList.remove('open');
  cartPanel.setAttribute('aria-hidden', 'true');
};

const toggleAuthModal = (open = true) => {
  authModal.classList.toggle('active', open);
  modalBackdrop.classList.toggle('active', open);
  authModal.setAttribute('aria-hidden', String(!open));
};

const switchAuthTab = (target) => {
  authTabs.forEach((tab) => tab.classList.toggle('active', tab.dataset.form === target));
  loginForm.classList.toggle('active', target === 'loginForm');
  registerForm.classList.toggle('active', target === 'registerForm');
};

const updateAuthButton = () => {
  if (authState.loggedIn) {
    loginBtn.textContent = `Bonjour, ${authState.name}`;
    loginBtn.classList.add('logged-in');
  } else {
    loginBtn.textContent = 'Connexion';
    loginBtn.classList.remove('logged-in');
  }
};

const validateUser = (email, password) => {
  return users.find((user) => user.email === email && user.password === password);
};

const handleLogin = (event) => {
  event.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value.trim();

  const user = validateUser(email, password);
  if (!user) {
    alert('Identifiants invalides. Verifiez votre email et votre mot de passe.');
    return;
  }

  authState = { loggedIn: true, name: user.name };
  saveAuth();
  updateAuthButton();
  toggleAuthModal(false);
  alert(`Bienvenue, ${user.name} ! Vous etes connecte.`);
};

const handleRegister = (event) => {
  event.preventDefault();
  const name = document.getElementById('registerName').value.trim();
  const email = document.getElementById('registerEmail').value.trim();
  const password = document.getElementById('registerPassword').value.trim();

  if (users.some((user) => user.email === email)) {
    alert('Un compte existe deja avec cette adresse email.');
    return;
  }

  users.push({ name, email, password });
  saveUsers();
  authState = { loggedIn: true, name };
  saveAuth();
  updateAuthButton();
  toggleAuthModal(false);
  alert(`Votre compte a �t� cr��, ${name} !`);
};

const handleSellerDashboard = () => {
  if (!authState.loggedIn) {
    toggleAuthModal(true);
    switchAuthTab('loginForm');
    return;
  }

  alert(`Acces au tableau de bord vendeur active pour ${authState.name}. Pret pour l'integration backend.`);
};

const handleSellerForm = (event) => {
  event.preventDefault();
  const title = document.getElementById('sellerTitle').value.trim();
  const category = document.getElementById('sellerCategory').value.trim();
  const price = document.getElementById('sellerPrice').value.trim();
  const description = document.getElementById('sellerDescription').value.trim();

  if (!title || !category || !price || !description) {
    alert('Completez tous les champs pour creer votre annonce.');
    return;
  }

  alert(`Annonce cre : ${title} (${category}) pour ${price}. Elle sera affiche aprs intgration backend.`);
  sellerForm.reset();
};

const handleContactSubmit = (event) => {
  event.preventDefault();
  contactFeedback.textContent = 'Merci ! Votre message a bien �t� envoy�. Nous revenons vers vous rapidement.';
  contactFeedback.style.color = '#0b3c8c';
  contactForm.reset();
};

const handleNewsletterSubmit = (event) => {
  event.preventDefault();
  alert('Merci pour votre inscription � la newsletter !');
  newsletterForm.reset();
};

const appendChatMessages = (user) => {
  chatWindow.innerHTML = '';
  conversations[user].forEach((message) => {
    const bubble = document.createElement('div');
    bubble.className = `chat-message ${message.incoming ? 'incoming' : 'outgoing'}`;
    bubble.innerHTML = `<p>${message.text}</p>`;
    chatWindow.appendChild(bubble);
  });
  chatWindow.scrollTop = chatWindow.scrollHeight;
};

const selectConversation = (user, button) => {
  conversationItems.forEach((item) => item.classList.toggle('active', item === button));
  chatUserName.textContent = user;
  appendChatMessages(user);
};

const handleChatSubmit = (event) => {
  event.preventDefault();
  const text = chatInput.value.trim();
  if (!text) return;

  const user = chatUserName.textContent;
  conversations[user].push({ incoming: false, text });
  appendChatMessages(user);
  chatInput.value = '';
};

const toggleCallButton = (button, activeLabel, inactiveLabel) => {
  const isActive = button.classList.toggle('active');
  button.textContent = isActive ? `Finir ${inactiveLabel}` : inactiveLabel;
  button.style.background = isActive ? '#ffe8d7' : 'rgba(0, 87, 255, 0.08)';
};

const handleSmoothScrol = () => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      event.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      if (navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
      }
    });
  });
};

productGrid.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-id]');
  if (!button) return;
  addToCart(button.dataset.id);
});

cartItemsContainer.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-action="remove"]');
  if (!button) return;
  removeFromCart(button.dataset.id);
});

cartToggle.addEventListener('click', openCartPanel);
closeCart.addEventListener('click', closeCartPanel);
modalBackdrop.addEventListener('click', () => toggleAuthModal(false));
closeAuth.addEventListener('click', () => toggleAuthModal(false));
loginBtn.addEventListener('click', () => {
  if (authState.loggedIn) {
    if (confirm('Souhaitez-vous vous déconnecter ?')) {
      authState = { loggedIn: false, name: null };
      saveAuth();
      updateAuthButton();
    }
    return;
  }
  toggleAuthModal(true);
  switchAuthTab('loginForm');
});
heroStart.addEventListener('click', () => {
  toggleAuthModal(true);
  switchAuthTab(authState.loggedIn ? 'loginForm' : 'registerForm');
});
openSellerDashboard.addEventListener('click', handleSellerDashboard);
loginForm.addEventListener('submit', handleLogin);
registerForm.addEventListener('submit', handleRegister);
sellerForm.addEventListener('submit', handleSellerForm);
contactForm.addEventListener('submit', handleContactSubmit);
newsletterForm.addEventListener('submit', handleNewsletterSubmit);
chatForm.addEventListener('submit', handleChatSubmit);
voiceCallBtn.addEventListener('click', () => toggleCallButton(voiceCallBtn, 'finir l�appel vocal', 'Appel vocal'));
videoCallBtn.addEventListener('click', () => toggleCallButton(videoCallBtn, 'finir l�appel vid�o', 'Appel vid�o'));
menuToggle.addEventListener('click', () => navLinks.classList.toggle('open'));

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    renderProducts(searchInput.value, button.dataset.category);
  });
});

searchInput.addEventListener('input', () => {
  const activeCategory = document.querySelector('.filter-btn.active').dataset.category;
  renderProducts(searchInput.value, activeCategory);
});

conversationItems.forEach((item) => {
  item.addEventListener('click', () => selectConversation(item.dataset.user, item));
});

checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Votre panier est vide. Ajoutez des produits avant de commander.');
    return;
  }
  alert('Merci pour votre commande ! Vous serez redirig� vers une page de paiement apr�s int�gration backend.');
  cart = [];
  saveCart();
  updateCartUI();
  closeCartPanel();
});

const init = () => {
  updateCartUI();
  updateAuthButton();
  renderProducts();
  appendChatMessages('Claire');
  handleSmoothScrol();
};

init();
