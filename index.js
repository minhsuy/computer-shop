window.addEventListener("load", function () {
  // slider
  let swiper = new Swiper(".mySwiper", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // fixed-menu
  function debounceFn(func, wait, immediate) {
    let timeout;
    return function () {
      let context = this,
        args = arguments;
      let later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      let callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }
  const header = document.querySelector(".header");
  const headerHeight = header.clientHeight;
  window.addEventListener(
    "scroll",
    debounceFn(function () {
      const scrollTop = document.documentElement.scrollTop;
      if (scrollTop >= headerHeight) {
        header.classList.add("is-fixed");
        document.body.style.paddingTop = `${headerHeight}px`;
      } else {
        header.classList.remove("is-fixed");
        document.body.style.paddingTop = 0;
      }
    }, 100)
  );
  // back to top
  const button = document.querySelector(".button");
  window.addEventListener("scroll", function () {
    let scrollTop = document.documentElement.scrollTop;
    if (scrollTop > 250) {
      button.classList.add("is-active");
    } else {
      button.classList.remove("is-active");
    }
  });
  document.addEventListener("click", function (event) {
    const icon = document.querySelector(".button i");
    if (
      event.target.contains(icon) ||
      event.target.classList.contains("is-active")
    ) {
      document.documentElement.scrollTop = 0;
    }
  });
  // cart
  const cart = document.querySelector(".header-top-user_cart .cart-shopping");
  cart.addEventListener("click", function (event) {
    const template = `<div class="cart-info">
    <p>Có 0 sản phẩm trong giỏ hàng</p>
   </div>`;
    cart.insertAdjacentHTML("afterbegin", template);
  });
  document.addEventListener("click", function (event) {
    const cartInfo = document.querySelector(".cart-info");
    if (cartInfo) {
      if (!event.target.matches("cart-info")) {
        cartInfo.parentElement.removeChild(cartInfo);
      }
    }
  });
});

