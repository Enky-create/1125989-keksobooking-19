'use strict';
(function () {
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

  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].setAttribute('disabled', 'disabled');
  }
  addressInput.value = x + ', ' + y;
  filters.classList.add('ad-form--disabled');
  if (+roomNumber.value < +capacity.value) {
    roomNumber.setCustomValidity('Количество комнат не соответствует количеству гостей');
  }
})();
