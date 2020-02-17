'use strict';
var MUFFIN_RADIUS = 31;
var MUFFIN_TALE_HEIGHT = 22;
var PINS_QUANTITY = 8;
var MAX_Y = 630;
var MIN_Y = 130;
var MIN_X = 25;
var MAX_X = document.querySelector('.map').offsetWidth - 25;
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
  var xCoordinate = getRandomInRange(MIN_X, MAX_X) - xMinus;
  var yCoordinate = getRandomInRange(MIN_Y, MAX_Y) - yMinus;
  var pin = {
    author: {
      avatar: 'img/avatars/user0' + index + '.png'
    },
    offer: {
      title: 'Сдам',
      address: xCoordinate + ' ,' + yCoordinate,
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
      x: xCoordinate,
      y: yCoordinate
    }
  };
  return pin;
};
var randomHtmlPin = function (counter) {
  var htmlPin = document.querySelector('#pin').content.querySelector('button');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < counter; i++) {
    var pin = getRandomPin(i);
    arrayPin.push(pin);
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
  var map = document.querySelector('.map');
  map.classList.remove('map--faded');
  var pins = document.querySelector('.map__pins');
  var nested = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  for (var i = 0; i < nested.length; i++) {
    pins.removeChild(nested[i]);
  }
  pins.appendChild(randomHtmlPin(PINS_QUANTITY));
  for (i = 0; i < fieldsets.length; i++) {
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
  arrayPin = [];
  doActiveSite(fieldsets, filters);
  doCard();
  y = y + MUFFIN_TALE_HEIGHT + MUFFIN_RADIUS;
  addressInput.value = x + ', ' + y;
};

var formSubmitHandler = function (evt) {
  evt.preventDefault();
};

var inputChangeHandler = function () {
  roomNumber.setCustomValidity('');
  if (+roomNumber.value < +capacity.value && +capacity.value > 0) {
    roomNumber.setCustomValidity('Количество комнат не соответствует количеству гостей');
  }
  if (+capacity.value === 0 && +roomNumber.value !== 100) {
    roomNumber.setCustomValidity('Количество комнат не соответствует количеству гостей');
  }
};

var doCard = function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('article');
  var cloneCard = cardTemplate.cloneNode(true);
  var title = cloneCard.querySelector('.popup__title');
  title.textContent = arrayPin[0].offer.title;
  var price = cloneCard.querySelector('.popup__text--price');
  price.textContent = arrayPin[0].offer.price + ' ₽/ночь';
  var address = cloneCard.querySelector('.popup__text--address');
  address.textContent = arrayPin[0].offer.address;
  var type = cloneCard.querySelector('.popup__type');
  type.textContent = arrayPin[0].offer.type;
  var textCapacity = cloneCard.querySelector('.popup__text--capacity');
  textCapacity.textContent = arrayPin[0].offer.rooms + ' комнаты для ' + arrayPin[0].offer.guests + ' гостей';
  var time = cloneCard.querySelector('.popup__text--time');
  time.textContent = 'Заезд после ' + arrayPin[0].offer.checkin + ', выезд до ' + arrayPin[0].offer.checkout;
  var featuresList  = cloneCard.querySelector('.popup__features');
  var featureArray = featuresList.querySelectorAll('popup__feature');
  for (var i = 0; i < featureArray.length; i++) {
    var classes = featureArray[i].classList;
    for (var j = 0; j < classes.length; j++) {
      if (classes[j].includes(arrayPin[0].offer.features)) {
        featureArray[i].textContent = arrayPin[0].offer.features;
      }
    }
  }
  var description = cloneCard.querySelector('.popup__description');
  description.textContent = arrayPin[0].offer.description;
  var photo = cloneCard.querySelector('.popup__photos');
  var image = photo.querySelector('.popup__photo');
  image.src = arrayPin[0].offer.photos;
  var avatar = cloneCard.querySelector('.popup__avatar');
  avatar.src = arrayPin[0].author.avatar;
  var fragment = document.createDocumentFragment();
  fragment.appendChild(cloneCard);
  var map = document.querySelector('.map');
  map.insertBefore(fragment, cloneCard.querySelector('.map__filters-container'));
};

form.addEventListener('submit', formSubmitHandler);
roomNumber.addEventListener('change', inputChangeHandler);
capacity.addEventListener('change', inputChangeHandler);
mapPinMain.addEventListener('mousedown', pinMousedownHandler);
mapPinMain.addEventListener('click', pinClickHandler);
init();
