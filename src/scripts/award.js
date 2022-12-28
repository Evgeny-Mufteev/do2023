"use strict";
document.addEventListener("DOMContentLoaded", () => {
  // Валидация и отправка формы
  const handleFormSubmit = (formItem) => {
    const form = document.querySelector(formItem);
    const pristine = new Pristine(form);

    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const valid = pristine.validate();
      if (valid) {
        evt.preventDefault();

        const formData = Object.fromEntries(new FormData(evt.target).entries());
        formData.phone = formData.phone.replace(/\D/g, "");
        delete formData["privacy-policy"];
        // console.log(formData);
        evt.target.submit();
        form.reset();
      }
    });
  };
  handleFormSubmit('form[name="form-award"]');

  const handleInputInn = () => {
    const input = document.querySelector(".js-inn");

    input.addEventListener("input", (evt) => {
      evt.preventDefault();

      let foo = input.value.split("-").join("");
      if (foo.length > 0) {
        foo = foo.match(new RegExp(".{1,3}", "g")).join("-");
      }
      input.value = foo;
    });
  };
  handleInputInn();
});
