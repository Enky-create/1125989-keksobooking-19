'use strict';
(function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var getAddressMainPin = function () {
    var address = document.querySelector('#address');
    var xString = mapPinMain.style.left.replace('px', '');
    var yString = mapPinMain.style.top.replace('px', '');
    var x = parseInt(xString, 10) + window.constant.MUFFIN_RADIUS;
    var y = parseInt(yString, 10) + window.constant.MUFFIN_RADIUS + window.constant.MUFFIN_TALE_HEIGHT;
    address.value = x + ' ,' + y;
  };
  var mainPinMouseDownHandler = function (evt) {
    evt.preventDefault();
    var realX;
    var realY;
    var minY = window.constant.MIN_Y;
    var maxY = window.constant.MAX_Y;
    var minX = window.constant.MIN_X;
    var maxX = window.constant.MAX_X;
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
      realY = mapPinMain.offsetTop - shift.y;
      realX = mapPinMain.offsetLeft - shift.x;
      if (realY <= maxY && realY >= minY && realX <= maxX && realX >= minX) {
        mapPinMain.style.top = realY + 'px';
        mapPinMain.style.left = realX + 'px';
        getAddressMainPin();
      }
    };
    var mainPinMouseUpHandler = function () {
      getAddressMainPin();
      document.removeEventListener('mousemove', mainPinMouseMoveHandler);
      window.removeEventListener('mouseup', mainPinMouseUpHandler);
    };
    document.addEventListener('mousemove', mainPinMouseMoveHandler);
    window.addEventListener('mouseup', mainPinMouseUpHandler);
  };
  mapPinMain.addEventListener('mousedown', mainPinMouseDownHandler);
})();
