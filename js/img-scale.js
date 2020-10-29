'use strict';

(function () {

  const DEFAULT_IMG_SCALE = 100;
  const MAX_IMG_SCALE = 100;
  const MIN_IMG_SCALE = 25;
  const STEP_IMG_SCALE = 25;
  const scaleSmallerButton = document.querySelector(`.scale__control--smaller`);
  const scaleBiggerButton = document.querySelector(`.scale__control--bigger`);
  const scaleControlValue = document.querySelector(`.scale__control--value`);
  const imgPreview = document.querySelector(`.img-upload__preview`);

  let scaleCurrentValue = DEFAULT_IMG_SCALE;

  const changeScaleValues = function (element, value) {
    element.style.transform = `scale(` + value / 100 + `)`;
    scaleControlValue.value = value + `%`;
  };

  const scaleSmaller = function () {
    if (scaleCurrentValue !== MIN_IMG_SCALE) {
      scaleCurrentValue -= STEP_IMG_SCALE;
      changeScaleValues(imgPreview, scaleCurrentValue);
    }
  };

  const scaleBigger = function () {
    if (scaleCurrentValue !== MAX_IMG_SCALE) {
      scaleCurrentValue += STEP_IMG_SCALE;
      changeScaleValues(imgPreview, scaleCurrentValue);
    }
  };

  scaleSmallerButton.addEventListener(`click`, scaleSmaller);
  scaleBiggerButton.addEventListener(`click`, scaleBigger);

  window.imgScale = {
    changeScaleValues: changeScaleValues
  };

})();
