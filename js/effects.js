'use strict';

(function () {
  const EFFECT_DEFAULT_VALUE = 100;
  const MAX_BLUR = 3;
  const MIN_BRIGHTNESS = 1;
  const MAX_BRIGHTNESS = 3;
  const effectLevel = document.querySelector(`.effect-level`);
  const effectLevelPin = document.querySelector(`.effect-level__pin`);
  const effectLevelLine = document.querySelector(`.effect-level__line`);
  const effectLevelValue = document.querySelector(`.effect-level__depth`);
  const effectLevelInput = document.querySelector(`.effect-level__value`);
  const effectRadioList = document.querySelector(`.effects`);
  const imgPreviewPicture = document.querySelector(`.img-upload__preview img`);
  let startX;

  effectLevel.classList.add(`hidden`);

  const setDefault = () => {
    effectRadioList.querySelector(`#effect-none`).checked = true;
    imgPreviewPicture.className = `effect-preview--none`;
    imgPreviewPicture.style.filter = `none`;
    effectLevel.classList.add(`hidden`);
    effectLevelInput.value = EFFECT_DEFAULT_VALUE.toString();
  };

  const change = (evt) => {
    let target = evt.target;
    if (target.matches(`.effects__radio`)) {
      effectLevelValue.style.width = EFFECT_DEFAULT_VALUE + `%`;
      effectLevelPin.style.left = EFFECT_DEFAULT_VALUE + `%`;
      effectLevel.classList.remove(`hidden`);

      switch (target.id) {
        case `effect-chrome`:
          imgPreviewPicture.className = `effects__preview--chrome`;
          imgPreviewPicture.style.filter = `grayscale(` + EFFECT_DEFAULT_VALUE / 100 + `)`;
          break;
        case `effect-sepia`:
          imgPreviewPicture.className = `effects__preview--sepia`;
          imgPreviewPicture.style.filter = `sepia(` + EFFECT_DEFAULT_VALUE / 100 + `)`;
          break;
        case `effect-marvin`:
          imgPreviewPicture.className = `effects__preview--marvin`;
          imgPreviewPicture.style.filter = `invert(` + EFFECT_DEFAULT_VALUE + `%)`;
          break;
        case `effect-phobos`:
          imgPreviewPicture.className = `effects__preview--phobos`;
          imgPreviewPicture.style.filter = `blur(` + MAX_BLUR * EFFECT_DEFAULT_VALUE / 100 + `px)`;
          break;
        case `effect-heat`:
          imgPreviewPicture.className = `effects__preview--heat`;
          imgPreviewPicture.style.filter = `brightness(` + (MIN_BRIGHTNESS + (MAX_BRIGHTNESS - MIN_BRIGHTNESS) * EFFECT_DEFAULT_VALUE / 100) + `)`;
          break;
        default:
          imgPreviewPicture.className = `effect-preview--none`;
          imgPreviewPicture.style.filter = `none`;
          effectLevel.classList.add(`hidden`);
          break;
      }
    }
  };

  const onMouseMove = (moveEvt) => {
    moveEvt.preventDefault();

    let shiftX = startX - moveEvt.clientX;
    let effectLevelResult;

    startX = moveEvt.clientX;

    if ((effectLevelPin.offsetLeft - shiftX) < 0) {
      effectLevelPin.style.left = `0px`;
    } else if ((effectLevelPin.offsetLeft - shiftX) >= effectLevelLine.offsetWidth) {
      effectLevelPin.style.left = effectLevelLine.offsetWidth + `px`;
    } else {
      effectLevelPin.style.left = (effectLevelPin.offsetLeft - shiftX) + `px`;
    }

    effectLevelValue.style.width = effectLevelPin.style.left;
    effectLevelResult = Math.round(100 * effectLevelPin.offsetLeft / effectLevelLine.offsetWidth);
    effectLevelInput.value = effectLevelResult.toString();

    switch (imgPreviewPicture.className) {
      case `effects__preview--chrome`:
        imgPreviewPicture.style.filter = `grayscale(` + effectLevelResult / 100 + `)`;
        break;
      case `effects__preview--sepia`:
        imgPreviewPicture.style.filter = `sepia(` + effectLevelResult / 100 + `)`;
        break;
      case `effects__preview--marvin`:
        imgPreviewPicture.style.filter = `invert(` + effectLevelResult + `%)`;
        break;
      case `effects__preview--phobos`:
        imgPreviewPicture.style.filter = `blur(` + MAX_BLUR * effectLevelResult / 100 + `px)`;
        break;
      case `effects__preview--heat`:
        imgPreviewPicture.style.filter = `brightness(` + (MIN_BRIGHTNESS + (MAX_BRIGHTNESS - MIN_BRIGHTNESS) * effectLevelResult / 100) + `)`;
        break;
      default:
        imgPreviewPicture.style.filter = `none`;
        break;
    }
  };

  const onMouseUp = (upEvt) => {
    upEvt.preventDefault();

    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };

  const onMouseDown = (evt) => {
    evt.preventDefault();
    startX = evt.clientX;

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  };

  window.effects = {
    setDefault,
    change,
    onMouseDown
  };
})();
