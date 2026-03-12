// API Base URL
const API_URL = 'http://localhost:8080/api';

// State
let currentUser = null;
let cart = [];
let currentRestaurant = null;
let allRestaurants = []; // Store all restaurants for search

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    loadRestaurants();
    loadFeaturedRestaurants();
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
    
    console.log('Auth check - Token:', token ? 'exists' : 'missing', 'User:', user ? 'exists' : 'missing');
    
    if (token && user) {
        try {
            currentUser = JSON.parse(user);
            console.log('Current user:', currentUser);
            document.getElementById('loginLink').style.display = 'none';
            document.getElementById('registerLink').style.display = 'none';
            document.getElementById('logoutBtn').style.display = 'block';
            document.getElementById('ordersLink').style.display = 'block';
        } catch (e) {
            console.error('Invalid user data, clearing storage');
            localStorage.clear();
            currentUser = null;
        }
    } else {
        // Clear any partial data
        localStorage.clear();
        currentUser = null;
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
        
        allRestaurants = restaurants; // Store for search
        
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
    
    if (cart.length === 0) {
        showToast('Your cart is empty', 'error');
        return;
    }
    
    // Show checkout page
    showSection('checkout');
    displayCheckoutSummary();
    
    // Set default address
    document.getElementById('deliveryAddress').value = currentUser.address || '';
}

// Display Checkout Summary
function displayCheckoutSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = currentRestaurant?.deliveryFee || 2.99;
    const tax = subtotal * 0.05; // 5% tax
    const total = subtotal + deliveryFee + tax;
    
    document.getElementById('checkoutSummary').innerHTML = `
        <div class="summary-items">
            ${cart.map(item => `
                <div class="summary-item">
                    <span>${item.name} x ${item.quantity}</span>
                    <span>$${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            `).join('')}
        </div>
        <div class="summary-row">
            <span>Subtotal</span>
            <span>$${subtotal.toFixed(2)}</span>
        </div>
        <div class="summary-row">
            <span>Delivery Fee</span>
            <span>$${deliveryFee.toFixed(2)}</span>
        </div>
        <div class="summary-row">
            <span>Tax (5%)</span>
            <span>$${tax.toFixed(2)}</span>
        </div>
        <div class="summary-row total">
            <span>Total</span>
            <span>$${total.toFixed(2)}</span>
        </div>
    `;
}

// Place Order
async function placeOrder() {
    if (!currentUser) {
        showToast('Please login to place order', 'error');
        showSection('login');
        return;
    }
    
    const address = document.getElementById('deliveryAddress').value;
    if (!address) {
        showToast('Please enter delivery address', 'error');
        return;
    }
    
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    
    // Validate payment details
    if (paymentMethod === 'card') {
        const cardNumber = document.getElementById('cardNumber').value;
        const cardExpiry = document.getElementById('cardExpiry').value;
        const cardCVV = document.getElementById('cardCVV').value;
        const cardName = document.getElementById('cardName').value;
        
        if (!cardNumber || !cardExpiry || !cardCVV || !cardName) {
            showToast('Please fill in all card details', 'error');
            return;
        }
    } else if (paymentMethod === 'upi') {
        const upiId = document.getElementById('upiId').value;
        if (!upiId) {
            showToast('Please enter UPI ID', 'error');
            return;
        }
    }
    
    if (!currentRestaurant) {
        showToast('Restaurant information missing', 'error');
        return;
    }
    
    const token = localStorage.getItem('token');
    if (!token) {
        showToast('Session expired. Please login again', 'error');
        localStorage.clear();
        currentUser = null;
        showSection('login');
        return;
    }
    
    const orderData = {
        restaurantId: currentRestaurant.id,
        items: cart.map(item => ({
            menuItemId: item.id,
            quantity: item.quantity
        })),
        deliveryAddress: address
    };
    
    console.log('Placing order:', orderData);
    console.log('Token:', token.substring(0, 20) + '...');
    
    try {
        showToast('Processing payment...', 'info');
        
        const response = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(orderData)
        });
        
        console.log('Response status:', response.status);
        
        if (response.ok) {
            const order = await response.json();
            console.log('Order created:', order);
            
            setTimeout(() => {
                showToast(`Order #${order.id} placed successfully! Payment via ${paymentMethod.toUpperCase()}`, 'success');
                cart = [];
                currentRestaurant = null;
                updateCartCount();
                showSection('orders');
                loadOrders();
            }, 1500);
        } else if (response.status === 401 || response.status === 403) {
            console.error('Authentication failed');
            showToast('Session expired. Please login again', 'error');
            localStorage.clear();
            currentUser = null;
            checkAuth();
            showSection('login');
        } else {
            const errorText = await response.text();
            console.error('Order error:', response.status, errorText);
            showToast(`Failed to place order (${response.status}). Please try logging in again.`, 'error');
        }
    } catch (error) {
        console.error('Network error:', error);
        showToast('Network error: ' + error.message, 'error');
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


// Search Restaurants
function searchRestaurants() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    if (!searchTerm) {
        loadRestaurants();
        return;
    }
    
    const filtered = allRestaurants.filter(restaurant => 
        restaurant.name.toLowerCase().includes(searchTerm) ||
        (restaurant.description && restaurant.description.toLowerCase().includes(searchTerm))
    );
    
    const container = document.getElementById('restaurantsList');
    
    if (filtered.length === 0) {
        container.innerHTML = '<div class="empty-state"><h3>No restaurants found</h3><p>Try searching for "biryani" or "pizza"</p></div>';
        showSection('restaurants');
        return;
    }
    
    container.innerHTML = filtered.map(restaurant => `
        <div class="card" onclick="viewRestaurant(${restaurant.id})">
            <img src="${restaurant.imageUrl || 'https://via.placeholder.com/300x200'}" alt="${restaurant.name}">
            <div class="card-body">
                <h3 class="card-title">${restaurant.name}</h3>
                <p class="card-text">${restaurant.description || ''}</p>
                <div class="card-meta">
                    <span>⭐ ${restaurant.rating.toFixed(1)}</span>
                    <span>🕐 ${restaurant.deliveryTime} min</span>
                    <span>💵 ${restaurant.deliveryFee.toFixed(2)} delivery</span>
                </div>
            </div>
        </div>
    `).join('');
    
    // Auto-switch to restaurants section when searching
    showSection('restaurants');
}


