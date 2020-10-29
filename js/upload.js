'use strict';

(function () {
  const URL = `https://21.javascript.pages.academy/kekstagram`;

  const upload = function (data, onSuccess, onError) {
    let xhr = new XMLHttpRequest();

    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      onSuccess(xhr.response);
    });

    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });

    xhr.open(`POST`, URL);
    xhr.send(data);
  };

  window.upload = {
    upload: upload
  };
})();
