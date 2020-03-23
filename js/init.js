'use strict';
(function () {
  var init = function () {
    var map = document.querySelector('.map');
    var form = document.querySelector('.ad-form');
    var roomNumber = document.querySelector('#room_number');
    var capacity = document.querySelector('#capacity');
    var filters = document.querySelector('.map__filters');
    var selectFilters = filters.querySelectorAll('select');
    var fieldsets = document.querySelectorAll('fieldset');
    map.className = 'map';
    map.classList.add('map--faded');
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].setAttribute('disabled', 'disabled');
    }
    filters.classList.add('ad-form--disabled');
    selectFilters.forEach(function (select) {
      select.setAttribute('disabled', 'disabled');
    });
    if (+roomNumber.value < +capacity.value) {
      roomNumber.setCustomValidity('Количество комнат не соответствует количеству гостей');
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
