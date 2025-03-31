// Sample product data
const sampleProducts = [
    {
        id: 'PR001',
        name: 'مرچ پاؤڊر',
        category: 'masala',
        price: 160,
        cost: 120,
        stock: 12,
        alert: 5,
        unit: 'kg',
        status: 'in_stock',
        image: 'https://via.placeholder.com/40'
    },
    {
        id: 'PR002',
        name: 'ڪاري مرچ',
        category: 'masala',
        price: 180,
        cost: 140,
        stock: 8,
        alert: 5,
        unit: 'kg',
        status: 'in_stock',
        image: 'https://via.placeholder.com/40'
    },
    {
        id: 'PR003',
        name: 'هڊي پاؤڊر',
        category: 'blend',
        price: 250,
        cost: 200,
        stock: 3,
        alert: 5,
        unit: 'kg',
        status: 'low_stock',
        image: 'https://via.placeholder.com/40'
    },
    {
        id: 'PR004',
        name: 'زعفران',
        category: 'spice',
        price: 5000,
        cost: 4500,
        stock: 0,
        alert: 2,
        unit: 'g',
        status: 'out_of_stock',
        image: 'https://via.placeholder.com/40'
    }
];

// DOM Elements
const productsTable = document.getElementById('productsTable');
const productSearch = document.getElementById('productSearch');
const categoryFilter = document.getElementById('categoryFilter');
const statusFilter = document.getElementById('statusFilter');
const addProductBtn = document.getElementById('addProductBtn');
const productModal = document.getElementById('productModal');
const deleteModal = document.getElementById('deleteModal');
const productForm = document.getElementById('productForm');
const prevPageBtn = document.getElementById('prevPage');
const nextPageBtn = document.getElementById('nextPage');

// Current state
let currentPage = 1;
const productsPerPage = 10;
let currentProducts = [...sampleProducts];
let currentProductId = null;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    setupEventListeners();
});

