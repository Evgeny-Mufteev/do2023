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
  const handleModalPopup = (btn, blockModal, blockForm) => {
    const btns = document.querySelectorAll(btn);
    const modal = document.querySelector(blockModal);
    const form = document.querySelector(blockForm);
    const overlay = document.querySelector(".overlay");
    const arrCloseButton = document.querySelectorAll(".js-close");
    const selectInput = document.querySelectorAll(".js-sort-btn");

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
        selectInput.forEach((elements) => {
          elements.value = "";
        });
      });
    });

    overlay.addEventListener("click", (evt) => {
      evt.preventDefault();
      modal.classList.remove("active");
      overlay.classList.remove("active");
      document.body.classList.remove("no-scroll");
      form?.reset();
      selectInput.forEach((elements) => {
        elements.value = "";
      });
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
  handleModalPopup(".js-buy-ticket", ".js-modal-ticket", 'form[name="form-ticket"]');
  handleModalPopup(".js-buy-partner", ".js-modal-partner", 'form[name="form-partner"]');
  handleModalPopup(".js-buy-speaker", ".js-modal-speaker", 'form[name="form-speaker"]');
  handleModalPopup(".js-workshop", ".js-modal-workshop");

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
  handleFormSubmit('form[name="form-speaker"]', ".js-modal-speaker");

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
      el.addEventListener("click", (evt) => {
        if (el.closest(".js-workshops-item")) {
          const workshopItem = el.closest(".js-workshops-item"),
            popupWorkshop = document.querySelector(".js-modal-workshop"),
            titleNewNode = workshopItem.querySelector(".workshops__item-title").cloneNode(true),
            popupTitle = popupWorkshop.querySelector(".popup-workshop__title"),
            infoNewNode = workshopItem.querySelector(".workshops__item-info").cloneNode(true),
            popupInfo = popupWorkshop.querySelector(".popup-workshop__info"),
            descNewNode = workshopItem.querySelector(".workshops__item-box").cloneNode(true),
            popupDesc = popupWorkshop.querySelector(".popup-workshop__desc"),
            speakersNewNode = workshopItem.querySelector(".workshops__item-name").cloneNode(true),
            popupSpeakers = popupWorkshop.querySelector(".popup-workshop__name");

          while (popupTitle.firstChild) {
            popupTitle.removeChild(popupTitle.lastChild);
            popupInfo.removeChild(popupInfo.lastChild);
            popupDesc.removeChild(descNewNode.lastChild);
            popupSpeakers.removeChild(popupSpeakers.lastChild);
          }

          popupTitle.appendChild(titleNewNode);
          popupInfo.appendChild(infoNewNode);
          popupDesc.appendChild(descNewNode);
          popupSpeakers.appendChild(speakersNewNode);
        }
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
      479: {
        spaceBetween: 24,
        slidesPerView: 1.3,
      },
      767: {
        slidesPerView: 2.1,
      },
      1023: {
        spaceBetween: 40,
        slidesPerView: 1.9,
      },
      1349: {
        slidesPerView: 2,
      },
      1800: {
        slidesPerView: 2.6,
      },
    },
    speed: 15000,
    autoplay: {
      delay: false,
    },
  });
});
