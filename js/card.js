'use strict';
(function () {
  var getNewElement = function (tag, className) {
    var element = document.createElement(tag);
    element.className = className;
    return element;
  };
  var show = function (index) {
    var pins = window.filters.getFilteredArray();
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
    title.textContent = pins[index].offer.title;
    price.textContent = pins[index].offer.price + ' ₽/ночь';
    address.textContent = pins[index].offer.address;
    type.textContent = englishTypeToRussian[pins[index].offer.type];
    textCapacity.textContent = pins[index].offer.rooms + ' комнаты для ' + pins[index].offer.guests + ' гостей';
    time.textContent = 'Заезд после ' + pins[index].offer.checkin + ', выезд до ' + pins[index].offer.checkout;
    description.textContent = pins[index].offer.description;

    featuresList.innerHTML = '';
    for (var i = 0; i < pins[index].offer.features.length; i++) {
      var feature = getNewElement('li', 'popup__feature popup__feature--' + pins[index].offer.features[i]);
      featuresList.appendChild(feature);
    }

    photo.innerHTML = '';
    for (var j = 0; j < pins[index].offer.photos.length; j++) {
      var image = getNewElement('img', 'popup__photo');
      image.src = pins[index].offer.photos[j];
      image.alt = 'Фотография жилья';
      image.width = 45;
      image.height = 40;
      photo.appendChild(image);
    }
    avatar.src = pins[index].author.avatar;
    fragment.appendChild(cloneCard);

    map.insertBefore(fragment, cloneCard.querySelector('.map__filters-container'));
  };
  window.card = {
    show: show
  };
})();
