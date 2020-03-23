'use strict';
(function () {
  var pins = document.querySelector('.map__pins');

  var removeActivePinClass = function () {
    var oldPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < oldPins.length; i++) {
      var isFind = false;
      if (oldPins[i].className.indexOf('map__pin--active') >= 0) {
        isFind = true;
        oldPins[i].classList.remove('map__pin--active');
      }
      if (isFind) {
        break;
      }
    }
  };
  var clear = function () {
    var oldPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < oldPins.length; i++) {
      pins.removeChild(oldPins[i]);
    }
    var popUp = document.querySelector('.map__card');
    if (popUp) {
      removeActivePinClass();
      popUp.remove();
    }
  };
  var activateSite = function () {
    var fieldsets = document.querySelectorAll('fieldset');
    var mapPinMain = document.querySelector('.map__pin--main');
    var map = document.querySelector('.map');
    var activate = function () {
      var form = document.querySelector('.ad-form');
      map.classList.remove('map--faded');
      window.data.fillData();
      for (var i = 0; i < fieldsets.length; i++) {
        fieldsets[i].removeAttribute('disabled');
      }
      form.classList.remove('ad-form--disabled');
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
      var cross = map.querySelector('.popup__close');
      var popup = map.querySelector('.popup');
      removeActivePinClass();
      popup.remove();
      document.removeEventListener('keydown', documentKeyDownHandler);
      cross.removeEventListener('click', crossClickHandler);
    };
    var documentKeyDownHandler = function (evt) {
      var cross = map.querySelector('.popup__close');
      if (evt.key === 'Escape') {
        var popup = map.querySelector('.popup');
        removeActivePinClass();
        popup.remove();
        cross.removeEventListener('click', crossClickHandler);
        document.removeEventListener('keydown', documentKeyDownHandler);
      }
    };
    var pinsKeyDownHandler = function (evt) {
      var target = evt.target;
      removeActivePinClass();
      if (evt.key === 'Enter') {
        target.classList.add('map__pin--active');
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
        removeActivePinClass();
        target.parentElement.classList.add('map__pin--active');
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
    activateSite: activateSite,
    clear: clear
  };
})();
