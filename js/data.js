'use strict';
(function () {
  var arrayPin;
  var getRandomInRange = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomInArray = function (array) {
    var min = 0;
    var max = array.length - 1;
    var index = getRandomInRange(min, max);
    return array[index];
  };

  var getRandomArray = function (array) {
    var length = getRandomInRange(1, array.length);
    var newArray = [];
    for (var i = 0; i < length; i++) {
      newArray[i] = array[i];
    }
    return newArray;
  };
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
    window.load(window.constant.URL, succsessFill, errorFill);
  };
  var get = function () {
    return arrayPin;
  };
  window.data = {
    fillData: fillData,
    get: get
  };
})();
