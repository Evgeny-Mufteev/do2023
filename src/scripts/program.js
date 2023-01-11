"use strict";
document.addEventListener("DOMContentLoaded", () => {
  // Табы
  const handleTabs = (section, buttons, points, tabsClass) => {
    const tabs = document.querySelector(section);
    const btns = tabs.querySelectorAll(buttons);
    const items = tabs.querySelectorAll(points);

    function change(arr, i) {
      arr.forEach(function (item) {
        item.forEach(function (i) {
          i.classList.remove(tabsClass);
        });
        item[i].classList.add(tabsClass);
      });
    }

    var _loop = function _loop(i) {
      btns[i].addEventListener("click", function () {
        change([btns, items], i);
      });
    };

    for (var i = 0; i < btns.length; i++) {
      _loop(i);
    }
  };
  handleTabs(".tabs-container", ".tabs__btn", ".tabs-item", "is-active");
  handleTabs(".tabs-container", ".tabs__btn2", ".tabs-item2", "is-active");
  handleTabs(".tabs-container", ".tabs__btn2", ".tabs-item3", "is-active");
});
