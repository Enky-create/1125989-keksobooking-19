'use strict';
(function () {
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var form = document.querySelector('.ad-form');
  var type = document.querySelector('#type');
  var price = document.querySelector('#price');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var formSubmitHandler = function (evt) {
    evt.preventDefault();
  };

  var capacityAndRoomnumberChangeHandler = function () {
    roomNumber.setCustomValidity('');
    if (+roomNumber.value < +capacity.value && +capacity.value > 0 || +roomNumber.value === 100 && +capacity.value !== 0) {
      roomNumber.setCustomValidity('Количество комнат не соответствует количеству гостей');
    }
    if (+capacity.value === 0 && +roomNumber.value !== 100) {
      roomNumber.setCustomValidity('Количество комнат не соответствует количеству гостей');
    }
  };
  var typeChangeHandler = function () {
    switch (type.value) {
      case 'bungalo':
        price.setAttribute('min', '0');
        price.setAttribute('placeholder', '0');
        break;
      case 'flat':
        price.setAttribute('min', '1000');
        price.setAttribute('placeholder', '1000');
        break;
      case 'house':
        price.setAttribute('min', '5000');
        price.setAttribute('placeholder', '5000');
        break;
      case 'palace':
        price.setAttribute('min', '10000');
        price.setAttribute('placeholder', '10000');
        break;
      default:
        throw new Error('Неизвестный тип');
    }
  };
  var timeInChangeHandler = function () {
    timeOut.value = timeIn.value;
  };
  var timeOutChangeHandler = function () {
    timeIn.value = timeOut.value;
  };
  timeIn.addEventListener('change', timeInChangeHandler);
  timeOut.addEventListener('change', timeOutChangeHandler);
  form.addEventListener('submit', formSubmitHandler);
  roomNumber.addEventListener('change', capacityAndRoomnumberChangeHandler);
  capacity.addEventListener('change', capacityAndRoomnumberChangeHandler);
  type.addEventListener('change', typeChangeHandler);
})();
