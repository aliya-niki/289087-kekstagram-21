'use strict';

(function () {
  const URL = `https://21.javascript.pages.academy/kekstagram/data`;
  const TIMEOUT_IN_MS = 10000;

  const load = (onSuccess, onError) => {
    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      if (xhr.status === window.utils.StatusCode.OK) {
        onSuccess(xhr.response);
        return;
      }
      onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
    });

    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, () => {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + ` мс`);
    });
    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(`GET`, URL);

    xhr.send();
  };

  const errorHandler = (onError) => {
    let node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `20px`;

    node.textContent = onError;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  const successHandler = (data) => {
    window.gallery.onLoadRenderPictures(data);
  };

  load(successHandler, errorHandler);
})();
