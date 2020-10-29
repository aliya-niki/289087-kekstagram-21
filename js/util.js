'use strict';

(function () {
  const DEBOUNCE_INTERVAL = 500; // ms

  const debounce = function (cb) {
    let lastTimeout = null;

    return function (...parameters) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb(...parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  const shuffleArray = function (array) {
    let newArray = [];
    array.forEach((item) => newArray.push(item));

    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = newArray[i];
      newArray[i] = newArray[j];
      newArray[j] = temp;
    }
    return newArray;
  };

  window.utils = {
    debounce: debounce,
    shuffleArray: shuffleArray
  };
})();

