let items = []
let persuo = []
let filteredItems = []
let typeChecked = 'None'
const api = 'https://6458b3178badff578ef82c66.mockapi.io/Product'

/**
 * Định dạng danh sách sản phẩm
 */
let previousItems = [];
function renderItem(product) {
    return `<li class="col-xs-2-4">
    <div class="card h-100" style="background-color: #3a4248; ">
      <a href="../Index/ProductDetails.html">
        <img src="${product.image}" class="card-img-top" alt="${product.name}" title="Ấn vào để xem chi tiết">
      </a>
      <div class="card-body">
        <div class="card-title">${product.name}</div>
        <p class="card-text">${product.price.toLocaleString('vi-VN')} đ</p>
        <a href="Cart.html"><button class="card-button">
          <i class="fa-solid fa-cart-shopping fa-lg" style="color: #ffffff;"></i> Thêm vào giỏ hàng
        </button></a>
        </div>
    </div>
</li>`;
}

// Promise
function getProducts() {
    return new Promise((resolve, reject) => {
        fetch(api)
            .then(response => response.json())
            .then(data => {
                setTimeout(() => {
                    resolve(data);
                }, 1000);
            })
            .catch(error => {
                reject(error);
            });
    });
}

/**
 * Lấy danh sách sản phẩm nổi bật
 * 
 */
function getHotProduct() {
    try {
        getProducts().then((products) => {
            const hotProductList = document.getElementById('Hot-product');
           hotProductList.innerHTML = '';
           products.forEach((product, i) => {
                if (product.discount == 0) {
                    const productHTML = renderItem(product);
                    hotProductList.insertAdjacentHTML('beforeend', productHTML);
                }
            });
       });
    } catch (error) {
        console.error('Error fetching products:', error);
        hotProductList.innerHTML = `<p class="text-danger">Unable to load products. Please try again later.</p>`;
    }
}
/**
 * Lấy danh sách thương hiệu
 */
function getBrand() {
    try {
        getProducts().then((products) => {

            items = products;
            persuo = products;

            const uniqueBrands = new Set(products.map(item => item.brand));

            const body = document.getElementById('brand');

            const allBrandsCard = `<div class="form-check">
                                      <input class="form-check-input" type="checkbox" value="" id="allBrands" checked>
                                      <label class="form-check-label" for="allBrands">Tất cả</label>
                                  </div>`;
            body.insertAdjacentHTML('beforeend', allBrandsCard);

            Array.from(uniqueBrands).forEach((brand, index) => {
                const brand_card = `<div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="${brand}" id="brand_${index}">
                                        <label class="form-check-label" for="brand_${index}">${brand}</label>
                                    </div>`;
            body.insertAdjacentHTML('beforeend', brand_card);
        });

            const checkboxes = document.querySelectorAll('.form-check-input');
            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', (event) => {
                    handleCheckboxChange(event, checkboxes);
                });
            });
        });
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

/** 
 * Sự kiện khi trang web được tải
 */
document.addEventListener('DOMContentLoaded', function () {
    getHotProduct();
    getBrand();

});
/**
 * Tìm kiếm sản phẩm theo tên
 */
function searchByName() {
    let input = document.getElementById('SearchField').value
    let itemSearched = items.filter((item) => {
        return item.name.toLowerCase().includes(input.toLowerCase());
    });
    const hotProductList = document.getElementById('Hot-product');
    hotProductList.innerHTML = '';
    itemSearched.forEach((product, i) => {
        const productHTML = renderItem(product);
        hotProductList.insertAdjacentHTML('beforeend', productHTML);
    });

}
/**
 * Sự kiện khi nhập vào ô tìm kiếm
 */
document.getElementById('SearchField').addEventListener('input', searchByName);

const checkboxes = document.querySelectorAll('.form-check-input');

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', (event) => {
        handleCheckboxChange(event);

    });
});
/**
 * 
 * @param {*} event 
 * @param {*} checkboxes 
 * Xử lý sự kiện khi click vào checkbox
 */
