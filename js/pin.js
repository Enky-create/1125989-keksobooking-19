'use strict';
(function () {
  var pin = window.data.get();
  var newPin = function (counter) {
    var htmlPin = document.querySelector('#pin').content.querySelector('button');
    htmlPin.setAttribute('tabindex', '0');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < counter; i++) {
      var clonePin = htmlPin.cloneNode(true);
      var img = clonePin.querySelector('img');
      img.src = pin[i].author.avatar;
      img.alt = pin[i].offer.title;
      img.setAttribute('data-index-number', i);
      clonePin.style.left = pin[i].location.x + 'px';
      clonePin.style.top = pin[i].location.y + 'px';
      fragment.appendChild(clonePin);
    }
    return fragment;
  };
  window.pin = {
    newPin: newPin
  };
})();