function renderProducts(products = currentProducts) {
    const tbody = productsTable.querySelector('tbody');
    tbody.innerHTML = '';

    if (products.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" class="text-center">ڪوبه پراڊڪٽ ڪونه مليو</td></tr>`;
        return;
    }

    products.forEach(product => {
        const row = document.createElement('tr');
        
        // Determine status badge
        let statusBadge = '';
        if (product.stock <= 0) {
            statusBadge = '<span class="stock-badge out-of-stock">ختم ٿي ويو</span>';
        } else if (product.stock <= product.alert) {
            statusBadge = '<span class="stock-badge low-stock">گهٽ اسٽاڪ</span>';
        } else {
            statusBadge = '<span class="stock-badge in-stock">اسٽاڪ ۾</span>';
        }

        row.innerHTML = `
            <td>${product.id}</td>
            <td><img src="${product.image}" alt="${product.name}"></td>
            <td>${product.name}</td>
            <td>${getCategoryName(product.category)}</td>
            <td>₹${product.price}/${product.unit}</td>
            <td>${product.stock} ${product.unit}</td>
            <td>${statusBadge}</td>
            <td>
                <button class="btn btn-sm btn-primary edit-btn" data-id="${product.id}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger delete-btn" data-id="${product.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        
        tbody.appendChild(row);
    });

    // Update pagination
    updatePagination();
}

function setupEventListeners() {
    // Search functionality
    productSearch.addEventListener('input', filterProducts);
    
    // Filter functionality
    categoryFilter.addEventListener('change', filterProducts);
    statusFilter.addEventListener('change', filterProducts);
    
    // Add product button
    addProductBtn.addEventListener('click', () => {
        currentProductId = null;
        document.getElementById('modalTitle').innerHTML = '<i class="fas fa-box"></i> نئون پراڊڪٽ شامل ڪريو';
        productForm.reset();
        openModal(productModal);
    });
    
    // Form submission
    productForm.addEventListener('submit', handleFormSubmit);
    
    // Pagination buttons
    prevPageBtn.addEventListener('click', goToPrevPage);
    nextPageBtn.addEventListener('click', goToNextPage);
    
    // Event delegation for edit/delete buttons
    productsTable.addEventListener('click', (e) => {
        if (e.target.closest('.edit-btn')) {
            const productId = e.target.closest('.edit-btn').dataset.id;
            editProduct(productId);
        }
        
        if (e.target.closest('.delete-btn')) {
            const productId = e.target.closest('.delete-btn').dataset.id;
            confirmDelete(productId);
        }
    });
    
    // Delete confirmation
    document.getElementById('confirmDelete').addEventListener('click', deleteProduct);
}

function filterProducts() {
    const searchTerm = productSearch.value.toLowerCase();
    const category = categoryFilter.value;
    const status = statusFilter.value;
    
    currentProducts = sampleProducts.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) || 
                             product.id.toLowerCase().includes(searchTerm);
        const matchesCategory = category ? product.category === category : true;
        const matchesStatus = status ? product.status === status : true;
        
        return matchesSearch && matchesCategory && matchesStatus;
    });
    
    currentPage = 1;
    renderProducts();
}

function editProduct(productId) {
    const product = sampleProducts.find(p => p.id === productId);
    if (!product) return;
    
    currentProductId = productId;
    document.getElementById('modalTitle').innerHTML = `<i class="fas fa-edit"></i> پراڊڪٽ ترميم ڪريو: ${product.name}`;
    
    // Fill form with product data
    document.getElementById('productName').value = product.name;
    document.getElementById('productCode').value = product.id;
    document.getElementById('productCategory').value = product.category;
    document.getElementById('productUnit').value = product.unit;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productCost').value = product.cost;
    document.getElementById('productStock').value = product.stock;
    document.getElementById('productAlert').value = product.alert;
    document.getElementById('productDesc').value = product.desc || '';
    
    openModal(productModal);
}

function confirmDelete(productId) {
    const product = sampleProducts.find(p => p.id === productId);
    if (!product) return;
    
    document.getElementById('deleteProductName').textContent = product.name;
    currentProductId = productId;
    openModal(deleteModal);
}

function deleteProduct() {
    // In a real app, you would make an API call here
    const index = sampleProducts.findIndex(p => p.id === currentProductId);
    if (index !== -1) {
        sampleProducts.splice(index, 1);
        filterProducts(); // Refresh the list
    }
    
    closeModal();
    showAlert('پراڊڪٽ ڊليٽ ٿي ويو آهي', 'success');
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const productData = {
        id: document.getElementById('productCode').value,
        name: document.getElementById('productName').value,
        category: document.getElementById('productCategory').value,
        unit: document.getElementById('productUnit').value,
        price: parseFloat(document.getElementById('productPrice').value),
        cost: parseFloat(document.getElementById('productCost').value),
        stock: parseInt(document.getElementById('productStock').value),
        alert: parseInt(document.getElementById('productAlert').value) || 5,
        desc: document.getElementById('productDesc').value,
        image: 'https://via.placeholder.com/40' // In real app, handle image upload
    };
    
    if (currentProductId) {
        // Update existing product
        const index = sampleProducts.findIndex(p => p.id === currentProductId);
        if (index !== -1) {
            sampleProducts[index] = {...sampleProducts[index], ...productData};
        }
        showAlert('پراڊڪٽ کي اپڊيٽ ڪيو ويو آهي', 'success');
    } else {
        // Add new product
        sampleProducts.unshift(productData);
        showAlert('نئون پراڊڪٽ شامل ڪيو ويو آهي', 'success');
    }
    
    closeModal();
    filterProducts(); // Refresh the list
}

function getCategoryName(category) {
    const categories = {
        'masala': 'مسالا',
        'spice': 'مصالحو',
        'blend': 'مرڪب'
    };
    return categories[category] || category;
}

function updatePagination() {
    const totalPages = Math.ceil(currentProducts.length / productsPerPage);
    document.querySelector('.page-info').textContent = `صفحو ${currentPage} جو ${totalPages}`;
    
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages || totalPages === 0;
}

function goToPrevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderProducts();
    }
}

function goToNextPage() {
    const totalPages = Math.ceil(currentProducts.length / productsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderProducts();
    }
}

function openModal(modal) {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('show');
    });
    document.body.style.overflow = '';
}

function showAlert(message, type) {
    // In a real app, you would implement a proper alert/notification system
    alert(message);
}