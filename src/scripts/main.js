"use strict";
document.addEventListener("DOMContentLoaded", () => {
  // Маска телефона
  const handlePhoneMask = (input) => {
    let matrix = "+7 (___) ___-__-__",
      i = 0,
      def = matrix.replace(/\D/g, ""),
      val = input.value.replace(/\D/g, "");
    if (def.length >= val.length) val = def;
    input.value = matrix.replace(/./g, function (a) {
      return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a;
    });
  };
  const numbers = document.querySelectorAll('input[type="tel"]');
  numbers.forEach((number) => {
    number.addEventListener("input", handlePhoneMask.bind(null, number));
    number.addEventListener("focus", handlePhoneMask.bind(null, number));
    number.addEventListener("blur", handlePhoneMask.bind(null, number));
  });

  // Выбор пунков партнерства в форме
  if (document.querySelector(".js-sort-box")) {
    const handleParameterSelection = (el) => {
      el = el.target;

      // Открытие списка
      if (el.closest(".js-sort-btn")) {
        el.closest(".js-sort-btn").classList.toggle("active");
      }

      // Удаление активного выбранного пункта из списка
      if (el.closest(".js-sort-list")) {
        const allEl = el.closest(".js-sort-list").querySelectorAll(".js-sort-item");
        allEl.forEach((listItem) => {
          listItem.classList.remove("active");
        });
      }

      // Подстановка выбранного пункта
      if (el.classList.contains("js-sort-item")) {
        el.classList.add("active");
        el.closest(".js-sort-box").querySelector(".selecting-item").value = el.textContent;
        el.closest(".js-sort-box")
          .querySelector(".selecting-item")
          .setAttribute("value", el.textContent);
        document.querySelector(".selecting-item").dispatchEvent(new Event("input"));
      }

      // Закрытие списка
      if (!el.closest(".js-sort-btn")) {
        document.querySelectorAll(".js-sort-btn").forEach((el) => {
          el.classList.remove("active");
        });
      }
    };
    document.addEventListener("click", handleParameterSelection);
  }

  // Якорь наверх
  const handleScrollUp = () => {
    const button = document.querySelector(".toTop");
    const header = document.querySelector(".header");

    button.addEventListener("click", (evt) => {
      evt.preventDefault();

      header?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };
  handleScrollUp();

  // Появление кнопки якоря
  const showScroll = () => {
    window.addEventListener("scroll", () => {
      const topArrow = document.querySelector(".toTop");

      if (window.pageYOffset > 1200) {
        topArrow.classList.add("_show");
      } else {
        topArrow.classList.remove("_show");
      }
    });
  };
  showScroll();
});
