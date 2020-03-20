'use strict';
(function () {
  var init = function () {
    var map = document.querySelector('.map');
    var pins = document.querySelector('.map__pins');
    var nested = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    var form = document.querySelector('.ad-form');
    var roomNumber = document.querySelector('#room_number');
    var capacity = document.querySelector('#capacity');
    var filters = document.querySelector('.map__filters');
    var fieldsets = document.querySelectorAll('fieldset');
    var addressInput = document.querySelector('#address');
    var mapPinMain = document.querySelector('.map__pin--main');
    var xString = mapPinMain.style.left.replace('px', '');
    var yString = mapPinMain.style.top.replace('px', '');
    var x = parseInt(xString, 10) + window.constant.MUFFIN_RADIUS;
    var y = parseInt(yString, 10) + window.constant.MUFFIN_RADIUS;
    map.className = 'map';
    map.classList.add('map--faded');
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].setAttribute('disabled', 'disabled');
    }
    addressInput.value = x + ', ' + y;
    filters.classList.add('ad-form--disabled');
    if (+roomNumber.value < +capacity.value) {
      roomNumber.setCustomValidity('Количество комнат не соответствует количеству гостей');
    }
    for (var a = 0; a < nested.length; a++) {
      pins.removeChild(nested[a]);
    }
    form.className = 'ad-form';
    form.classList.add('ad-form--disabled');
    form.reset();
    window.map.activateSite();
  };
  window.init = {
    doInit: init
  };
  window.init.doInit();
})();
