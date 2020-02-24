'use strict';
(function () {
  var data = window.data;
  var arrayPin = [];
  var randomHtmlPin = function (counter) {
    var htmlPin = document.querySelector('#pin').content.querySelector('button');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < counter; i++) {
      var pin = data.getRandomPin(i);
      arrayPin.push(pin);
      var clonePin = htmlPin.cloneNode(true);
      clonePin.querySelector('img').src = pin.author.avatar;
      clonePin.querySelector('img').alt = pin.offer.title;
      clonePin.style.left = pin.location.x + 'px';
      clonePin.style.top = pin.location.y + 'px';
      fragment.appendChild(clonePin);
    }
    return fragment;
  };
  window.pin = {
    randomHtmlPin: randomHtmlPin,
    arrayPin: arrayPin
  };
})();
