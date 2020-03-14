'use strict';
(function () {
  window.load = function (url, xhrLoadHandler, xhrErrorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        xhrLoadHandler(xhr.response);
      } else {
        xhrErrorHandler('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      xhrErrorHandler('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      xhrErrorHandler('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = 10000;
    xhr.open('GET', url);
    xhr.send();
  };
})();
