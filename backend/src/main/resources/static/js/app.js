// API Base URL
const API_URL = 'http://localhost:8080/api';

// State
let currentUser = null;
let cart = [];
let currentRestaurant = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    loadRestaurants();
    loadFeaturedRestaurants();
    startSlider();
});

// Slider functionality
let currentSlideIndex = 0;
let sliderInterval;

function startSlider() {
    sliderInterval = setInterval(() => {
        changeSlide(1);
    }, 5000); // Auto-advance every 5 seconds
}

function changeSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    slides[currentSlideIndex].classList.remove('active');
    dots[currentSlideIndex].classList.remove('active');
    
    currentSlideIndex += direction;
    
    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    }
    
    slides[currentSlideIndex].classList.add('active');
    dots[currentSlideIndex].classList.add('active');
    
    // Reset timer
    clearInterval(sliderInterval);
    startSlider();
}

function currentSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    slides[currentSlideIndex].classList.remove('active');
    dots[currentSlideIndex].classList.remove('active');
    
    currentSlideIndex = index;
    
    slides[currentSlideIndex].classList.add('active');
    dots[currentSlideIndex].classList.add('active');
    
    // Reset timer
    clearInterval(sliderInterval);
    startSlider();
}

// Load Featured Restaurants
async function loadFeaturedRestaurants() {
    try {
        const response = await fetch(`${API_URL}/restaurants`);
        const restaurants = await response.json();
        
        const container = document.getElementById('featuredRestaurants');
        
        if (restaurants.length === 0) {
            container.innerHTML = '<div class="empty-state"><p>No restaurants available yet</p></div>';
            return;
        }
        
        // Show only first 3 restaurants as featured
        const featured = restaurants.slice(0, 3);
        
        container.innerHTML = featured.map(restaurant => `
            <div class="card" onclick="viewRestaurant(${restaurant.id})">
                <img src="${restaurant.imageUrl || 'https://via.placeholder.com/300x200'}" alt="${restaurant.name}">
                <div class="card-body">
                    <h3 class="card-title">${restaurant.name}</h3>
                    <p class="card-text">${restaurant.description || ''}</p>
                    <div class="card-meta">
                        <span>⭐ ${restaurant.rating.toFixed(1)}</span>
                        <span>🕐 ${restaurant.deliveryTime} min</span>
                        <span>💵 $${restaurant.deliveryFee.toFixed(2)} delivery</span>
                    </div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading featured restaurants:', error);
    }
}

// Show Toast
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast show';
    if (type === 'error') toast.style.background = '#dc3545';
    if (type === 'success') toast.style.background = '#28a745';
    setTimeout(() => {
        toast.className = 'toast';
        toast.style.background = '#333';
    }, 3000);
}

// Show Section
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
    
    if (sectionId === 'restaurants') loadRestaurants();
    if (sectionId === 'cart') displayCart();
    if (sectionId === 'orders') loadOrders();
}

// Check Authentication
function checkAuth() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
        currentUser = JSON.parse(user);
        document.getElementById('loginLink').style.display = 'none';
        document.getElementById('registerLink').style.display = 'none';
        document.getElementById('logoutBtn').style.display = 'block';
        document.getElementById('ordersLink').style.display = 'block';
    }
}

// Register
async function register(event) {
    event.preventDefault();
    
    const data = {
        email: document.getElementById('regEmail').value,
        password: document.getElementById('regPassword').value,
        fullName: document.getElementById('regFullName').value,
        phone: document.getElementById('regPhone').value,
        address: document.getElementById('regAddress').value
    };
    
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            const result = await response.json();
            localStorage.setItem('token', result.token);
            localStorage.setItem('user', JSON.stringify(result));
            currentUser = result;
            showToast('Registration successful!', 'success');
            checkAuth();
            showSection('home');
        } else {
            showToast('Registration failed', 'error');
        }
    } catch (error) {
        showToast('Error: ' + error.message, 'error');
    }
}

// Login
async function login(event) {
    event.preventDefault();
    
    const data = {
        email: document.getElementById('loginEmail').value,
        password: document.getElementById('loginPassword').value
    };
    
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            const result = await response.json();
            localStorage.setItem('token', result.token);
            localStorage.setItem('user', JSON.stringify(result));
            currentUser = result;
            showToast('Login successful!', 'success');
            checkAuth();
            showSection('home');
        } else {
            showToast('Login failed', 'error');
        }
    } catch (error) {
        showToast('Error: ' + error.message, 'error');
    }
}

// Logout
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    currentUser = null;
    cart = [];
    updateCartCount();
    document.getElementById('loginLink').style.display = 'block';
    document.getElementById('registerLink').style.display = 'block';
    document.getElementById('logoutBtn').style.display = 'none';
    document.getElementById('ordersLink').style.display = 'none';
    showToast('Logged out successfully', 'success');
    showSection('home');
}

// Load Restaurants
async function loadRestaurants() {
    try {
        const response = await fetch(`${API_URL}/restaurants`);
        const restaurants = await response.json();
        
        const container = document.getElementById('restaurantsList');
        
        if (restaurants.length === 0) {
            container.innerHTML = '<div class="empty-state"><h3>No restaurants available</h3><p>Check back later!</p></div>';
            return;
        }
        
        container.innerHTML = restaurants.map(restaurant => `
            <div class="card" onclick="viewRestaurant(${restaurant.id})">
                <img src="${restaurant.imageUrl || 'https://via.placeholder.com/300x200'}" alt="${restaurant.name}">
                <div class="card-body">
                    <h3 class="card-title">${restaurant.name}</h3>
                    <p class="card-text">${restaurant.description || ''}</p>
                    <div class="card-meta">
                        <span>⭐ ${restaurant.rating.toFixed(1)}</span>
                        <span>🕐 ${restaurant.deliveryTime} min</span>
                        <span>💵 $${restaurant.deliveryFee.toFixed(2)} delivery</span>
                    </div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        showToast('Error loading restaurants', 'error');
    }
}

// View Restaurant
async function viewRestaurant(restaurantId) {
    try {
        const [restaurantRes, menuRes] = await Promise.all([
            fetch(`${API_URL}/restaurants/${restaurantId}`),
            fetch(`${API_URL}/restaurants/${restaurantId}/menu`)
        ]);
        
        const restaurant = await restaurantRes.json();
        const menu = await menuRes.json();
        
        currentRestaurant = restaurant;
        
        document.getElementById('restaurantInfo').innerHTML = `
            <h2>${restaurant.name}</h2>
            <p>${restaurant.description || ''}</p>
            <div class="card-meta">
                <span>⭐ ${restaurant.rating.toFixed(1)}</span>
                <span>🕐 ${restaurant.deliveryTime} min</span>
                <span>💵 $${restaurant.deliveryFee.toFixed(2)} delivery</span>
            </div>
        `;
        
        document.getElementById('menuItems').innerHTML = menu.map(item => `
            <div class="card">
                <img src="${item.imageUrl || 'https://via.placeholder.com/200'}" alt="${item.name}">
                <div class="card-body">
                    <h3 class="card-title">${item.name}</h3>
                    <p class="card-text">${item.description || ''}</p>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span class="price">$${item.price.toFixed(2)}</span>
                        <button class="btn btn-primary" onclick='addToCart(${JSON.stringify(item)})'>Add to Cart</button>
                    </div>
                </div>
            </div>
        `).join('');
        
        showSection('restaurantDetail');
    } catch (error) {
        showToast('Error loading restaurant', 'error');
    }
}

// Add to Cart
function addToCart(item) {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    
    updateCartCount();
    showToast(`${item.name} added to cart!`, 'success');
}

// Update Cart Count
function updateCartCount() {
    document.getElementById('cartCount').textContent = cart.length;
}

// Display Cart
function displayCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartSummaryContainer = document.getElementById('cartSummary');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-state"><h3>Your cart is empty</h3><p>Add some delicious items!</p></div>';
        cartSummaryContainer.innerHTML = '';
        return;
    }
    
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div>
                <h4>${item.name}</h4>
                <p class="price">$${item.price.toFixed(2)}</p>
            </div>
            <div style="display: flex; gap: 1rem; align-items: center;">
                <button class="btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                <span>${item.quantity}</span>
                <button class="btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                <button class="btn" onclick="removeFromCart(${item.id})" style="background: #dc3545; color: white;">Remove</button>
            </div>
        </div>
    `).join('');
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = currentRestaurant?.deliveryFee || 0;
    const total = subtotal + deliveryFee;
    
    cartSummaryContainer.innerHTML = `
        <div class="cart-summary">
            <h3>Order Summary</h3>
            <div class="summary-row">
                <span>Subtotal</span>
                <span>$${subtotal.toFixed(2)}</span>
            </div>
            <div class="summary-row">
                <span>Delivery Fee</span>
                <span>$${deliveryFee.toFixed(2)}</span>
            </div>
            <div class="summary-row total">
                <span>Total</span>
                <span>$${total.toFixed(2)}</span>
            </div>
            <button class="btn btn-primary" onclick="checkout()" style="width: 100%; margin-top: 1rem;">Checkout</button>
        </div>
    `;
}

// Update Quantity
function updateQuantity(itemId, newQuantity) {
    if (newQuantity === 0) {
        removeFromCart(itemId);
        return;
    }
    
    const item = cart.find(cartItem => cartItem.id === itemId);
    if (item) {
        item.quantity = newQuantity;
        displayCart();
    }
}

// Remove from Cart
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartCount();
    displayCart();
}

// Checkout
async function checkout() {
    if (!currentUser) {
        showToast('Please login to checkout', 'error');
        showSection('login');
        return;
    }
    
    if (!currentRestaurant) {
        showToast('Restaurant information missing', 'error');
        return;
    }
    
    const orderData = {
        restaurantId: currentRestaurant.id,
        items: cart.map(item => ({
            menuItemId: item.id,
            quantity: item.quantity
        })),
        deliveryAddress: currentUser.address || 'Default Address'
    };
    
    try {
        const response = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(orderData)
        });
        
        if (response.ok) {
            showToast('Order placed successfully!', 'success');
            cart = [];
            currentRestaurant = null;
            updateCartCount();
            showSection('orders');
            loadOrders();
        } else {
            showToast('Failed to place order', 'error');
        }
    } catch (error) {
        showToast('Error: ' + error.message, 'error');
    }
}

// Load Orders
async function loadOrders() {
    if (!currentUser) {
        showToast('Please login to view orders', 'error');
        showSection('login');
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/orders`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        
        const orders = await response.json();
        const container = document.getElementById('ordersList');
        
        if (orders.length === 0) {
            container.innerHTML = '<div class="empty-state"><h3>No orders yet</h3><p>Start ordering delicious food!</p></div>';
            return;
        }
        
        container.innerHTML = orders.map(order => `
            <div class="order-card">
                <div class="order-header">
                    <div>
                        <h3>${order.restaurant.name}</h3>
                        <p>${new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <span class="order-status ${order.status.toLowerCase()}">${order.status}</span>
                </div>
                <div>
                    ${order.orderItems.map(item => `
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                            <span>${item.menuItem.name} x ${item.quantity}</span>
                            <span>$${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    `).join('')}
                </div>
                <div style="display: flex; justify-content: space-between; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #eee;">
                    <strong>Total</strong>
                    <strong>$${order.totalAmount.toFixed(2)}</strong>
                </div>
            </div>
        `).join('');
    } catch (error) {
        showToast('Error loading orders', 'error');
    }
}
