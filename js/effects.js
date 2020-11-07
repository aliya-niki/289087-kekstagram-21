'use strict';

(() => {
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

  const Effects = {
    chrome: {
      className: `effects__preview--chrome`,
      styleFilter: (value) => {
        return `grayscale(` + value / 100 + `)`;
      },
    },
    sepia: {
      className: `effects__preview--sepia`,
      styleFilter: (value) => {
        return `sepia(` + value / 100 + `)`;
      }
    },
    marvin: {
      className: `effects__preview--marvin`,
      styleFilter: (value) => {
        return `invert(` + value + `%)`;
      }
    },
    phobos: {
      className: `effects__preview--phobos`,
      styleFilter: (value) => {
        return `blur(` + MAX_BLUR * value / 100 + `px)`;
      }
    },
    heat: {
      className: `effects__preview--heat`,
      styleFilter: (value) => {
        return `brightness(` + (MIN_BRIGHTNESS + (MAX_BRIGHTNESS - MIN_BRIGHTNESS) * value / 100) + `)`;
      }
    },
    none: {
      className: `effect-preview--none`,
      styleFilter: () => {
        return `none`;
      }
    }
  };

  effectLevel.classList.add(`hidden`);

  const setDefault = () => {
    effectRadioList.querySelector(`#effect-none`).checked = true;
    imgPreviewPicture.className = `effect-preview--none`;
    imgPreviewPicture.style.filter = `none`;
    effectLevel.classList.add(`hidden`);
    effectLevelInput.value = EFFECT_DEFAULT_VALUE.toString();
  };

  const typeChangeHandler = (evt) => {
    let target = evt.target;
    if (target.matches(`.effects__radio`)) {
      effectLevelValue.style.width = EFFECT_DEFAULT_VALUE + `%`;
      effectLevelPin.style.left = EFFECT_DEFAULT_VALUE + `%`;
      effectLevel.classList.remove(`hidden`);

      imgPreviewPicture.className = Effects[target.value].className;
      imgPreviewPicture.style.filter = Effects[target.value].styleFilter(EFFECT_DEFAULT_VALUE);
      imgPreviewPicture.dataset.effect = target.value;
      if (target.value === `none`) {
        effectLevel.classList.add(`hidden`);
      }
    }
  };

  const mouseMoveHandler = (moveEvt) => {
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

    imgPreviewPicture.style.filter = Effects[imgPreviewPicture.dataset.effect].styleFilter(effectLevelResult);
  };

  const mouseUpHandler = (upEvt) => {
    upEvt.preventDefault();

    document.removeEventListener(`mousemove`, mouseMoveHandler);
    document.removeEventListener(`mouseup`, mouseUpHandler);
  };

  const mouseDownHandler = (evt) => {
    evt.preventDefault();
    startX = evt.clientX;

    document.addEventListener(`mousemove`, mouseMoveHandler);
    document.addEventListener(`mouseup`, mouseUpHandler);
  };

  window.effects = {
    setDefault,
    typeChangeHandler,
    mouseDownHandler
  };
})();