// Filter by Category
function filterByCategory(category) {
    // Update active state
    document.querySelectorAll('.category-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.closest('.category-item').classList.add('active');
    
    // For now, show all restaurants for food category
    // In a real app, you'd filter by restaurant category
    if (category === 'food' || category === 'all') {
        loadRestaurants();
        showSection('restaurants');
    } else {
        // Show coming soon message for other categories
        const container = document.getElementById('restaurantsList');
        container.innerHTML = `
            <div class="empty-state">
                <h3>🚀 Coming Soon!</h3>
                <p>${getCategoryName(category)} will be available soon</p>
                <button class="btn btn-primary" onclick="filterByCategory('food')">Browse Food Delivery</button>
            </div>
        `;
        showSection('restaurants');
    }
}

// Switch Highlight
function switchHighlight(type, element) {
    // Update active state
    document.querySelectorAll('.highlight-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    element.classList.add('active');
    
    if (type === 'delivery') {
        // Show food delivery restaurants
        loadRestaurants();
        showSection('restaurants');
    } else if (type === 'dineout') {
        // Show dine-out restaurants
        const container = document.getElementById('restaurantsList');
        container.innerHTML = `
            <div class="empty-state">
                <h3>🍴 Dine Out</h3>
                <p>Discover restaurants for dining in. Reserve your table now!</p>
                <button class="btn btn-primary" onclick="switchHighlight('delivery', document.querySelector('.highlight-tab'))">Back to Delivery</button>
            </div>
        `;
        showSection('restaurants');
    } else if (type === 'giftables') {
        // Show gift options
        const container = document.getElementById('restaurantsList');
        container.innerHTML = `
            <div class="empty-state">
                <h3>🎁 Giftables</h3>
                <p>Send delicious gifts to your loved ones. Gift cards and hampers coming soon!</p>
                <button class="btn btn-primary" onclick="switchHighlight('delivery', document.querySelector('.highlight-tab'))">Back to Delivery</button>
            </div>
        `;
        showSection('restaurants');
    }
}

function getCategoryName(category) {
    const names = {
        'grocery': 'Grocery & Kitchen',
        'snacks': 'Snacks',
        'drinks': 'Drinks',
        'beauty': 'Beauty',
        'wellness': 'Wellness'
    };
    return names[category] || category;
}


// Search and show results
function searchAndShow(term) {
    document.getElementById('searchInput').value = term;
    searchRestaurants();
}

// Load home restaurants (first 6)
async function loadHomeRestaurants() {
    try {
        const response = await fetch(`${API_URL}/restaurants`);
        const restaurants = await response.json();
        
        const container = document.getElementById('homeRestaurants');
        const homeRestaurants = restaurants.slice(0, 6);
        
        container.innerHTML = homeRestaurants.map(restaurant => `
            <div class="card" onclick="viewRestaurant(${restaurant.id})">
                <img src="${restaurant.imageUrl || 'https://via.placeholder.com/300x200'}" alt="${restaurant.name}">
                <div class="card-body">
                    <h3 class="card-title">${restaurant.name}</h3>
                    <p class="card-text">${restaurant.description || ''}</p>
                    <div class="card-meta">
                        <span>⭐ ${restaurant.rating.toFixed(1)}</span>
                        <span>🕐 ${restaurant.deliveryTime} min</span>
                        <span>💵 $${restaurant.deliveryFee.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading home restaurants:', error);
    }
}

// Update initialization
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    loadRestaurants();
    loadFeaturedRestaurants();
    loadHomeRestaurants();
});


// Toggle payment method details
document.addEventListener('change', (e) => {
    if (e.target.name === 'payment') {
        document.getElementById('cardDetails').style.display = 'none';
        document.getElementById('upiDetails').style.display = 'none';
        
        if (e.target.value === 'card') {
            document.getElementById('cardDetails').style.display = 'block';
        } else if (e.target.value === 'upi') {
            document.getElementById('upiDetails').style.display = 'block';
        }
    }
});
