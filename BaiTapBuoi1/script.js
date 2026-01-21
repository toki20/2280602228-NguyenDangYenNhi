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

// Câu 3: Mảng chỉ chứa name và price
const nameAndPrice = products.map(product => ({
    name: product.name,
    price: product.price
}));

// Câu 4: Sản phẩm còn hàng (quantity > 0)
const inStock = products.filter(p => p.quantity > 0);

// Câu 5: Có ít nhất một sản phẩm giá > 30 triệu không
const hasExpensiveProduct = products.some(p => p.price > 30000000);
const expensiveProducts = products
    .filter(p => p.price > 30000000)
    .map(p => `${p.name} - ${p.price.toLocaleString('vi-VN')} VNĐ`);

// Câu 6: Tất cả sản phẩm Accessories có đang bán không
const accessories = products.filter(p => p.category === "Accessories");
const allAccessoriesAvailable = accessories.every(p => p.isAvailable === true);

// Câu 7: Tổng giá trị kho hàng
const totalInventoryValue = products.reduce((total, p) => {
    return total + (p.price * p.quantity);
}, 0);

// Câu 8: Duyệt for...of (in console)
for (const product of products) {
    const status = product.isAvailable ? "Đang bán" : "Ngừng bán";
    console.log(`${product.name} - ${product.category} - ${status}`);
}

// Câu 9: for...in với sản phẩm đầu tiên (in console)
for (const key in products[0]) {
    console.log(`${key}: ${products[0][key]}`);
}

// Câu 10: Danh sách tên sản phẩm đang bán và còn hàng
const availableAndInStockNames = products
    .filter(p => p.isAvailable === true && p.quantity > 0)
    .map(p => p.name);



function showNameAndPrice() {
    const result = JSON.stringify(nameAndPrice, null, 2);
    document.getElementById('result').textContent = "Danh sách tên và giá sản phẩm:\n\n" + result;
    console.log("Danh sách tên & giá:", nameAndPrice);
}

function showInStock() {
    const result = inStock.map(p => `${p.name} (${p.quantity} cái)`).join('\n');
    document.getElementById('result').textContent = "Sản phẩm còn hàng trong kho:\n\n" + result;
    console.log("Sản phẩm còn hàng:", inStock);
}

function showHasExpensive() {
    let output = `Có sản phẩm giá trên 30.000.000 VNĐ không? ${hasExpensiveProduct ? "Có" : "Không có"}\n\n`;
    
    if (hasExpensiveProduct) {
        output += "Danh sách sản phẩm giá cao:\n";
        output += expensiveProducts.join('\n');
    } else {
        output += "Không có sản phẩm nào giá trên 30 triệu.";
    }
    
    document.getElementById('result').textContent = output;
    console.log("Sản phẩm > 30 triệu:", expensiveProducts);
}

function showAccessoriesStatus() {
    const text = allAccessoriesAvailable ? "Có – Tất cả đang được bán" : "Không – Có một số không bán";
    document.getElementById('result').textContent = `Tất cả sản phẩm Accessories có đang bán? ${text}`;
    console.log("Accessories status:", allAccessoriesAvailable);
}

function showTotalValue() {
    document.getElementById('result').textContent = `Tổng giá trị kho hàng: ${totalInventoryValue.toLocaleString('vi-VN')} VNĐ`;
    console.log("Tổng giá trị kho:", totalInventoryValue);
}

function showProductList() {
    let output = "Danh sách sản phẩm:\n\n";
    for (const p of products) {
        const status = p.isAvailable ? "Đang bán" : "Ngừng bán";
        output += `${p.name} - ${p.category} - ${status}\n`;
    }
    document.getElementById('result').textContent = output;
    console.log("Danh sách sản phẩm & trạng thái: xem console");
}

function showFirstProductProps() {
    let output = "Thuộc tính của sản phẩm đầu tiên:\n\n";
    for (const key in products[0]) {
        output += `${key}: ${products[0][key]}\n`;
    }
    document.getElementById('result').textContent = output;
}

function showAvailableInStock() {
    const result = availableAndInStockNames.join('\n');
    document.getElementById('result').textContent = "Sản phẩm đang bán và còn hàng:\n\n" + result;
    console.log("Sản phẩm đang bán & còn hàng:", availableAndInStockNames);
}

window.onload = () => {
    showProductList();
};