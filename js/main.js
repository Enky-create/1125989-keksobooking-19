'use strict';
var MUFFIN_RADIUS = 31;
var MUFFIN_TALE_HEIGHT = 22;
var PINS_QUANTITY = 8;
var MAX_Y = 630;
var MIN_Y = 130;
var MIN_X = 0;
var MAX_X = document.querySelector('.map').offsetWidth;
var types = ['palace', 'flat', 'house', 'bungalo'];
var checkinsCheckouts = ['12:00', '13:00', '14:00'];
var features = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var photos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var roomNumber = document.querySelector('#room_number');
var capacity = document.querySelector('#capacity');
var form = document.querySelector('.ad-form');
var arrayPin = [];
var filters = document.querySelector('.map__filters');
var fieldsets = document.querySelectorAll('fieldset');
var addressInput = document.querySelector('#address');
var mapPinMain = document.querySelector('.map__pin--main');
var xString = mapPinMain.style.left.replace('px', '');
var yString = mapPinMain.style.top.replace('px', '');
var x = parseInt(xString, 10) + MUFFIN_RADIUS;
var y = parseInt(yString, 10) + MUFFIN_RADIUS;

var getRandomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomInArray = function (array) {
  var min = 0;
  var max = array.length - 1;
  var index = Math.floor(Math.random() * (max - min + 1)) + min;
  return array[index];
};

var getRandomPin = function (index) {
  index++;
  var xMinus = 25;
  var yMinus = 70;
  var pin = {
    author: {
      avatar: 'img/avatars/user0' + index + '.png'
    },
    offer: {
      title: 'Сдам',
      address: x + ' ,' + y,
      price: getRandomInRange(10000, 50000),
      type: getRandomInArray(types),
      rooms: getRandomInRange(1, 10),
      guests: getRandomInRange(1, 10),
      checkin: getRandomInArray(checkinsCheckouts),
      checkout: getRandomInArray(checkinsCheckouts),
      features: getRandomInArray(features),
      description: 'строка с описанием',
      photos: getRandomInArray(photos)
    },

    location: {
      x: x,
      y: y
    }
  };
  return pin;
};
var randomHtmlPin = function (counter) {
  var htmlPin = document.querySelector('#pin').content.querySelector('button');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < counter; i++) {
    var pin = getRandomPin(i);
    arrayPin[i] = pin;
    var clonePin = htmlPin.cloneNode(true);
    clonePin.querySelector('img').src = pin.author.avatar;
    clonePin.querySelector('img').alt = pin.offer.title;
    clonePin.style.left = pin.location.x + 'px';
    clonePin.style.top = pin.location.y + 'px';
    fragment.appendChild(clonePin);
  }
  return fragment;
};

var doActiveSite = function () {
  arrayPin = [];
  var map = document.querySelector('.map');
  map.classList.remove('map--faded');
  var pins = document.querySelector('.map__pins');
  pins.appendChild(randomHtmlPin(PINS_QUANTITY));
  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].removeAttribute('disabled');
  }
  form.classList.remove('ad-form--disabled');
  filters.classList.remove('ad-form--disabled');
};

var init = function () {
  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].setAttribute('disabled', 'disabled');
  }
  addressInput.value = x + ', ' + y;


  filters.classList.add('ad-form--disabled');
  if (+roomNumber.value < +capacity.value) {
    roomNumber.setCustomValidity('Количество комнат не соответствует количеству гостей');
  }
};


var pinMousedownHandler = function (evt) {
  if (evt.button === 0) {
    doActiveSite(fieldsets, filters);
    y = y + MUFFIN_TALE_HEIGHT + MUFFIN_RADIUS;
    addressInput.value = x + ', ' + y;
  }
};

var pinClickHandler = function () {
  doActiveSite(fieldsets, filters);
  y = y + MUFFIN_TALE_HEIGHT + MUFFIN_RADIUS;
  addressInput.value = x + ', ' + y;
};

var formSubmitHandler = function (evt) {
  evt.preventDefault();
};

var inputChangeHandler = function () {
  roomNumber.setCustomValidity('');
  if (+roomNumber.value < +capacity.value && +capacity.value > 0) { // && +capacity.value > 0) || (+roomNumber.value === 100 && +capacity.value !== 0)) {
    roomNumber.setCustomValidity('Количество комнат не соответствует количеству гостей');
  }
  if (+capacity.value === 0 && +roomNumber.value !== 100) {
    roomNumber.setCustomValidity('Количество комнат не соответствует количеству гостей');
  }
};


form.addEventListener('submit', formSubmitHandler);
roomNumber.addEventListener('change', inputChangeHandler);
capacity.addEventListener('change', inputChangeHandler);
mapPinMain.addEventListener('mousedown', pinMousedownHandler);
mapPinMain.addEventListener('click', pinClickHandler);
init();
