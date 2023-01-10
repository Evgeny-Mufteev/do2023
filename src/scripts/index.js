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
  var warrior;
  const calculationsTimer = (endToTime, wrap) => {
    const dateEnd = new Date(endToTime),
      dateNow = new Date(),
      date = Math.floor((dateEnd.getTime() - dateNow.getTime()) / 1000),
      days = wrap.querySelector(".timer__days .timer__number"),
      hours = wrap.querySelector(".timer__hours .timer__number"),
      minutes = wrap.querySelector(".timer__minutes .timer__number"),
      seconds = wrap.querySelector(".timer__seconds .timer__number");
    //countdown(date, days, hours, minutes, seconds);
    if (date > 0) {
      warrior = setTimeout(() => countdown(date, days, hours, minutes, seconds), 1000);
    }
  };

  const countdown = (date, days, hours, minutes, seconds) => {
    let dateLeft = date;
    let dateTemp = 0;

    const TimeValues = {
      Vdays: {
        count: 24 * 60 * 60,
        item: days,
      },
      Vhours: {
        count: 60 * 60,
        item: hours,
      },
      Vminutes: {
        count: 60,
        item: minutes,
      },
      Vseconds: {
        count: null,
        item: seconds,
      },
    };

    for (let val in TimeValues) {
      dateTemp = Math.floor(dateLeft / TimeValues[val].count);
      if (val != "Vseconds") {
        dateLeft -= dateTemp * TimeValues[val].count;
        if (dateTemp < 10) dateTemp = "0" + dateTemp;
        TimeValues[val].item.innerHTML = dateTemp;
      } else {
        if (dateLeft < 10) dateLeft = "0" + dateLeft;
        TimeValues[val].item.innerHTML = dateLeft;
      }
    }
    date--;

    if (date < 0) {
      clearTimeout(warrior);
    } else {
      setTimeout(() => countdown(date, days, hours, minutes, seconds), 1000);
    }
  };

  document.querySelectorAll(".timer").forEach((el) => {
    calculationsTimer("2023-03-09 19:41:00".replace(/-/g, "/"), el);
  });

  // Передатать id выбранного билета в форму
  const sendIdToForm = (el) => {
    el = el.target;
    if (el.closest(".js-buy-ticket")) {
      document.querySelector(".js-select-tickets").value = el.closest(".tickets__item").id;
    }
  };
  const blockForm = document.querySelector(".tickets__item-wrap");
  blockForm.addEventListener("click", sendIdToForm);

  // Копирование данных и передача в попап
  const handleCopyTransferPopup = () => {
    const btns = document.querySelectorAll(".js-workshop");

    btns.forEach((el) => {
      el.addEventListener("click", () => {
        const workshopItem = el.closest(".js-workshops-item");
        const popupWorkshop = document.querySelector(".js-modal-workshop");

        ["js-title", "js-info", "js-desc", "js-name"].forEach((el) => {
          const curEl = workshopItem.querySelector(`.${el}`);
          popupWorkshop.querySelector(`.${el}`).lastChild.replaceWith(curEl.cloneNode(true));
        });
      });
    });
  };
  handleCopyTransferPopup();

  // Слайдер Фотогалерея
  const photogallerySlider = new Swiper(".photogallery__block", {
    loop: true,
    breakpoints: {
      319: {
        spaceBetween: 12,
        slidesPerView: 1,
      },
      374: {
        spaceBetween: 12,
        slidesPerView: 1.2,
      },
      479: {
        spaceBetween: 24,
        slidesPerView: 1.3,
      },
      767: {
        spaceBetween: 24,
        slidesPerView: 2.3,
      },
      1023: {
        spaceBetween: 40,
        slidesPerView: 1.9,
      },
      1349: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
      1800: {
        slidesPerView: 2.6,
        spaceBetween: 40,
      },
    },
    speed: 15000,
    autoplay: {
      delay: false,
    },
  });
});
