'use strict';

(function () {
  const EFFECT_DEFAULT_VALUE = 100;
  const effectLevel = document.querySelector(`.effect-level`);
  const effectLevelPin = document.querySelector(`.effect-level__pin`);
  const effectLevelLine = document.querySelector(`.effect-level__line`);
  const effectLevelVal = document.querySelector(`.effect-level__depth`);
  const effectLevelInput = document.querySelector(`.effect-level__value`);
  const effectRadioList = document.querySelector(`.effects`);
  const imgPreview = document.querySelector(`.img-upload__preview`);
  const imgPreviewPicture = imgPreview.querySelector(`img`);

  effectLevel.classList.add(`hidden`);

  effectRadioList.addEventListener(`click`, function (evt) {
    let target = evt.target;
    if (target.matches(`.effects__radio`)) {
      effectLevelVal.style.width = EFFECT_DEFAULT_VALUE + `%`;
      effectLevelPin.style.left = EFFECT_DEFAULT_VALUE + `%`;
      effectLevel.classList.remove(`hidden`);


      switch (target.getAttribute(`id`)) {
        case `effect-chrome`:
          imgPreviewPicture.className = `effects__preview--chrome`;
          imgPreviewPicture.style.filter = `grayscale(` + EFFECT_DEFAULT_VALUE + `%)`;
          break;
        case `effect-sepia`:
          imgPreviewPicture.className = `effects__preview--sepia`;
          imgPreviewPicture.style.filter = `sepia(` + EFFECT_DEFAULT_VALUE + `%)`;
          break;
        case `effect-marvin`:
          imgPreviewPicture.className = `effects__preview--marvin`;
          imgPreviewPicture.style.filter = `invert(` + EFFECT_DEFAULT_VALUE + `%)`;
          break;
        case `effect-phobos`:
          const maxBlur = 3;
          imgPreviewPicture.className = `effects__preview--phobos`;
          imgPreviewPicture.style.filter = `blur(` + Math.round(maxBlur * EFFECT_DEFAULT_VALUE / 100) + `px)`;
          break;
        case `effect-heat`:
          const minBrightness = 1;
          const maxBrightness = 3;
          imgPreviewPicture.className = `effects__preview--heat`;
          imgPreviewPicture.style.filter = `brightness(` + (minBrightness + (maxBrightness - minBrightness) * EFFECT_DEFAULT_VALUE / 100) + `)`;
          break;
        default:
          imgPreviewPicture.className = `effect-preview--none`;
          imgPreviewPicture.style.filter = `none`;
          effectLevel.classList.add(`hidden`);
          break;
      }
    }
  });

  effectLevelPin.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();

    let startX = evt.clientX;

    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      let shiftX = startX - moveEvt.clientX;

      startX = moveEvt.clientX;

      if ((effectLevelPin.offsetLeft - shiftX) < 0) {
        effectLevelPin.style.left = `0px`;
      } else if ((effectLevelPin.offsetLeft - shiftX) >= effectLevelLine.offsetWidth) {
        effectLevelPin.style.left = effectLevelLine.offsetWidth + `px`;
      } else {
        effectLevelPin.style.left = (effectLevelPin.offsetLeft - shiftX) + `px`;
      }

      let effectLevelResult = Math.round(100 * effectLevelPin.offsetLeft / effectLevelLine.offsetWidth);
      effectLevelVal.style.width = effectLevelPin.style.left;
      effectLevelInput.setAttribute(`value`, effectLevelResult.toString());

      switch (imgPreviewPicture.className) {
        case `effects__preview--chrome`:
          imgPreviewPicture.style.filter = `grayscale(` + effectLevelResult + `%)`;
          break;
        case `effects__preview--sepia`:
          imgPreviewPicture.style.filter = `sepia(` + effectLevelResult + `%)`;
          break;
        case `effects__preview--marvin`:
          imgPreviewPicture.style.filter = `invert(` + effectLevelResult + `%)`;
          break;
        case `effects__preview--phobos`:
          imgPreviewPicture.style.filter = `blur(` + Math.round(3 * effectLevelResult / 100) + `px)`;
          break;
        case `effects__preview--heat`:
          imgPreviewPicture.style.filter = `brightness(` + (100 + 2 * effectLevelResult) + `%)`;
          break;
        default:
          imgPreviewPicture.style.filter = `none`;
          break;
      }
    };

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });
})();
