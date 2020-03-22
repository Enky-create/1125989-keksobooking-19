'use strict';
(function () {
  var debounce = function (cb) {
    var lastTimeout;
    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, window.constant.DEBOUNCE_INTERVAL);
    };
  };
  window.debounce = debounce;
})();
