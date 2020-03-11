'use strict';
(function () {
  var xhrErrorHandler = function (errorMesage) {
    console.error(errorMesage);
  };
  window.load = function (url) {
    var xhr = new XMLHttpRequest();
    xhr.responceType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        return (xhr.responce);
      } else {
        xhrErrorHandler('Статус ответа ' + xhr.status + ' ' + xhr.statusText);
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
