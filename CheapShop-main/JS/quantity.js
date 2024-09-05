const plusButtons = document.querySelectorAll('#plus');
const minusButtons = document.querySelectorAll('#minus');

// Hàm cập nhật tổng số tiền
function updateTotal() {
  const totalElements = document.querySelectorAll('.total');
  let total = 0;

  totalElements.forEach(element => {
    // Lấy giá trị trong textContent và loại bỏ các ký tự không cần thiết
    const priceText = element.textContent.replace(' đ', '').replace(/\./g, '').replace(/\,/g, '');
    const price = parseFloat(priceText);
    
    if (!isNaN(price)) {
      total += price;
    }
  });

  const totalElementProvi = document.querySelector('.provisional-price');
  totalElementProvi.textContent = total.toLocaleString('de-DE') + ' đ';

  const totalElement = document.querySelector('.pay-total-price');
  totalElement.textContent = total.toLocaleString('de-DE') + ' đ';
}

// Khi trang được tải, tính tổng số tiền ban đầu
document.addEventListener('DOMContentLoaded', function() {
  updateTotal();
});

// Sự kiện khi nhấn nút tăng số lượng
plusButtons.forEach(button => {
  button.addEventListener('click', () => {
    const product = button.closest('.cart-product');
    const countSpan = product.querySelector('.cart_product-item-qty');
    const currentCount = parseInt(countSpan.dataset.count, 10) || 0;
    const unitPriceE = product.querySelector('.cart_product-item-price');
    const currentPrice = parseFloat(unitPriceE.dataset.price) || 0;
    const totalSpan = product.querySelector('.total');

    const newCount = currentCount + 1;
    countSpan.dataset.count = newCount;
    countSpan.textContent = newCount;

    const newTotal = newCount * currentPrice;
    totalSpan.dataset.price = newTotal;
    totalSpan.textContent = newTotal.toLocaleString('de-DE') + ' đ';

    updateTotal(); // Cập nhật tổng số tiền sau khi thay đổi
  });
});

// Sự kiện khi nhấn nút giảm số lượng
minusButtons.forEach(button => {
  button.addEventListener('click', () => {
    const product = button.closest('.cart-product');
    const countSpan = product.querySelector('.cart_product-item-qty');
    const currentCount = parseInt(countSpan.dataset.count, 10) || 0;
    const unitPriceE = product.querySelector('.cart_product-item-price');
    const currentPrice = parseFloat(unitPriceE.dataset.price) || 0;
    const totalSpan = product.querySelector('.total');

    if (currentCount > 1) {
      const newCount = currentCount - 1;
      countSpan.dataset.count = newCount;
      countSpan.textContent = newCount;

      const newTotal = newCount * currentPrice;
      totalSpan.dataset.price = newTotal;
      totalSpan.textContent = newTotal.toLocaleString('de-DE') + ' đ';

      updateTotal(); // Cập nhật tổng số tiền sau khi thay đổi
    }
  });
});
