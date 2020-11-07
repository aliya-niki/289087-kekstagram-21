'use strict';

(() => {
  const URL = `https://21.javascript.pages.academy/kekstagram`;

  const sendData = (data, onSuccess, onError) => {
    let xhr = new XMLHttpRequest();

    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      if (xhr.status === window.utils.StatusCode.OK || xhr.status === window.utils.StatusCode.CREATED) {
        onSuccess(xhr.response);
        return;
      }
      onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
    });

    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения`);
    });

    xhr.open(`POST`, URL);
    xhr.send(data);
  };

  window.upload = {
    sendData
  };
})();
