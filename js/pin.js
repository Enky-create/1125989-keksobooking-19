'use strict';
(function () {
  var doNewPin = function (arrayPins) {
    var pins = arrayPins;
    var htmlPin = document.querySelector('#pin').content.querySelector('button');
    htmlPin.setAttribute('tabindex', '0');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pins.length; i++) {
      var clonePin = htmlPin.cloneNode(true);
      var img = clonePin.querySelector('img');
      img.src = pins[i].author.avatar;
      img.alt = pins[i].offer.title;
      img.setAttribute('data-index-number', i);
      clonePin.style.left = pins[i].location.x + 'px';
      clonePin.style.top = pins[i].location.y + 'px';
      fragment.appendChild(clonePin);
    }
    return fragment;
  };
  window.pin = {
    doNewPin: doNewPin
  };
})();
