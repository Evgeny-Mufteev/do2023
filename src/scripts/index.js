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
  const handleModalBuyTicket = (btn, blockModal, blockForm) => {
    const btns = document.querySelectorAll(btn);
    const modal = document.querySelector(blockModal);
    const form = document.querySelector(blockForm);
    const overlay = document.querySelector(".overlay");
    const arrCloseButton = document.querySelectorAll(".js-close");

    btns.forEach((btnItem) => {
      btnItem.addEventListener("click", (evt) => {
        evt.preventDefault();
        modal.classList.add("active");
        overlay.classList.add("active");
        document.body.classList.add("no-scroll");
      });
    });
    arrCloseButton.forEach((closeButton) => {
      closeButton.addEventListener("click", (evt) => {
        evt.preventDefault();
        modal.classList.remove("active");
        overlay.classList.remove("active");
        document.body.classList.remove("no-scroll");
        form?.reset();
      });
    });
    overlay.addEventListener("click", (evt) => {
      evt.preventDefault();
      modal.classList.remove("active");
      overlay.classList.remove("active");
      document.body.classList.remove("no-scroll");
      form?.reset();
    });

    if (window.screen.width > 767) {
      document.addEventListener("keydown", (evt) => {
        if (evt.key === "Escape") {
          evt.preventDefault();
          modal.classList.remove("active");
          overlay.classList.remove("active");
          document.body.classList.remove("no-scroll");
          form?.reset();
        }
      });
    }
  };
  handleModalBuyTicket(".js-buy-ticket", ".js-modal-ticket", 'form[name="form-ticket"]');
  handleModalBuyTicket(".js-buy-partner", ".js-modal-partner", 'form[name="form-partner"]');

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
  const handleFormSubmit = (formItem, popup) => {
    const form = document.querySelector(formItem);
    const pristine = new Pristine(form);
    const modalBlock = document.querySelector(popup);

    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const valid = pristine.validate();
      if (valid) {
        evt.preventDefault();
        modalBlock.classList.add("sucsess");
        const formData = Object.fromEntries(new FormData(evt.target).entries());
        formData.phone = formData.phone.replace(/\D/g, "");
        delete formData["privacy-policy"];

        setTimeout(() => {
          evt.target.submit();
          form.reset();
          console.log(formData);
        }, 3000);
      }
    });
  };
  handleFormSubmit('form[name="form-ticket"]', ".js-modal-ticket");
  handleFormSubmit('form[name="form-partner"]', ".js-modal-partner");

  // Передатать id выбранного билета в форму
  const sendIdToForm = (el) => {
    el = el.target;
    if (el.closest(".js-buy-ticket")) {
      document.querySelector(".js-select-tickets").value = el.closest(".tickets__item").id;
    }
  };
  const blockForm = document.querySelector(".tickets__item-wrap");
  blockForm.addEventListener("click", sendIdToForm);

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

  // Якорь наверх
  const toper = () => {
    function scrollTo(element) {
      window.scroll({
        left: 0,
        top: element.offsetTop,
        behavior: "smooth",
      });
    }

    let button = document.querySelector(".toTop");
    let header = document.querySelector(".header");

    button.addEventListener("click", () => {
      scrollTo(header);
    });
  };

  toper();

  window.addEventListener("scroll", () => {
    const topArrow = document.querySelector(".toTop");

    if (window.pageYOffset > 1200) {
      topArrow.classList.add("_show");
    } else {
      topArrow.classList.remove("_show");
    }
  });
});
