'use strict';
(function () {
  var filteredArray;
  var formFielters = document.querySelector('.map__filters');
  var pins = document.querySelector('.map__pins');
  var fielterCapacity = function (arrayPin, capacity) {
    return arrayPin.slice(0, capacity);
  };
  var clear = function () {
    var nested = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var a = 0; a < nested.length; a++) {
      pins.removeChild(nested[a]);
    }
    var popUp = document.querySelector('.map__card');
    if (popUp) {
      popUp.remove();
    }
  };
  var getFilteredArray = function () {
    return filteredArray;
  }
  var filter = function () {
    clear();
    var arrayPin = window.data.get();
    var filterPin = {
      type: formFielters.querySelector('select[name="housing-type"]').value,
      price: formFielters.querySelector('select[name="housing-price"]').value,
      rooms: formFielters.querySelector('select[name="housing-rooms"]').value,
      guests: formFielters.querySelector('select[name="housing-guests"]').value,
      features: Array.from(formFielters.querySelectorAll('input:checked'))
    };
    filteredArray = arrayPin.filter(function (pin) {
      var price = +pin.offer.price;
      if (filterPin.type !== 'any' && filterPin.type !== pin.offer.type) {
        return false;
      }
      if (filterPin.type !== 'any' && filterPin.type !== pin.offer.type) {
        return false;
      }
      switch (filterPin.price) {
        case 'middle':
          if (price > 50000 || price < 10000) {
            return false;
          }
          break;
        case 'low':
          if (price > 10000) {
            return false;
          }
          break;
        case 'high':
          if (price < 50000) {
            return false;
          }
          break;
        default:
          return true;
      }
      if (filterPin.rooms !== 'any' && filterPin.rooms !== pin.offer.rooms) {
        return false;
      }
      if (filterPin.guests !== 'any' && filterPin.guests !== pin.offer.guests) {
        return false;
      }
      return filterPin.features.every(function (feature) {
        return pin.offer.features.indexOf(feature) >= 0;
      });
    });
    filteredArray = fielterCapacity(filteredArray, window.constant.PINS_QUANTITY);
    pins.appendChild(window.pin.newPin(filteredArray));
  };
  formFielters.addEventListener('change', window.debounce(filter));
  window.filters = {
    doFilter: filter,
    getFilteredArray: getFilteredArray
  };
})();

