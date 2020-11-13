'use strict';

const DEFAULT_IMG_SCALE = 100;
const MAX_IMG_SCALE = 100;
const MIN_IMG_SCALE = 25;
const STEP_IMG_SCALE = 25;
const scaleControlValue = document.querySelector(`.scale__control--value`);
const imgPreview = document.querySelector(`.img-upload__preview img`);

let scaleCurrentValue = DEFAULT_IMG_SCALE;

const changeValues = (element, value) => {
  element.style.transform = `scale(` + value / 100 + `)`;
  scaleControlValue.value = value + `%`;
};

const scaleSmaller = () => {
  if (scaleCurrentValue !== MIN_IMG_SCALE) {
    scaleCurrentValue -= STEP_IMG_SCALE;
    changeValues(imgPreview, scaleCurrentValue);
  }
};

const scaleBigger = () => {
  if (scaleCurrentValue !== MAX_IMG_SCALE) {
    scaleCurrentValue += STEP_IMG_SCALE;
    changeValues(imgPreview, scaleCurrentValue);
  }
};

window.imgScale = {
  changeValues,
  setSmallerHandler: scaleSmaller,
  setBiggerHandler: scaleBigger
};

