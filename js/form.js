'use strict';
(function () {
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var form = document.querySelector('.ad-form');
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
  form.addEventListener('submit', formSubmitHandler);
  roomNumber.addEventListener('change', inputChangeHandler);
  capacity.addEventListener('change', inputChangeHandler);
})();
