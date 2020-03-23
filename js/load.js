'use strict';
(function () {
  var check = function (xhr, doLoad, doError) {
    if (xhr.status === 200) {
      doLoad(xhr.response);
    } else {
      doError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
    }
  };
  window.load = function (url, xhrLoadHandler, xhrErrorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      check(xhr, xhrLoadHandler, xhrErrorHandler);
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
  window.upLoad = function (url, data, xhrUpLoadHandler, xhrErrorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responceType = 'json';
    xhr.open('POST', url);
    xhr.addEventListener('load', function () {
      check(xhr, xhrUpLoadHandler, xhrErrorHandler);
    });
    xhr.addEventListener('error', function () {
      xhrErrorHandler('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      xhrErrorHandler('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = 10000;
    xhr.send(data);
  };
})();
