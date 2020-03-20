'use strict';
(function () {
  var activateSite = function () {
    var filters = document.querySelector('.map__filters');
    var fieldsets = document.querySelectorAll('fieldset');
    var mapPinMain = document.querySelector('.map__pin--main');
    var map = document.querySelector('.map');
    var pins = document.querySelector('.map__pins');
    var activate = function () {
      var form = document.querySelector('.ad-form');
      map.classList.remove('map--faded');
      window.data.fillData();
      for (var b = 0; b < fieldsets.length; b++) {
        fieldsets[b].removeAttribute('disabled');
      }
      form.classList.remove('ad-form--disabled');
      filters.classList.remove('ad-form--disabled');
    };

    var pinMousedownHandler = function (evt) {
      if (evt.button === 0) {
        activate();
        mapPinMain.removeEventListener('click', pinClickHandler);
        mapPinMain.removeEventListener('mousedown', pinMousedownHandler);
      }
    };

    var pinClickHandler = function () {
      activate();
      mapPinMain.removeEventListener('mousedown', pinMousedownHandler);
      mapPinMain.removeEventListener('click', pinClickHandler);
    };
    var crossClickHandler = function () {
      var popup = map.querySelector('.popup');
      var cross = map.querySelector('.popup__close');
      popup.remove();
      cross.removeEventListener('click', crossClickHandler);
      document.removeEventListener('keydown', documentKeyDownHandler);
    };
    var documentKeyDownHandler = function (evt) {
      if (evt.key === 'Escape') {
        var popup = map.querySelector('.popup');
        popup.remove();
        document.removeEventListener('keydown', documentKeyDownHandler);
      }
    };
    var pinsKeyDownHandler = function (evt) {
      var target = evt.target;
      if (evt.key === 'Enter') {
        var index = target.children[0].dataset.indexNumber;
        window.card.show(index);
        var cross = map.querySelector('.popup__close');
        cross.addEventListener('click', crossClickHandler);
        document.addEventListener('keydown', documentKeyDownHandler);
      }
    };
    var pinsClickHandler = function (evt) {
      var target = evt.target;
      if (target.tagName === 'IMG' && (target.parentElement.className.indexOf('map__pin--main') < 0)) {
        var index = target.dataset.indexNumber;
        window.card.show(index);
        var cross = map.querySelector('.popup__close');
        cross.addEventListener('click', crossClickHandler);
        document.addEventListener('keydown', documentKeyDownHandler);
      }
    };
    pins.addEventListener('keydown', pinsKeyDownHandler);
    pins.addEventListener('click', pinsClickHandler);
    mapPinMain.addEventListener('mousedown', pinMousedownHandler);
    mapPinMain.addEventListener('click', pinClickHandler);
  };
  window.map = {
    activateSite: activateSite
  };
})();
