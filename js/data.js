'use strict';
(function () {
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
  var getNewElement = function (tag, className) {
    var element = document.createElement(tag);
    element.className = className;
    return element;
  };
  var getRandomPin = function (index) {
    index++;
    var xMinus = 25;
    var yMinus = 70;
    var constant = window.constant;
    var xCoordinate = getRandomInRange(constant.MIN_X, constant.MAX_X) - xMinus;
    var yCoordinate = getRandomInRange(constant.MIN_Y, constant.MAX_Y) - yMinus;
    var pin = {
      author: {
        avatar: 'img/avatars/user0' + index + '.png'
      },
      offer: {
        title: 'Сдам',
        address: xCoordinate + ' ,' + yCoordinate,
        price: getRandomInRange(constant.MIN_PRICE, constant.MAX_PRICE),
        type: getRandomInArray(constant.TYPES),
        rooms: getRandomInRange(constant.MIN_ROOMS, constant.MAX_ROOMS),
        guests: getRandomInRange(constant.MIN_GUESTS, constant.MAX_GUESTS),
        checkin: getRandomInArray(constant.CHECKIN_CHECKOUT),
        checkout: getRandomInArray(constant.CHECKIN_CHECKOUT),
        features: getRandomArray(constant.FEATURES),
        description: 'строка с описанием',
        photos: getRandomArray(constant.PHOTO)
      },

      location: {
        x: xCoordinate,
        y: yCoordinate
      }
    };
    return pin;
  };
  window.data = {
    getRandomPin: getRandomPin,
    getNewElement: getNewElement
  };
})();
