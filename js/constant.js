'use strict';
(function () {
  var URLDownLoad = 'https://js.dump.academy/keksobooking/data';
  var URLUpLoad = 'https://js.dump.academy/keksobooking';
  var MIN_GUESTS = 1;
  var MAX_GUESTS = 10;
  var MIN_ROOMS = 1;
  var MAX_ROOMS = 10;
  var MIN_PRICE = 10000;
  var MAX_PRICE = 50000;
  var MUFFIN_RADIUS = 31;
  var MUFFIN_TALE_HEIGHT = 22;
  var PINS_QUANTITY = 8;
  var MAX_Y = 630;
  var MIN_Y = 130;
  var MIN_X = 0;
  var MAX_X = document.querySelector('.map').offsetWidth - 25 - MUFFIN_RADIUS;
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var CHECKIN_CHECKOUT = ['12:00', '13:00', '14:00'];
  var FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];
  var PHOTO = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];
  window.constant = {
    URLUpLoad: URLUpLoad,
    URLDownLoad: URLDownLoad,
    MUFFIN_RADIUS: MUFFIN_RADIUS,
    MUFFIN_TALE_HEIGHT: MUFFIN_TALE_HEIGHT,
    PINS_QUANTITY: PINS_QUANTITY,
    MAX_Y: MAX_Y,
    MIN_Y: MIN_Y,
    MIN_X: MIN_X,
    MAX_X: MAX_X,
    TYPES: TYPES,
    CHECKIN_CHECKOUT: CHECKIN_CHECKOUT,
    FEATURES: FEATURES,
    PHOTO: PHOTO,
    MIN_GUESTS: MIN_GUESTS,
    MAX_GUESTS: MAX_GUESTS,
    MIN_ROOMS: MIN_ROOMS,
    MAX_ROOMS: MAX_ROOMS,
    MIN_PRICE: MIN_PRICE,
    MAX_PRICE: MAX_PRICE
  };
})();
