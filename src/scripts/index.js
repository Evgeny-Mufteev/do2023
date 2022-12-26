"use strict";
document.addEventListener("DOMContentLoaded", () => {
  // Навигация по странице
  const handlePageNavigation = () => {
    const anchors = document.querySelectorAll(".js-scroll-to");

    anchors.forEach((anchor) => {
      anchor.addEventListener("click", (evt) => {
        evt.preventDefault();
        const blockID = anchor.getAttribute("href").substring(1);
        document.getElementById(blockID)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    });
  };
  handlePageNavigation();

  // Таймер JS
  const calculationsTimer = (endToTime, wrap) => {
    const dateEnd = new Date(endToTime),
      dateNow = new Date(),
      date = Math.floor((dateEnd.getTime() - dateNow.getTime()) / 1000),
      days = wrap.querySelector(".timer__days .timer__number"),
      hours = wrap.querySelector(".timer__hours .timer__number"),
      minutes = wrap.querySelector(".timer__minutes .timer__number"),
      seconds = wrap.querySelector(".timer__seconds .timer__number");

    countdown(date, days, hours, minutes, seconds);
  };

  const countdown = (date, days, hours, minutes, seconds) => {
    let dateLeft = date;
    let dateTemp = 0;

    dateTemp = Math.floor(dateLeft / (24 * 60 * 60));
    days.innerHTML = dateTemp;
    dateLeft -= dateTemp * 24 * 60 * 60;

    if (dateTemp < 10) dateTemp = "0" + dateTemp;

    dateTemp = Math.floor(dateLeft / (60 * 60));
    dateLeft -= dateTemp * 60 * 60;
    if (dateTemp < 10) dateTemp = "0" + dateTemp;
    hours.innerHTML = dateTemp;

    dateTemp = Math.floor(dateLeft / 60);
    dateLeft -= dateTemp * 60;
    if (dateTemp < 10) dateTemp = "0" + dateTemp;
    minutes.innerHTML = dateTemp;

    if (dateLeft < 10) dateLeft = "0" + dateLeft;
    seconds.innerHTML = dateLeft;

    date--;

    setTimeout(() => countdown(date, days, hours, minutes, seconds), 1000);
  };

  document.querySelectorAll(".timer").forEach((el) => {
    calculationsTimer("2023-02-18 18:00:00".replace(/-/g, "/"), el);
  });

  // модальные окна
  const handleModalBuyTicket = (btn, blockModal) => {
    const btns = document.querySelectorAll(btn);
    const modal = document.querySelector(blockModal);
    const overlay = document.querySelector(".overlay");
    const closeButton = document.querySelector(".js-close");

    btns.forEach((btnItem) => {
      btnItem.addEventListener("click", (evt) => {
        evt.preventDefault();
        modal.classList.add("active");
        overlay.classList.add("active");
        document.body.classList.add("no-scroll");
      });
    });
    overlay.addEventListener("click", (evt) => {
      evt.preventDefault();
      modal.classList.remove("active");
      overlay.classList.remove("active");
      document.body.classList.remove("no-scroll");
    });
    closeButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      modal.classList.remove("active");
      overlay.classList.remove("active");
      document.body.classList.remove("no-scroll");
    });
    if (window.screen.width > 767) {
      document.addEventListener("keydown", (evt) => {
        if (evt.key === "Escape") {
          evt.preventDefault();
          modal.classList.remove("active");
          overlay.classList.remove("active");
          document.body.classList.remove("no-scroll");
        }
      });
    }
  };
  handleModalBuyTicket(".js-buy-ticket", ".js-modal-ticket");

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

  // Валидация и отправка формы
  const formSubmission = () => {
    const form = document.querySelector('form[name="form-ticket"]');
    const pristine = new Pristine(form);

    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const valid = pristine.validate();
      if (valid == true) {
        evt.target.submit();
        form.reset();
      }
    });
  };

  formSubmission();

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
