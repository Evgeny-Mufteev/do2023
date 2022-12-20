"use strict";
document.addEventListener("DOMContentLoaded", () => {
  // Слайдер Фотогалерея
  const photogallerySlider = new Swiper(".photogallery__block", {
    loop: true,
    slidesPerView: "auto",
    breakpoints: {
      319: {
        spaceBetween: 12,
      },
      767: {
        spaceBetween: 20,
      },
      1023: {
        spaceBetween: 32,
      },
    },
    speed: 15000,
    autoplay: {
      delay: false,
    },
  });
});
