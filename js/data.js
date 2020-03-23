'use strict';
(function () {
  var arrayPin;
  var errorFill = function (message) {
    var div = document.createElement('div');
    var mapPins = document.querySelector('.map__pins');
    div.textContent = message;
    div.style.width = '100%';
    div.style.background = 'red';
    document.querySelector('.map__pins').insertBefore(div, mapPins);
  };
  var succsessFill = function (serverAnswer) {
    var filters = document.querySelector('.map__filters');
    var selectFilters = filters.querySelectorAll('select');
    arrayPin = serverAnswer;
    filters.classList.remove('ad-form--disabled');
    window.filters.doFilter(arrayPin);
    selectFilters.forEach(function (select) {
      select.removeAttribute('disabled', 'disabled');
    });
  };

  var fillData = function () {
    window.load(window.constant.URLDownLoad, succsessFill, errorFill);
  };
  var get = function () {
    return arrayPin;
  };
  window.data = {
    fillData: fillData,
    get: get
  };
})();
