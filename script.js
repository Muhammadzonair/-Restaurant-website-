// JavaScript for Bella Vista Restaurant Website

// Sample orders data
const sampleOrders = [
    {
        id: 'ORD-001',
        table: '5',
        items: 'Grilled Salmon, Tiramisu',
        status: 'Preparing'
    },
    {
        id: 'ORD-002',
        table: '12',
        items: 'Beef Tenderloin, Calamari',
        status: 'Served'
    },
    {
        id: 'ORD-003',
        table: '8',
        items: 'Mediterranean Bruschetta, Chocolate Lava Cake',
        status: 'Completed'
    },
    {
        id: 'ORD-004',
        table: '3',
        items: 'Crispy Calamari, Grilled Salmon',
        status: 'Preparing'
    },
    {
        id: 'ORD-005',
        table: '15',
        items: 'Beef Tenderloin, Tiramisu',
        status: 'Served'
    }
];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavbar();
    initSmoothScrolling();
    initMenuInteractions();
    initLoginForm();
    initAnimations();
});

// Navbar functionality
function initNavbar() {
    const navbar = document.querySelector('.custom-navbar');
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        });
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Menu interactions
function initMenuInteractions() {
    const orderButtons = document.querySelectorAll('.order-btn');
    
    orderButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get menu item info
            const menuItem = this.closest('.menu-item');
            const itemName = menuItem.querySelector('h4').textContent;
            const itemPrice = menuItem.querySelector('.price').textContent;
            
            // Show order confirmation
            showOrderConfirmation(itemName, itemPrice);
        });
    });
}

// Show order confirmation modal
function showOrderConfirmation(itemName, itemPrice) {
    // Create modal HTML
    const modalHTML = `
        <div class="modal fade" id="orderModal" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            <i class="fas fa-utensils me-2"></i>
                            Order Confirmation
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body text-center">
                        <div class="mb-3">
                            <i class="fas fa-check-circle text-success" style="font-size: 3rem;"></i>
                        </div>
                        <h4>Thank you for your order!</h4>
                        <p class="mb-3">You have ordered: <strong>${itemName}</strong></p>
                        <p class="text-muted">Price: <strong>${itemPrice}</strong></p>
                        <p class="small text-muted">This is a demo order. In a real application, this would be sent to the kitchen.</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" onclick="addToCart('${itemName}', '${itemPrice}')">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if any
    const existingModal = document.getElementById('orderModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('orderModal'));
    modal.show();
}

// Add to cart functionality
function addToCart(itemName, itemPrice) {
    // Create cart item
    const cartItem = {
        name: itemName,
        price: itemPrice,
        timestamp: new Date().toLocaleTimeString()
    };
    
    // Get existing cart or create new one
    let cart = JSON.parse(localStorage.getItem('restaurantCart')) || [];
    cart.push(cartItem);
    localStorage.setItem('restaurantCart', JSON.stringify(cart));
    
    // Show success message
    showToast('Item added to cart!', 'success');
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('orderModal'));
    modal.hide();
}

// Login form functionality
function initLoginForm() {
    const loginForm = document.getElementById('staffLoginForm');
    const ordersContainer = document.getElementById('ordersContainer');
    const ordersTableBody = document.getElementById('ordersTableBody');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Simple validation (demo purposes)
        if (username && password) {
            // Show orders table
            showOrdersTable();
            showToast('Login successful!', 'success');
        } else {
            showToast('Please enter both username and password', 'error');
        }
    });
}

// Show orders table
function showOrdersTable() {
    const ordersContainer = document.getElementById('ordersContainer');
    const ordersTableBody = document.getElementById('ordersTableBody');
    
    // Clear existing orders
    ordersTableBody.innerHTML = '';
    
    // Add sample orders
    sampleOrders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${order.id}</td>
            <td>${order.table}</td>
            <td>${order.items}</td>
            <td>
                <span class="badge ${getStatusBadgeClass(order.status)}">${order.status}</span>
            </td>
        `;
        ordersTableBody.appendChild(row);
    });
    
    // Show orders container
    ordersContainer.style.display = 'block';
    
    // Add animation
    ordersContainer.style.opacity = '0';
    ordersContainer.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        ordersContainer.style.transition = 'all 0.5s ease';
        ordersContainer.style.opacity = '1';
        ordersContainer.style.transform = 'translateY(0)';
    }, 100);
}

// Get status badge class
function getStatusBadgeClass(status) {
    switch(status) {
        case 'Preparing':
            return 'bg-warning';
        case 'Served':
            return 'bg-info';
        case 'Completed':
            return 'bg-success';
        default:
            return 'bg-secondary';
    }
}

// Animations on scroll
function initAnimations() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe menu items
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });
    
    // Observe menu categories
    const menuCategories = document.querySelectorAll('.menu-category');
    menuCategories.forEach((category, index) => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(30px)';
        category.style.transition = `all 0.6s ease ${index * 0.2}s`;
        observer.observe(category);
    });
}

// Toast notification system
function showToast(message, type = 'info') {
    // Create toast container if it doesn't exist
    let toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toastContainer';
        toastContainer.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
        `;
        document.body.appendChild(toastContainer);
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show`;
    toast.style.cssText = `
        margin-bottom: 10px;
        min-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'} me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    toastContainer.appendChild(toast);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.remove();
        }
    }, 5000);
}

// Parallax effect for hero section
function initParallax() {
    const heroSection = document.querySelector('.hero-section');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (heroSection) {
            heroSection.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Initialize parallax
initParallax();

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Add some interactive hover effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to menu items
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02) translateY(-5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
        });
    });
    
    // Add click effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255,255,255,0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

