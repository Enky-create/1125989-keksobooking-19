'use strict';
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

var getRandomInRange = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomInArray = function(array) {
  var min = 0;
  var max = array.length - 1;
  var index = Math.floor(Math.random() * (max - min + 1)) + min;
  return array[index];
};

var getRandomPin = function(index) {
  index++;
  var xMinus = 25;
  var yMinus = 70;
  var x = getRandomInRange(MIN_X, MAX_X) - xMinus;
  var y = getRandomInRange(MIN_Y, MAX_Y) - yMinus;
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
    var clonePin = htmlPin.cloneNode(true);
    clonePin.querySelector('img').src = pin.author.avatar;
    clonePin.querySelector('img').alt = pin.offer.title;
    clonePin.style.left = pin.location.x + 'px';
    clonePin.style.top = pin.location.y + 'px';
    fragment.appendChild(clonePin);
  }
  return fragment;
};
var map = document.querySelector('.map');
map.classList.remove('map--faded');
var pins = document.querySelector('.map__pins');
pins.appendChild(randomHtmlPin(PINS_QUANTITY));
