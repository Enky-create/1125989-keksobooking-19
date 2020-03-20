'use strict';
(function () {
  var arrayPin;
  var errorFill = function (message) {
    var div = document.createElement('div');
    var mapPins = document.querySelector('.map__pins');
    div.textContent = message;
    div.style.width = '100%';
    div.style.background = 'red';
    document.insertBefore(div, mapPins);
  };
  var succsessFill = function (serverAnswer) {
    var pins = document.querySelector('.map__pins');
    arrayPin = serverAnswer;
    pins.appendChild(window.pin.newPin(window.constant.PINS_QUANTITY));
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
