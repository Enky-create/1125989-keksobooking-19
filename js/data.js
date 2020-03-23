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
    arrayPin = serverAnswer;
    var filters = document.querySelector('.map__filters');
    filters.classList.remove('ad-form--disabled');
    window.filters.doFilter(arrayPin);
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
