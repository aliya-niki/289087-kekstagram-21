'use strict';

(function () {
  const getRandomElement = function (array) {
    const randomElementIndex = Math.floor(Math.random() * array.length);
    return array[randomElementIndex];
  };

  const getRandomNumber = function (minNumber, maxNumber) {
    return (Math.round(Math.random() * (maxNumber - minNumber)) + minNumber);
  };

  window.util = {
    getRandomNumber: getRandomNumber,
    getRandomElement: getRandomElement
  };
})();


