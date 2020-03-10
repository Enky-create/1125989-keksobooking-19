'use strict';
(function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var addressMainPin = function () {
    var address = document.querySelector('#address');
    var xString = mapPinMain.style.left.replace('px', '');
    var yString = mapPinMain.style.top.replace('px', '');
    var x = parseInt(xString, 10) + window.constant.MUFFIN_RADIUS;
    var y = parseInt(yString, 10) + window.constant.MUFFIN_RADIUS;
    address.value = x + ' ,' + y;
  };
  var mainPinMouseDownHandler = function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var mainPinMouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
      addressMainPin();
    };
    var mainPinMouseUpHandler = function () {
      addressMainPin();
      document.removeEventListener('mousemove', mainPinMouseMoveHandler);
      window.removeEventListener('mouseup', mainPinMouseUpHandler);
    };
    document.addEventListener('mousemove', mainPinMouseMoveHandler);
    window.addEventListener('mouseup', mainPinMouseUpHandler);
  };
  mapPinMain.addEventListener('mousedown', mainPinMouseDownHandler);
})();