function handleCheckboxChange(event, checkboxes) {
    const selectedValue = event.target.value;

    if (selectedValue === "") {
        filteredItems = [];
        checkboxes.forEach(checkbox => {
            if (checkbox.value !== "") {
                checkbox.checked = false;
            }
        });

        // Khôi phục danh sách trước đó
        const hotProductList = document.getElementById('Hot-product');
        hotProductList.innerHTML = '';
        previousItems.forEach(product => {
            if (typeChecked === 'None') {
                const productHTML = renderItem(product);
                hotProductList.insertAdjacentHTML('beforeend', productHTML);
            } else {
                if (product.productType === typeChecked) {
                    const productHTML = renderItem(product);
                    hotProductList.insertAdjacentHTML('beforeend', productHTML);
                }
            }
        });

    } else {
        previousItems = [...items];

        document.getElementById('allBrands').checked = false;
        if (!event.target.checked) {
            filteredItems = filteredItems.filter(item => item !== selectedValue);
        } else {
            filteredItems.push(selectedValue);
        }
        const selectedBrands = Array.from(checkboxes)
            .filter(checkbox => checkbox.checked && checkbox.value !== "")
            .map(checkbox => checkbox.value);
        let itemFiltered = items.filter((item) => {
            if (typeChecked === 'None') {
                return selectedBrands.includes(item.brand);
            }
            return selectedBrands.includes(item.brand) && item.productType === typeChecked;
        });


        const hotProductList = document.getElementById('Hot-product');
        hotProductList.innerHTML = '';
        itemFiltered.forEach((product, i) => {
            const productHTML = renderItem(product);
            hotProductList.insertAdjacentHTML('beforeend', productHTML);
        });
    }
}
/**
 * Sử lý sự kiện click chọn dòng sản phẩm
 */
function handleButtonType(value) {
    const located = document.getElementById('link-a');
    let text = '';
    const hotProductList = document.getElementById('Hot-product');
    hotProductList.innerHTML = '';
    if (filteredItems.length === 0) {
        items.forEach((product, i) => {
            if (product.productType === value) {
                const productHTML = renderItem(product);
                hotProductList.insertAdjacentHTML('beforeend', productHTML);
            }
        });

    } else {
        let itemFiltered = items.filter((item) => {
            if (filteredItems.length === 0) {
                return item.productType === value;
            }
            return filteredItems.includes(item.brand) && item.productType === value;
        });
        console.log("HMMM " + filteredItems);

        itemFiltered.forEach((product, i) => {
            const productHTML = renderItem(product);
            hotProductList.insertAdjacentHTML('beforeend', productHTML);
        });
    }
    if (value != 'None') {
        text = value;
        const textNode = `<div><i class="fa-solid fa-chevron-right" style="color: #b1b1b1;"></i></div>
                            <div>${text}</div>`
        located.innerHTML = textNode;
    } else {
        located.innerHTML = '';
    }
}
/**
 * Sự kiện khi click vào các nút chọn loại sản phẩm
 */
document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.menu_components');
    let lastClickedButton = null;

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const buttonValue = this.value;

            if (lastClickedButton === this) {
                // Nếu button được click là button đã chọn trước đó, tắt lựa chọn
                this.style.backgroundColor = '';
                this.style.color = '';
                typeChecked = 'None';
                lastClickedButton = null;
                getHotProduct();
            } else {
                // Nếu button được click không phải là button đã chọn trước đó
                typeChecked = buttonValue;
                if (lastClickedButton) {
                    lastClickedButton.style.backgroundColor = '';
                    lastClickedButton.style.color = '';
                }

                this.style.backgroundColor = '#ec5c1a';
                this.style.color = '#bebebe';
                lastClickedButton = this;
            }

            handleButtonType(typeChecked);
        });
    });
});

