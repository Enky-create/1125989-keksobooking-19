'use strict';
(function () {
  var pin = window.data.get();
  var newPin = function (counter) {
    var htmlPin = document.querySelector('#pin').content.querySelector('button');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < counter; i++) {
      var clonePin = htmlPin.cloneNode(true);
      clonePin.querySelector('img').src = pin[i].author.avatar;
      clonePin.querySelector('img').alt = pin[i].offer.title;
      clonePin.style.left = pin[i].location.x + 'px';
      clonePin.style.top = pin[i].location.y + 'px';
      clonePin.classList.add('number_' + i);
      fragment.appendChild(clonePin);
    }
    return fragment;
  };
  window.pin = {
    newPin: newPin
  };
})();
