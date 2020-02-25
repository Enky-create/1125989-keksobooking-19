'use strict';
(function () {
  var filters = document.querySelector('.map__filters');
  var fieldsets = document.querySelectorAll('fieldset');
  var mapPinMain = document.querySelector('.map__pin--main');
  var addressInput = document.querySelector('#address');
  var xString = mapPinMain.style.left.replace('px', '');
  var yString = mapPinMain.style.top.replace('px', '');
  var x = parseInt(xString, 10) + window.constant.MUFFIN_RADIUS;
  var y = parseInt(yString, 10) + window.constant.MUFFIN_RADIUS;
  var doActiveSite = function () {
    var map = document.querySelector('.map');
    var pins = document.querySelector('.map__pins');
    var nested = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    var form = document.querySelector('.ad-form');

    map.classList.remove('map--faded');
    for (var i = 0; i < nested.length; i++) {
      pins.removeChild(nested[i]);
    }

    pins.appendChild(window.pin.randomHtmlPin(window.constant.PINS_QUANTITY));
    for (var b = 0; b < fieldsets.length; b++) {
      fieldsets[b].removeAttribute('disabled');
    }
    form.classList.remove('ad-form--disabled');
    filters.classList.remove('ad-form--disabled');
  };
  var pinMousedownHandler = function (evt) {
    if (evt.button === 0) {
      doActiveSite(fieldsets, filters);
      y = y + window.constant.MUFFIN_TALE_HEIGHT + window.constant.MUFFIN_RADIUS;
      addressInput.value = x + ', ' + y;
    }
  };

  var pinClickHandler = function () {
    window.pin.arrayPin = [];
    doActiveSite(fieldsets, filters);
    window.card.doCard(0);
    y = y + window.constant.MUFFIN_TALE_HEIGHT + window.constant.MUFFIN_RADIUS;
    addressInput.value = x + ', ' + y;
  };

  mapPinMain.addEventListener('mousedown', pinMousedownHandler);
  mapPinMain.addEventListener('click', pinClickHandler);
  window.map = {
    doActiveSite: doActiveSite
  };
})();
