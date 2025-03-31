document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const addSupplierBtn = document.getElementById('addSupplierBtn');
    const supplierModal = document.getElementById('supplierModal');
    const deleteModal = document.getElementById('deleteModal');
    const supplierForm = document.getElementById('supplierForm');
    const confirmDeleteBtn = document.getElementById('confirmDelete');
    const supplierSearch = document.getElementById('supplierSearch');
    const typeFilter = document.getElementById('typeFilter');
    const statusFilter = document.getElementById('statusFilter');
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
    
    // Current editing supplier
    let currentSupplierId = null;
    
    // Event Listeners
    addSupplierBtn.addEventListener('click', () => openSupplierModal());
    confirmDeleteBtn.addEventListener('click', deleteSupplier);
    supplierSearch.addEventListener('input', filterSuppliers);
    typeFilter.addEventListener('change', filterSuppliers);
    statusFilter.addEventListener('change', filterSuppliers);
    prevPageBtn.addEventListener('click', goToPrevPage);
    nextPageBtn.addEventListener('click', goToNextPage);
    
    // Initialize table with sample data
    renderSuppliersTable();
    
    // Functions
    function openSupplierModal(supplier = null) {
        const modalTitle = document.getElementById('modalTitle');
        
        if (supplier) {
            // Edit mode
            modalTitle.innerHTML = '<i class="fas fa-truck"></i> سپلائر ايڊٽ ڪريو';
            currentSupplierId = supplier.id;
            
            // Fill form with supplier data
            document.getElementById('supplierName').value = supplier.name;
            document.getElementById('supplierCode').value = supplier.code;
            document.getElementById('supplierType').value = supplier.type;
            document.getElementById('supplierStatus').value = supplier.status;
            document.getElementById('supplierPhone').value = supplier.phone;
            document.getElementById('supplierEmail').value = supplier.email || '';
            document.getElementById('supplierAddress').value = supplier.address || '';
            document.getElementById('supplierProducts').value = supplier.products.join(', ');
            document.getElementById('supplierNotes').value = supplier.notes || '';
        } else {
            // Add mode
            modalTitle.innerHTML = '<i class="fas fa-truck"></i> نئون سپلائر شامل ڪريو';
            currentSupplierId = null;
            supplierForm.reset();
        }
        
        supplierModal.style.display = 'block';
    }
    
    function closeModal() {
        supplierModal.style.display = 'none';
        deleteModal.style.display = 'none';
    }
    
    function confirmDelete(supplier) {
        document.getElementById('deleteSupplierName').textContent = supplier.name;
        currentSupplierId = supplier.id;
        deleteModal.style.display = 'block';
    }
    
    function deleteSupplier() {
        // In a real app, you would make an API call here
        console.log(`Deleting supplier with ID: ${currentSupplierId}`);
        
        // Remove from table
        const row = document.querySelector(`tr[data-id="${currentSupplierId}"]`);
        if (row) row.remove();
        
        closeModal();
        showToast('سپلائر کي ڊليٽ ڪري ڇڏيو ويو آهي', 'success');
    }
    
    function saveSupplier(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('supplierName').value,
            code: document.getElementById('supplierCode').value,
            type: document.getElementById('supplierType').value,
            status: document.getElementById('supplierStatus').value,
            phone: document.getElementById('supplierPhone').value,
            email: document.getElementById('supplierEmail').value,
            address: document.getElementById('supplierAddress').value,
            products: document.getElementById('supplierProducts').value.split(',').map(item => item.trim()),
            notes: document.getElementById('supplierNotes').value
        };
        
        // Validate required fields
        if (!formData.name || !formData.code || !formData.phone) {
            showToast('مهرباني ڪري سڀ ضروري ڪٿر ڀريو', 'error');
            return;
        }
        
        // In a real app, you would make an API call here
        if (currentSupplierId) {
            // Update existing supplier
            console.log('Updating supplier:', formData);
            showToast('سپلائر کي اپڊيٽ ڪري ڇڏيو ويو آهي', 'success');
        } else {
            // Add new supplier
            console.log('Adding new supplier:', formData);
            showToast('نئون سپلائر شامل ڪري ڇڏيو ويو آهي', 'success');
        }
        
        closeModal();
        renderSuppliersTable();
    }
    
    function renderSuppliersTable() {
        // In a real app, you would fetch this data from an API
        const suppliers = [
            {
                id: 'SP001',
                name: 'ڪشمير مسالا هائوس',
                code: 'SP001',
                type: 'wholesaler',
                status: 'active',
                phone: '03001234567',
                email: 'info@kashmirmasala.com',
                address: 'ڪراچي، سنڌ',
                products: ['مرچ پاؤڊر', 'ڪاري مرچ'],
                notes: 'مٺي قيمت تي بهترين معيار'
            },
            {
                id: 'SP002',
                name: 'سنڌ اسپائسز',
                code: 'SP002',
                type: 'manufacturer',
                status: 'active',
                phone: '03111234567',
                email: 'contact@sindhspices.com',
                address: 'حيدرآباد، سنڌ',
                products: ['ڪاري مرچ', 'دال چنا'],
                notes: 'مقامي تيار ڪندڙ'
            },
            {
                id: 'SP003',
                name: 'پنجاب فوڊز',
                code: 'SP003',
                type: 'manufacturer',
                status: 'inactive',
                phone: '03211234567',
                email: 'sales@punjabfoods.pk',
                address: 'لاھور، پنجاب',
                products: ['ڪاري مرچ', 'ڪشمير مرچ'],
                notes: 'وڏي پيماني تي تياري'
            },
            {
                id: 'SP004',
                name: 'بلوچستان اسپائسز',
                code: 'SP004',
                type: 'distributor',
                status: 'active',
                phone: '03331234567',
                email: 'info@balochistanspices.com',
                address: 'ڪوئيٽا، بلوچستان',
                products: ['ڪاري مرچ', 'زيرا'],
                notes: 'بلوچستان جا اصلي مصالحا'
            }
        ];
        
        const tbody = document.querySelector('#suppliersTable tbody');
        tbody.innerHTML = '';
        
        suppliers.forEach(supplier => {
            const tr = document.createElement('tr');
            tr.setAttribute('data-id', supplier.id);
            
            tr.innerHTML = `
                <td>${supplier.code}</td>
                <td>${supplier.name}</td>
                <td>${getTypeLabel(supplier.type)}</td>
                <td>${supplier.phone}</td>
                <td>${supplier.email || '-'}</td>
                <td>${supplier.products.join(', ')}</td>
                <td><span class="badge ${supplier.status === 'active' ? 'badge-success' : 'badge-warning'}">${supplier.status === 'active' ? 'اڪٽو' : 'غير اڪٽو'}</span></td>
                <td>
                    <button class="btn-icon btn-edit" title="ايڊٽ"><i class="fas fa-edit"></i></button>
                    <button class="btn-icon btn-delete" title="ڊليٽ"><i class="fas fa-trash"></i></button>
                </td>
            `;
            
            // Add event listeners to action buttons
            tr.querySelector('.btn-edit').addEventListener('click', () => openSupplierModal(supplier));
            tr.querySelector('.btn-delete').addEventListener('click', () => confirmDelete(supplier));
            
            tbody.appendChild(tr);
        });
    }
    
    function getTypeLabel(type) {
        const types = {
            'wholesaler': 'وڪريو',
            'manufacturer': 'تعداد ڪندڙ',
            'distributor': 'وڌائيندڙ'
        };
        return types[type] || type;
    }
    
    function filterSuppliers() {
        const searchTerm = supplierSearch.value.toLowerCase();
        const typeValue = typeFilter.value;
        const statusValue = statusFilter.value;
        
        const rows = document.querySelectorAll('#suppliersTable tbody tr');
        
        rows.forEach(row => {
            const name = row.cells[1].textContent.toLowerCase();
            const type = row.cells[2].textContent;
            const status = row.cells[6].querySelector('.badge').textContent;
            
            const nameMatch = name.includes(searchTerm);
            const typeMatch = typeValue === '' || getTypeLabel(typeValue) === type;
            const statusMatch = statusValue === '' || 
                              (statusValue === 'active' && status === 'اڪٽو') || 
                              (statusValue === 'inactive' && status === 'غير اڪٽو');
            
            if (nameMatch && typeMatch && statusMatch) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }
    
    function goToPrevPage() {
        // In a real app, you would handle pagination with API calls
        console.log('Going to previous page');
        showToast('پويون صفحو ڏيکاريو ويو آهي', 'info');
    }
    
    function goToNextPage() {
        // In a real app, you would handle pagination with API calls
        console.log('Going to next page');
        showToast('اڳيون صفحو ڏيکاريو ويو آهي', 'info');
    }
    
    function showToast(message, type) {
        // In a real app, you would implement a proper toast notification
        console.log(`${type}: ${message}`);
    }
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === supplierModal) {
            closeModal();
        }
        if (e.target === deleteModal) {
            closeModal();
        }
    });
    
    // Form submission
    supplierForm.addEventListener('submit', saveSupplier);
});

// This function would be in your main.js
function toggleMenu() {
    const nav = document.getElementById('mainNav');
    const main = document.querySelector('main');
    nav.classList.toggle('collapsed');
    main.classList.toggle('collapsed');
}