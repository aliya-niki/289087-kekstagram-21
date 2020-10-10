'use strict';

const formUpload = document.querySelector(`#upload-file`);
const cancelUploadBtn = document.querySelector(`#upload-cancel`);
const imgUpload = document.querySelector(`.img-upload__overlay`);

const onUploadEscPress = function (evt) {
  if (evt.key === `Escape` && !hashtagInput.matches(`:focus`)) {
    evt.preventDefault();
    imgUpload.classList.add(`hidden`);
    document.body.classList.remove(`modal-open`);
  }
};

const openUpload = function () {
  imgUpload.classList.remove(`hidden`);
  document.body.classList.add(`modal-open`);

  document.addEventListener(`keydown`, onUploadEscPress);
};

const cancelUpload = function () {
  imgUpload.classList.add(`hidden`);
  document.body.classList.remove(`modal-open`);

  document.removeEventListener(`keydown`, onUploadEscPress);
};

formUpload.addEventListener(`change`, openUpload);
cancelUploadBtn.addEventListener(`click`, cancelUpload);

// Эффекты

const EFFECT_DEFAULT_VALUE = `100%`;
const effectLevel = document.querySelector(`.effect-level`);
const effectLevelPin = document.querySelector(`.effect-level__pin`);
const effectLevelLine = document.querySelector(`.effect-level__line`);
const effectLevelVal = document.querySelector(`.effect-level__depth`);
const effectRadioList = document.querySelector(`.effects`);

effectLevel.classList.add(`hidden`);

effectLevelPin.addEventListener(`mouseup`, function (evt) {
  evt.preventDefault();
  let effectValue = Math.round(100 * effectLevelPin.offsetLeft / effectLevelLine.offsetWidth) + `%`;
});

effectRadioList.addEventListener(`click`, function (evt) {
  let target = evt.target;
  if (target.matches(`.effects__radio`)) {
    effectLevelVal.style.width = EFFECT_DEFAULT_VALUE;
    effectLevelPin.style.left = EFFECT_DEFAULT_VALUE;
    effectLevel.classList.remove(`hidden`);
  }
  if (target.matches(`.effects__radio`) && target.matches(`#effect-none`)) {
    effectLevel.classList.add(`hidden`);
  }
});

// Хэштеги

const HASHTAGS_MAX_NUMBER = 5;
const REGEX_HASHTAGS = /^(#)[a-zA-Z0-9]{1,19}$/i;
const hashtagInput = document.querySelector(`.text__hashtags`);


hashtagInput.addEventListener(`input`, function () {
  let validityMessage = ``;
  let hashtags = [];

  hashtags = hashtagInput.value.split(/\s+/).filter(function (word) {
    return word !== ` ` && word !== ``;
  });

  if (hashtags.length > HASHTAGS_MAX_NUMBER) {
    validityMessage += `Не более 5 хэштегов. `;
  }

  for (let i = 0; i < hashtags.length; i++) {
    if (!REGEX_HASHTAGS.test(hashtags[i])) {
      validityMessage += `Неверный формат хэштега. `;
      break;
    }
  }

  for (let i = 0; i < hashtags.length; i++) {
    if (hashtags.indexOf(hashtags[i]) !== i) {
      validityMessage += `Хэштеги не должны повторяться. `;
      break;
    }
  }

  hashtagInput.setCustomValidity(validityMessage);
  hashtagInput.reportValidity();
});
