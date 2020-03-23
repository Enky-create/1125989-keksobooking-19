'use strict';
(function () {
  var getNewElement = function (tag, className) {
    var element = document.createElement(tag);
    element.className = className;
    return element;
  };
  var show = function (index) {
    var arrayPin = window.filters.getFilteredArray();
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
    var englishTypeToRussian = {
      flat: 'Квартира',
      bungalo: 'Бунгало',
      house: 'Дом',
      palace: 'Дворец'
    };
    var oldCard = map.querySelector('.map__card');
    if (oldCard !== null) {
      oldCard.remove();
    }
    title.textContent = arrayPin[index].offer.title;
    price.textContent = arrayPin[index].offer.price + ' ₽/ночь';
    address.textContent = arrayPin[index].offer.address;
    type.textContent = englishTypeToRussian[arrayPin[index].offer.type];
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
  window.card = {
    show: show
  };
})();
