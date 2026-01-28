const API_URL = "https://api.escuelajs.co/api/v1/products";
const productList = document.getElementById("product-list");

async function getProducts() {
    try {
        // 1. Fetch data từ API
        const response = await fetch(API_URL);
        const data = await response.json(); // Chuyển đổi JSON sang Object/Array

        // 2. Gọi hàm hiển thị
        renderProducts(data);
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
        productList.innerHTML = "<p>Không thể tải dữ liệu!</p>";
    }
}

function renderProducts(products) {
    // Duyệt qua mảng sản phẩm và tạo HTML
    const html = products.map(product => {
        return `
            <div class="product-card">
                <img src="${product.images[0]}" alt="${product.title}" onerror="this.src='https://via.placeholder.com/150'">
                <h3>${product.title}</h3>
                <p class="price">$${product.price}</p>
                <p class="description">${product.description.substring(0, 50)}...</p>
                <button>Mua ngay</button>
            </div>
        `;
    }).join(""); // Chuyển mảng thành chuỗi

    productList.innerHTML = html;
}

// Chạy hàm
getProducts();