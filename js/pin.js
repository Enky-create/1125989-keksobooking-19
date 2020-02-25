'use strict';
(function () {
  var pin = window.data.arrayPin;
  var randomHtmlPin = function (counter) {
    var htmlPin = document.querySelector('#pin').content.querySelector('button');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < counter; i++) {
      var clonePin = htmlPin.cloneNode(true);
      clonePin.querySelector('img').src = pin[i].author.avatar;
      clonePin.querySelector('img').alt = pin[i].offer.title;
      clonePin.style.left = pin[i].location.x + 'px';
      clonePin.style.top = pin[i].location.y + 'px';
      fragment.appendChild(clonePin);
    }
    return fragment;
  };
  window.pin = {
    randomHtmlPin: randomHtmlPin
  };
})();
