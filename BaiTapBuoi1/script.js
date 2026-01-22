class Product {
    constructor(id, name, price, quantity, category, isAvailable) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.category = category;
        this.isAvailable = isAvailable;
    }
}

const products = [
    new Product(1, "iPhone 15 Pro", 28000000, 12, "Smartphone", true),
    new Product(2, "Samsung Galaxy S24", 22000000, 0, "Smartphone", true),
    new Product(3, "MacBook Air M2", 32000000, 5, "Laptop", true),
    new Product(4, "Tai nghe Sony WH-1000XM5", 9500000, 18, "Accessories", true),
    new Product(5, "Ốp lưng iPhone", 450000, 150, "Accessories", false),
    new Product(6, "Pin dự phòng Anker 20000mAh", 1200000, 8, "Accessories", true),
    new Product(7, "ASUS ROG Zephyrus G14", 45000000, 3, "Laptop", true),
    new Product(8, "Chuột Logitech MX Master 3", 2800000, 0, "Accessories", true),
];

const totalInventoryValue = products.reduce((sum, p) => sum + p.price * p.quantity, 0);

// Render tất cả sản phẩm ban đầu
function renderProducts(filteredProducts = products) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';

    if (filteredProducts.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: #64748b;">Không tìm thấy sản phẩm phù hợp.</p>';
        return;
    }

    filteredProducts.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-info">
                <div class="product-name">${p.name}</div>
                <div class="product-price">${p.price.toLocaleString('vi-VN')} VNĐ</div>
                <div class="product-detail">Danh mục: ${p.category}</div>
                <div class="product-detail">Tồn kho: ${p.quantity} cái</div>
                <div class="product-detail status ${p.quantity > 0 ? 'in-stock' : 'out-stock'}">
                    ${p.quantity > 0 ? 'Còn hàng' : 'Hết hàng'}
                </div>
                <div class="product-detail status ${p.isAvailable ? 'available' : 'unavailable'}">
                    ${p.isAvailable ? 'Đang bán' : 'Ngừng bán'}
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Áp dụng tất cả filters
function applyFilters() {
    const search = document.getElementById('searchInput').value.toLowerCase().trim();
    const category = document.getElementById('categoryFilter').value;
    const inStock = document.getElementById('inStockFilter').checked;
    const available = document.getElementById('availableFilter').checked;

    let filtered = products;

    // Lọc theo tên
    if (search) {
        filtered = filtered.filter(p => p.name.toLowerCase().includes(search));
    }

    // Lọc theo danh mục
    if (category !== 'all') {
        filtered = filtered.filter(p => p.category === category);
    }

    // Lọc còn hàng
    if (inStock) {
        filtered = filtered.filter(p => p.quantity > 0);
    }

    // Lọc đang bán
    if (available) {
        filtered = filtered.filter(p => p.isAvailable);
    }

    renderProducts(filtered);
}

// Reset filters
function resetFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('categoryFilter').value = 'all';
    document.getElementById('inStockFilter').checked = false;
    document.getElementById('availableFilter').checked = false;
    renderProducts(products);
}

// Hiển thị tổng giá trị kho
function showTotalValue() {
    document.getElementById('stats').innerHTML = `
        <strong>Tổng giá trị kho hàng:</strong> ${totalInventoryValue.toLocaleString('vi-VN')} VNĐ
        <br><small>(Tính theo tất cả sản phẩm, bất kể trạng thái)</small>
    `;
}

// Khởi tạo
window.onload = () => {
    renderProducts();
    document.getElementById('searchInput').addEventListener('keyup', applyFilters);
    // Các select/checkbox cũng trigger khi thay đổi
    document.querySelectorAll('#categoryFilter, #inStockFilter, #availableFilter').forEach(el => {
        el.addEventListener('change', applyFilters);
    });
};
