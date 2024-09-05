window.onload = function() {
    var element = document.querySelector('.slide-in');
    setTimeout(function() {
      element.classList.add('visible');
    }, 1000); // thời gian đợi trước khi thêm lớp 'visible' là 1000ms

    var element2 = document.querySelector('.slide-side-in');
    setTimeout(function() {
      element2.classList.add('visible-slide');
    }, 1000); // thời gian đợi trước khi thêm lớp 'visible' là 1000ms
    var element3 = document.querySelector('.slide-more-btn-in');
    setTimeout(function() {
      element3.classList.add('visible');
    }, 1000); // thời gian đợi trước khi thêm lớp 'visible' là 1000ms

    var element4 = document.querySelector('.shopping_btn');
    setTimeout(function() {
      element4.classList.add('visible');
    }, 1000); // thời gian đợi trước khi thêm lớp 'visible' là 1000ms
    
    var element5 = document.querySelector('.contact');
    setTimeout(function() {
      element5.classList.add('visible');
    }, 1000);
  }