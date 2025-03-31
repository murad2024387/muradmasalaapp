// Common JavaScript functions for all pages

// Set active navigation item based on current page
function setActiveNavItem() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('href') === currentPage) {
      btn.classList.add('active');
    }
  });
}

// Toggle user menu
function toggleUserMenu() {
  document.getElementById('userDropdown').classList.toggle('show');
}

// Toggle mobile menu
function toggleMenu() {
  document.getElementById('mainNav').classList.toggle('show');
}

// Product form functions
function showProductForm() {
  document.getElementById('productForm').classList.remove('hidden');
  window.scrollTo(0, document.getElementById('productForm').offsetTop);
}

function hideProductForm() {
  document.getElementById('productForm').classList.add('hidden');
}

// Close user dropdown when clicking outside
document.addEventListener('click', function(e) {
  if (!e.target.closest('.user-menu')) {
    document.getElementById('userDropdown').classList.remove('show');
  }
});

// Customer management functions
function showCustomerForm() {
  document.getElementById('customerForm').classList.remove('hidden');
  document.getElementById('customerName').focus();
}

function hideCustomerForm() {
  document.getElementById('customerForm').classList.add('hidden');
  document.getElementById('addCustomerForm').reset();
}

function searchCustomers() {
  const input = document.getElementById('customerSearch');
  const filter = input.value.toUpperCase();
  const table = document.getElementById('customersTable');
  const tr = table.getElementsByTagName('tr');
  
  for (let i = 1; i < tr.length; i++) {
    let found = false;
    const td = tr[i].getElementsByTagName('td');
    
    for (let j = 0; j < td.length - 1; j++) {
      if (td[j]) {
        const txtValue = td[j].textContent || td[j].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          found = true;
          break;
        }
      }
    }
    
    tr[i].style.display = found ? '' : 'none';
  }
}

function editCustomer(id) {
  showCustomerForm();
  alert('گراھڪ جي تفصيل لوڊ ٿي رهي آهي (ID: ' + id + ')');
}

function deleteCustomer(id) {
  if (confirm('ڇا توهان پڪ آهيو ته توهان هن گراھڪ کي ڊليٽ ڪرڻ چاهيو ٿا؟')) {
    alert('گراھڪ ڊليٽ ٿي ويو (ID: ' + id + ')');
  }
}

function viewCustomer(id) {
  const modal = document.getElementById('customerModal');
  const content = document.getElementById('customerModalContent');
  
  const customerData = {
    name: id === 1 ? 'علي احمد' : 'رحيم خان',
    phone: id === 1 ? '03001234567' : '03111234567',
    address: id === 1 ? 'ڪراچي، سنڌ' : 'حيدرآباد، سنڌ',
    type: id === 1 ? 'وڏو گراھڪ' : 'عام گراھڪ',
    totalPurchases: id === 1 ? '₹15,600' : '₹5,200',
    lastPurchase: id === 1 ? '24/03/2023' : '20/03/2023'
  };
  
  document.getElementById('modalCustomerName').textContent = customerData.name + ' جي تفصيل';
  
  content.innerHTML = `
        <div class="customer-info">
            <p><strong>فون نمبر:</strong> ${customerData.phone}</p>
            <p><strong>پتو:</strong> ${customerData.address}</p>
            <p><strong>قسم:</strong> ${customerData.type}</p>
            <p><strong>ڪل خريداريون:</strong> ${customerData.totalPurchases}</p>
            <p><strong>آخري خريد:</strong> ${customerData.lastPurchase}</p>
        </div>
        
        <div style="margin-top: 20px;">
            <h4>خريداري جي تاريخ</h4>
            <table style="width: 100%; margin-top: 10px;">
                <tr>
                    <th>تاريخ</th>
                    <th>بل نمبر</th>
                    <th>رقم</th>
                </tr>
                <tr>
                    <td>${customerData.lastPurchase}</td>
                    <td>INV-2023-00${id}</td>
                    <td>${id === 1 ? '₹1,200' : '₹540'}</td>
                </tr>
                <tr>
                    <td>15/03/2023</td>
                    <td>INV-2023-00${id+2}</td>
                    <td>${id === 1 ? '₹2,400' : '₹1,100'}</td>
                </tr>
            </table>
        </div>
    `;
  
  modal.classList.remove('hidden');
}

function closeModal() {
  document.getElementById('customerModal').classList.add('hidden');
}

function exportToExcel() {
  alert('Excel ڊيٽا برآمد ٿي رهيو آهي...');
}
// Add this to your main.js
document.addEventListener('DOMContentLoaded', function() {
  // Handle category dropdowns
  const categoryButtons = document.querySelectorAll('.nav-category-btn');
  
  categoryButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const category = this.parentElement;
      category.classList.toggle('active');
      
      // Close other open categories
      categoryButtons.forEach(otherButton => {
        if (otherButton !== button) {
          otherButton.parentElement.classList.remove('active');
        }
      });
    });
  });
  
  // Close dropdowns when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.nav-category')) {
      categoryButtons.forEach(button => {
        button.parentElement.classList.remove('active');
      });
    }
  });
});
document.addEventListener('DOMContentLoaded', function() {
  // Set active nav item
  setActiveNavItem();
  
  // Handle category dropdowns
  const categoryButtons = document.querySelectorAll('.nav-category-btn');
  
  categoryButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const category = this.parentElement;
      category.classList.toggle('active');
      
      // Close other open categories
      categoryButtons.forEach(otherButton => {
        if (otherButton !== button) {
          otherButton.parentElement.classList.remove('active');
        }
      });
    });
  });
  
  // Close dropdowns when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.nav-category')) {
      categoryButtons.forEach(button => {
        button.parentElement.classList.remove('active');
      });
    }
  });
});

function toggleMenu() {
  document.getElementById('mainNav').classList.toggle('show');
}

function toggleUserMenu() {
  document.getElementById('userDropdown').classList.toggle('show');
}


