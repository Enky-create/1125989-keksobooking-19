'use strict';
(function () {
  var filteredPins = [];
  var formFielters = document.querySelector('.map__filters');
  var pins = document.querySelector('.map__pins');
  /*var fielterCapacity = function (arrayPin, capacity) {
    return arrayPin.slice(0, capacity);
  };*/
  var getFilteredArray = function () {
    return filteredPins;
  };
  var filter = function () {
    filteredPins = [];
    window.map.clear();
    var arrayPins = window.data.get();
    var filterPin = {
      type: formFielters.querySelector('select[name="housing-type"]').value,
      price: formFielters.querySelector('select[name="housing-price"]').value,
      rooms: formFielters.querySelector('select[name="housing-rooms"]').value,
      guests: formFielters.querySelector('select[name="housing-guests"]').value,
      features: Array.from(formFielters.querySelectorAll('input:checked'))
    };
    for (var i = 0; i < window.constant.PINS_QUANTITY; i++) {
      var isGood = true;
      var price = +arrayPins[i].offer.price;
      if (filterPin.type !== 'any' && filterPin.type !== arrayPins[i].offer.type) {
        isGood = false;
      }
      switch (filterPin.price) {
        case 'any' :
          break;
        case 'middle':
          if (price > 50000 || price < 10000) {
            isGood = false;
          }
          break;
        case 'low':
          if (price > 10000) {
            isGood = false;
          }
          break;
        case 'high':
          if (price < 50000) {
            isGood = false;
          }
          break;
        default:
          isGood = true;
      }
      if (filterPin.rooms !== 'any' && (+filterPin.rooms) !== arrayPins[i].offer.rooms) {
        isGood = false;
      }
      if (filterPin.guests !== 'any' && (+filterPin.guests) !== arrayPins[i].offer.guests) {
        isGood = false;
      }
      if (isGood) {
        filteredPins.push(arrayPins[i]);
      }
    }
    pins.appendChild(window.pin.doNewPin(filteredPins));
  };
  formFielters.addEventListener('change', window.debounce(filter));
  window.filters = {
    doFilter: filter,
    getFilteredArray: getFilteredArray
  };
})();

