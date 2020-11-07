'use strict';

(() => {
  const ESC_KEY = `Escape`;

  const StatusCode = {
    OK: 200,
    CREATED: 201
  };

  const DEBOUNCE_INTERVAL = 500;

  const debounce = (cb) => {
    let lastTimeout = null;

    return (...parameters) => {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(() => {
        cb(...parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  const isUrlsEqual = (photo1, photo2) => {
    return photo1.url === photo2.url;
  };

  const shuffle = (elements) => {
    let newElements = [];

    elements.forEach((photo) => {
      if (!newElements.some(isUrlsEqual)) {
        newElements.push(photo);
      }
    });

    for (let i = newElements.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * i);
      const temporaryElement = newElements[i];
      newElements[i] = newElements[randomIndex];
      newElements[randomIndex] = temporaryElement;
    }

    return newElements;
  };

  const isEscEvent = (evt) => {
    return evt.key === ESC_KEY;
  };

  window.utils = {
    debounce,
    shuffle,
    isEscEvent,
    StatusCode
  };
})();

