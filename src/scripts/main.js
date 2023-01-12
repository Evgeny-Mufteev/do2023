"use strict"
document.addEventListener("DOMContentLoaded", () => {
  // Маска телефона
  const handlePhoneMask = (input) => {
    let matrix = "+7 (___) ___-__-__",
      i = 0,
      def = matrix.replace(/\D/g, ""),
      val = input.value.replace(/\D/g, "")
    if (def.length >= val.length) val = def
    input.value = matrix.replace(/./g, function (a) {
      return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
    })
  }
  const numbers = document.querySelectorAll('input[type="tel"]')
  numbers.forEach((number) => {
    number.addEventListener("input", handlePhoneMask.bind(null, number))
    number.addEventListener("focus", handlePhoneMask.bind(null, number))
    number.addEventListener("blur", handlePhoneMask.bind(null, number))
  })

  // Выбор пунков партнерства в форме
  if (document.querySelector(".js-sort-box")) {
    const handleParameterSelection = (el) => {
      el = el.target

      // Открытие списка
      if (el.closest(".js-sort-btn")) {
        el.closest(".js-sort-btn").classList.toggle("active")
      }

      // Удаление активного выбранного пункта из списка
      if (el.closest(".js-sort-list")) {
        const allEl = el.closest(".js-sort-list").querySelectorAll(".js-sort-item")
        allEl.forEach((listItem) => {
          listItem.classList.remove("active")
        })
      }

      // Подстановка выбранного пункта
      if (el.classList.contains("js-sort-item")) {
        el.classList.add("active")
        el.closest(".js-sort-box").querySelector(".selecting-item").value = el.textContent
        el.closest(".js-sort-box")
          .querySelector(".selecting-item")
          .setAttribute("value", el.textContent)
        document.querySelector(".selecting-item").dispatchEvent(new Event("input"))
      }

      // Закрытие списка
      if (!el.closest(".js-sort-btn")) {
        document.querySelectorAll(".js-sort-btn").forEach((el) => {
          el.classList.remove("active")
        })
      }
    }
    document.addEventListener("click", handleParameterSelection)
  }

  // Якорь наверх
  const handleScrollUp = () => {
    const button = document.querySelector(".toTop")
    const header = document.querySelector(".header")

    button.addEventListener("click", (evt) => {
      evt.preventDefault()

      header?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    })
  }
  handleScrollUp()

  // Появление кнопки якоря
  const showScroll = () => {
    window.addEventListener("scroll", () => {
      const topArrow = document.querySelector(".toTop")

      if (window.pageYOffset > 1200) {
        topArrow.classList.add("_show")
      } else {
        topArrow.classList.remove("_show")
      }
    })
  }
  showScroll()

  // модальные окна
  const handleModalPopup = (btn, blockModal, blockForm) => {
    const btns = document.querySelectorAll(btn)
    const modal = document.querySelector(blockModal)
    const form = document.querySelector(blockForm)
    const overlay = document.querySelector(".overlay")
    const arrCloseButton = document.querySelectorAll(".js-close")
    const selectInput = document.querySelectorAll(".js-sort-btn")

    if (btns && modal) {
      btns.forEach((btnItem) => {
        btnItem.addEventListener("click", (evt) => {
          evt.preventDefault()
          modal.classList.add("active")
          overlay.classList.add("active")
          document.body.classList.add("no-scroll")
        })
      })

      arrCloseButton.forEach((closeButton) => {
        closeButton.addEventListener("click", (evt) => {
          evt.preventDefault()
          modal.classList.remove("active")
          overlay.classList.remove("active")
          document.body.classList.remove("no-scroll")
          form?.reset()
          selectInput?.forEach((elements) => {
            elements.value = ""
          })
        })
      })

      overlay.addEventListener("click", (evt) => {
        evt.preventDefault()
        modal.classList.remove("active")
        overlay.classList.remove("active")
        document.body.classList.remove("no-scroll")
        form?.reset()
        selectInput?.forEach((elements) => {
          elements.value = ""
        })
      })

      if (window.screen.width > 767) {
        document.addEventListener("keydown", (evt) => {
          if (evt.key === "Escape") {
            evt.preventDefault()
            modal.classList.remove("active")
            overlay.classList.remove("active")
            document.body.classList.remove("no-scroll")
            form?.reset()
          }
        })
      }
    }
  }

  handleModalPopup(".js-buy-ticket", ".js-modal-ticket", 'form[name="form-ticket"]')
  handleModalPopup(".js-buy-partner", ".js-modal-partner", 'form[name="form-partner"]')
  handleModalPopup(".js-buy-speaker", ".js-modal-speaker", 'form[name="form-speaker"]')
  handleModalPopup(".js-workshop", ".js-modal-workshop")

  // Валидация и отправка формы
  const handleFormSubmit = (formItem, popup) => {
    const form = document.querySelector(formItem)
    const modalBlock = document.querySelector(popup)

    if (form && modalBlock) {
      const pristine = new Pristine(form)

      form.addEventListener("submit", (evt) => {
        evt.preventDefault()
        const valid = pristine.validate()
        if (valid) {
          evt.preventDefault()
          modalBlock.classList.add("sucsess")
          const formData = Object.fromEntries(new FormData(evt.target).entries())
          formData.phone = formData.phone.replace(/\D/g, "")
          delete formData["privacy-policy"]

          console.log(formData)
          setTimeout(() => {
            evt.target.submit()
            form.reset()
          }, 3000)
        }
      })
    }
  }

  handleFormSubmit('form[name="form-ticket"]', ".js-modal-ticket")
  handleFormSubmit('form[name="form-partner"]', ".js-modal-partner")
  handleFormSubmit('form[name="form-speaker"]', ".js-modal-speaker")
})
