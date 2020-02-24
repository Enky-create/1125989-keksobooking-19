'use strict';
var MUFFIN_RADIUS = 31;
var MUFFIN_TALE_HEIGHT = 22;
var PINS_QUANTITY = 8;
var MAX_Y = 630;
var MIN_Y = 130;
var MIN_X = 25;
var MAX_X = document.querySelector('.map').offsetWidth - 25;
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
var dictinary = {
  flat: 'Квартира',
  bungalo: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец '
};
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
      type: getRandomInArray(TYPES),
      rooms: getRandomInRange(1, 10),
      guests: getRandomInRange(1, 10),
      checkin: getRandomInArray(CHECKIN_CHECKOUT),
      checkout: getRandomInArray(CHECKIN_CHECKOUT),
      features: getRandomArray(FEATURES),
      description: 'строка с описанием',
      photos: getRandomArray(PHOTO)
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
  doCard(0);
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
var getNewElement = function (tag, className) {
  var element = document.createElement(tag);
  element.className = className;
  return element;
};
var doCard = function (index) {
  var cardTemplate = document.querySelector('#card').content.querySelector('article');
  var cloneCard = cardTemplate.cloneNode(true);
  var title = cloneCard.querySelector('.popup__title');
  var price = cloneCard.querySelector('.popup__text--price');
  var address = cloneCard.querySelector('.popup__text--address');
  var type = cloneCard.querySelector('.popup__type');
  var textCapacity = cloneCard.querySelector('.popup__text--capacity');
  var time = cloneCard.querySelector('.popup__text--time');
  var featuresList = cloneCard.querySelector('.popup__features');
  var description = cloneCard.querySelector('.popup__description');
  var photo = cloneCard.querySelector('.popup__photos');
  var avatar = cloneCard.querySelector('.popup__avatar');
  var fragment = document.createDocumentFragment();
  var map = document.querySelector('.map');

  title.textContent = arrayPin[index].offer.title;
  price.textContent = arrayPin[index].offer.price + ' ₽/ночь';
  address.textContent = arrayPin[index].offer.address;
  type.textContent = dictinary[arrayPin[index].offer.type];
  textCapacity.textContent = arrayPin[index].offer.rooms + ' комнаты для ' + arrayPin[index].offer.guests + ' гостей';
  time.textContent = 'Заезд после ' + arrayPin[index].offer.checkin + ', выезд до ' + arrayPin[index].offer.checkout;
  description.textContent = arrayPin[index].offer.description;

  featuresList.innerHTML = '';
  for (var i = 0; i < arrayPin[index].offer.features.length; i++) {
    var feature = getNewElement('li', 'popup__feature popup__feature--' + arrayPin[index].offer.features[i]);
    featuresList.appendChild(feature);
  }

  photo.innerHTML = '';
  for (var a = 0; a < arrayPin[index].offer.photos.length; a++) {
    var image = getNewElement('img', 'popup__photo');
    image.src = arrayPin[index].offer.photos[a];
    image.alt = 'Фотография жилья';
    image.width = 45;
    image.height = 40;
    photo.appendChild(image);
  }
  avatar.src = arrayPin[index].author.avatar;
  fragment.appendChild(cloneCard);
  map.insertBefore(fragment, cloneCard.querySelector('.map__filters-container'));
};

form.addEventListener('submit', formSubmitHandler);
roomNumber.addEventListener('change', inputChangeHandler);
capacity.addEventListener('change', inputChangeHandler);
mapPinMain.addEventListener('mousedown', pinMousedownHandler);
mapPinMain.addEventListener('click', pinClickHandler);
init();
