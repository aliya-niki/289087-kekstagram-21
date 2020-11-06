'use strict';

(function () {
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

  const closeForm = () => {
    imgUpload.classList.add(`hidden`);
    document.body.classList.remove(`modal-open`);

    clearForm();

    document.removeEventListener(`keydown`, onFormEscPress);
    cancelUploadButton.removeEventListener(`click`, closeForm);
    imgUploadForm.removeEventListener(`submit`, submitHandler);
    hashtagInput.removeEventListener(`input`, hashtagInputHandler);
    scaleSmallerButton.removeEventListener(`click`, window.imgScale.setSmaller);
    scaleBiggerButton.removeEventListener(`click`, window.imgScale.setBigger);
    effectLevelPin.removeEventListener(`mousedown`, window.effects.onMouseDown);
    effectRadioList.removeEventListener(`click`, window.effects.changeType);
  };

  const onFormEscPress = (evt) => {
    if (evt.key === window.utils.ESC_KEY &&
        !hashtagInput.matches(`:focus`) &&
        !commentsInput.matches(`:focus`) &&
        !document.contains(document.querySelector(`.error`))) {
      evt.preventDefault();
      closeForm();
    }
  };

  const openForm = () => {
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

    document.addEventListener(`keydown`, onFormEscPress);
    cancelUploadButton.addEventListener(`click`, closeForm);
    imgUploadForm.addEventListener(`submit`, submitHandler);
    hashtagInput.addEventListener(`input`, hashtagInputHandler);
    scaleSmallerButton.addEventListener(`click`, window.imgScale.setSmaller);
    scaleBiggerButton.addEventListener(`click`, window.imgScale.setBigger);
    effectLevelPin.addEventListener(`mousedown`, window.effects.onMouseDown);
    effectRadioList.addEventListener(`click`, window.effects.changeType);
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
        validityMessage += `Неверный формат хэштега. `;
        break;
      }
    }

    for (let i = 0; i < hashtags.length; i++) {
      if (hashtags.indexOf(hashtags[i].toLowerCase) !== i) {
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

    const removeMessage = () => {
      message.remove();
      document.removeEventListener(`keydown`, onMessageEscPress);
      document.removeEventListener(`click`, closeHandler);
    };

    const onMessageEscPress = (evt) => {
      window.utils.isEscEvent(evt, removeMessage);
    };

    const closeHandler = (evt) => {
      if (evt.target.matches(`section`)) {
        removeMessage();
      }
    };

    document.addEventListener(`keydown`, onMessageEscPress);
    document.addEventListener(`click`, closeHandler);
    closeButton.addEventListener(`click`, removeMessage);
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

  fileUploadInput.addEventListener(`change`, openForm);
})();
