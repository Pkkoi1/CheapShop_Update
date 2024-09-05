async function getProducts() {
    try {
        const response = await axios.get('https://6458b3178badff578ef82c66.mockapi.io/Product');
        const products = response.data;

        const hostProductList = document.getElementById('hotList');
        const InnerSlide = document.getElementById('carousel-inner');
        const InnerSaleSlide = document.getElementById('carousel-inner1');

        const carouselIndicators = document.getElementById('carousel-indicators1');
        const carouselSaleIndicators = document.getElementById('carousel-indicators');
        
        const saleList = document.getElementById('saleProduct');
        let slideIndex = 1;
        let nextSlide;
        let count = 0;
        let countSlide = 1;

        products.forEach((product, i) => {
            if(product.discount == 0)
            {
            const productHTML = 
                `<div class="col">
                    <div class="card h-100" style="background-color: #3a4248; border-radius: 21px;">
                      <a href="../Index/ProductDetails.html">
                        <img src="${product.image}" class="card-img-top" alt="${product.name}" loading="lazy" title="Ấn vào để xem chi tiết">
                      </a>
                      <div class="card-body">
                        <div class="card-title">${product.name}</div>
                        <p class="card-text">${product.price.toLocaleString('vi-VN')} đ</p>
                        <a href="Cart.html"><button class="card-button">
                          <i class="fa-solid fa-cart-shopping fa-lg" style="color: #ffffff;"></i> Thêm vào giỏ hàng
                        </button></a>
                      </div>
                    </div>
                </div>`;

            if (i < 6) {
                hostProductList.insertAdjacentHTML('beforeend', productHTML);
            } else {
                if (i % 6 === 0) { 
                    slideIndex++;
                    updateList(carouselIndicators, InnerSlide, "#productCarousel", slideIndex);
                }
                    nextSlide.insertAdjacentHTML('beforeend', productHTML);
            }
        }
        else{
            const originalPrice = product.price; // Giá gốc
            const discountPercentage = product.discount; // Tỷ lệ giảm giá (ví dụ: 20 cho 20%)

            const discountAmount = (originalPrice * discountPercentage) / 100; // Số tiền giảm giá
            const finalPrice = originalPrice - discountAmount; // 
            const productHTML = 
                `<div class="col">
                    <div class="card h-100" style="background-color: #3a4248; border-radius: 21px;">
                      <img src="${product.image}" class="card-img-top" alt="..." title="Ấn vào để xem chi tiết">
                      <div class="Sale-product-mark">
                        <span>SALE</span>
                        <span>${product.discount}%</span>
                      </div>
                      <div class="card-body">
                        <div class="card-title">${product.name}</div>
                        <p class="card-text"><del>${product.price.toLocaleString('vi-VN')} đ</del> <b>~</b>${finalPrice.toLocaleString('vi-VN')} đ</p>
                        <a href="Cart.html"><button class="card-button"><i class="fa-solid fa-cart-shopping fa-lg" style="color: #ffffff;"></i> Thêm
                          vào
                          giỏ hàng</button></a>
                      </div>
                    </div>
                  </div>`
            if(count < 6)
            {
                count ++;
                saleList.insertAdjacentHTML('beforeend', productHTML);
            }else
            {
                if (count % 6 === 0) { 
                    count ++;
                    countSlide++;
                    updateList(carouselSaleIndicators, InnerSaleSlide, "#Sale_product_Carousel", countSlide);
                }
                nextSlide.insertAdjacentHTML('beforeend', productHTML);
            }
        }
        });

        updateIndicators(1); // Hiển thị chỉ thị đầu tiên

        document.querySelector('#productCarousel').addEventListener('slid.bs.carousel', function (e) {
            updateIndicators(e.to);
        });

        function updateIndicators(activeIndex) {
            const indicators = carouselIndicators.querySelectorAll('button');
            indicators.forEach((indicator, index) => {
                if (index >= activeIndex - 1 && index <= activeIndex + 1) {
                    indicator.style.display = 'inline-block';
                } else {
                    indicator.style.display = 'none';
                }
            });
        }

        function updateList(indicator, innerr, Carousel, indexx) 
        {
            const newItem = document.createElement('div');
            newItem.id = `slide_${indexx}`;
            newItem.className = 'carousel-item';
            if (indexx === 1) newItem.classList.add('active');

            nextSlide = document.createElement('div');
            nextSlide.className = 'row row-cols-xl-6 row-cols-lg-3 row-cols-sm-2';
            newItem.appendChild(nextSlide);

            innerr.appendChild(newItem);

            const newIndicator = document.createElement('button');
            newIndicator.type = 'button';
            newIndicator.setAttribute('data-bs-target', Carousel);
            newIndicator.setAttribute('data-bs-slide-to', indexx - 1);
            newIndicator.setAttribute('aria-label', `Slide ${indexx}`);
        
            indicator.appendChild(newIndicator);
        }


    } catch (error) {
        console.error('Error fetching products:', error);
        hostProductList.innerHTML = `<p class="text-danger">Unable to load products. Please try again later.</p>`;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    getProducts();
});
