'use strict';

const DEFAULT_IMG_SCALE = 100;
const HASHTAGS_MAX_NUMBER = 5;
const REGEX_HASHTAGS = /^(#)[a-zA-Zа-яА-ЯёЁ0-9]{1,19}$/i;
const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
const fileUploadInput = document.querySelector(`#upload-file`);
const cancelUploadButton = document.querySelector(`#upload-cancel`);
const imgUpload = document.querySelector(`.img-upload__overlay`);
const imgPreview = document.querySelector(`.img-upload__preview img`);
const imgEffectPreviews = document.querySelectorAll(`.effects__preview`);
const commentsInput = document.querySelector(`.text__description`);
const hashtagInput = document.querySelector(`.text__hashtags`);
const imgUploadForm = document.querySelector(`#upload-select-image`);
const effectRadioList = document.querySelector(`.effects`);
const effectLevelPin = document.querySelector(`.effect-level__pin`);
const scaleSmallerButton = document.querySelector(`.scale__control--smaller`);
const scaleBiggerButton = document.querySelector(`.scale__control--bigger`);
const main = document.querySelector(`main`);

const clearForm = () => {
  fileUploadInput.value = ``;
  window.effects.setDefault();
  window.imgScale.changeValues(imgPreview, DEFAULT_IMG_SCALE);
  hashtagInput.value = ``;
  commentsInput.value = ``;
  hashtagInput.setCustomValidity(``);
};

const closeFormHandler = () => {
  imgUpload.classList.add(`hidden`);
  document.body.classList.remove(`modal-open`);

  clearForm();

  document.removeEventListener(`keydown`, formEscPressHandler);
  cancelUploadButton.removeEventListener(`click`, closeFormHandler);
  imgUploadForm.removeEventListener(`submit`, submitHandler);
  hashtagInput.removeEventListener(`input`, hashtagInputHandler);
  scaleSmallerButton.removeEventListener(`click`, window.imgScale.setSmallerHandler);
  scaleBiggerButton.removeEventListener(`click`, window.imgScale.setBiggerHandler);
  effectLevelPin.removeEventListener(`mousedown`, window.effects.mouseDownHandler);
  effectRadioList.removeEventListener(`click`, window.effects.typeChangeHandler);
};

const formEscPressHandler = (evt) => {
  if (window.utils.isEscEvent(evt) &&
        !hashtagInput.matches(`:focus`) &&
        !commentsInput.matches(`:focus`) &&
        !document.contains(document.querySelector(`.error`))) {
    evt.preventDefault();
    closeFormHandler();
  }
};

const openFormHandler = () => {
  imgUpload.classList.remove(`hidden`);
  document.body.classList.add(`modal-open`);

  let file = fileUploadInput.files[0];
  let fileName = file.name.toLowerCase();
  let matches = FILE_TYPES.some((ending) => {
    return fileName.endsWith(ending);
  });
  if (matches) {
    let reader = new FileReader();

    reader.addEventListener(`load`, () => {
      imgPreview.src = reader.result;
      imgEffectPreviews.forEach((effectPreview) => {
        effectPreview.style.backgroundImage = `url(` + reader.result + `)`;
      });
    });

    reader.readAsDataURL(file);
  }

  document.addEventListener(`keydown`, formEscPressHandler);
  cancelUploadButton.addEventListener(`click`, closeFormHandler);
  imgUploadForm.addEventListener(`submit`, submitHandler);
  hashtagInput.addEventListener(`input`, hashtagInputHandler);
  scaleSmallerButton.addEventListener(`click`, window.imgScale.setSmallerHandler);
  scaleBiggerButton.addEventListener(`click`, window.imgScale.setBiggerHandler);
  effectLevelPin.addEventListener(`mousedown`, window.effects.mouseDownHandler);
  effectRadioList.addEventListener(`click`, window.effects.typeChangeHandler);
};

const hashtagInputHandler = () => {
  let validityMessage = ``;
  let hashtags = hashtagInput.value.split(/\s+/).filter((word) => {
    return word !== ` ` && word !== ``;
  });

  if (hashtags.length > HASHTAGS_MAX_NUMBER) {
    validityMessage += `Не более 5 хэштегов. `;
  }

  for (let i = 0; i < hashtags.length; i++) {
    if (!REGEX_HASHTAGS.test(hashtags[i])) {
      validityMessage += `Неверный формат: начинайте с # и используйте только буквы и цифры, всего до 20 символов`;
      break;
    }
  }

  for (let i = 0; i < hashtags.length; i++) {
    if (hashtags.slice().map((hashtag) => {
      return hashtag.toLowerCase();
    }).indexOf(hashtags[i].toLowerCase()) !== i) {
      validityMessage += `Хэштеги не должны повторяться. `;
      break;
    }
  }

  hashtagInput.setCustomValidity(validityMessage);
  hashtagInput.reportValidity();
};

const renderMessage = (messageTemplate) => {
  let message = messageTemplate.cloneNode(true);
  let fragment = document.createDocumentFragment();
  fragment.appendChild(message);
  main.appendChild(fragment);
  message.style.zIndex = `2`;

  const closeButton = message.querySelector(`button`);

  const removeMessageHandler = () => {
    message.remove();
    document.removeEventListener(`keydown`, messageEscPressHandler);
    document.removeEventListener(`click`, closeHandler);
  };

  const messageEscPressHandler = (evt) => {
    if (window.utils.isEscEvent(evt)) {
      removeMessageHandler();
    }
  };

  const closeHandler = (evt) => {
    if (evt.target.matches(`section`)) {
      removeMessageHandler();
    }
  };

  document.addEventListener(`keydown`, messageEscPressHandler);
  document.addEventListener(`click`, closeHandler);
  closeButton.addEventListener(`click`, removeMessageHandler);
};

const errorHandler = () => {
  const errorMessageTemplate = document.querySelector(`#error`)
          .content
          .querySelector(`.error`);

  renderMessage(errorMessageTemplate);
};

const successHandler = () => {
  imgUpload.classList.add(`hidden`);
  document.body.classList.remove(`modal-open`);

  const successMessageTemplate = document.querySelector(`#success`)
          .content
          .querySelector(`.success`);

  renderMessage(successMessageTemplate);
  clearForm();
};

const submitHandler = (evt) => {
  window.upload.sendData(new FormData(imgUploadForm), successHandler, errorHandler);
  evt.preventDefault();
};

fileUploadInput.addEventListener(`change`, openFormHandler);

