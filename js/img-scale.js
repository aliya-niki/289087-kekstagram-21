'use strict';

(function () {
  const DEFAULT_IMG_SCALE = 100;
  const MAX_IMG_SCALE = 100;
  const MIN_IMG_SCALE = 25;
  const STEP_IMG_SCALE = 25;
  const scaleSmallerBtn = document.querySelector(`.scale__control--smaller`);
  const scaleBiggerBtn = document.querySelector(`.scale__control--bigger`);
  let scaleControlValue = document.querySelector(`.scale__control--value`);
  const imgPreview = document.querySelector(`.img-upload__preview`);

  let scaleCurrentValue = DEFAULT_IMG_SCALE;

  const changeScaleValues = function (value) {
    imgPreview.style.transform = `scale(` + value / 100 + `)`;
    scaleControlValue.value = value + `%`;
  };

  const scaleSmaller = function () {
    if (scaleCurrentValue !== MIN_IMG_SCALE) {
      scaleCurrentValue -= STEP_IMG_SCALE;
      changeScaleValues(scaleCurrentValue);
    }
  };

  const scaleBigger = function () {
    if (scaleCurrentValue !== MAX_IMG_SCALE) {
      scaleCurrentValue += STEP_IMG_SCALE;
      changeScaleValues(scaleCurrentValue);
    }
  };

  scaleSmallerBtn.addEventListener(`click`, scaleSmaller);
  scaleBiggerBtn.addEventListener(`click`, scaleBigger);
})();
