'use strict';

(function () {
  const DEFAULT_IMG_SCALE = 100;
  const HASHTAGS_MAX_NUMBER = 5;
  const REGEX_HASHTAGS = /^(#)[a-zA-Z0-9]{1,19}$/i;
  const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
  const fileUploadInput = document.querySelector(`#upload-file`);
  const cancelUploadButton = document.querySelector(`#upload-cancel`);
  const imgUpload = document.querySelector(`.img-upload__overlay`);
  const imgPreview = document.querySelector(`.img-upload__preview`);
  const imgEffectPreviews = document.querySelectorAll(`.effects__preview`);
  const commentsInput = document.querySelector(`.text__description`);
  const hashtagInput = document.querySelector(`.text__hashtags`);
  const imgUploadForm = document.querySelector(`#upload-select-image`);
  const main = document.querySelector(`main`);

  const clearForm = function () {
    fileUploadInput.value = ``;
    window.effects.setDefaultEffect();
    window.imgScale.changeScaleValues(imgPreview, DEFAULT_IMG_SCALE);
    hashtagInput.value = ``;
    commentsInput.value = ``;
    hashtagInput.setCustomValidity(``);
  };

  const closeForm = function () {
    imgUpload.classList.add(`hidden`);
    document.body.classList.remove(`modal-open`);

    document.removeEventListener(`keydown`, onFormEscPress);
    cancelUploadButton.removeEventListener(`click`, cancelFileUpload);
    clearForm();
  };

  const onFormEscPress = function (evt) {
    if (evt.key === `Escape` &&
        !hashtagInput.matches(`:focus`) &&
        !commentsInput.matches(`:focus`) &&
        !document.contains(document.querySelector(`.error`))) {
      evt.preventDefault();
      closeForm();
    }
  };

  const cancelFileUpload = function () {
    closeForm();
  };

  const openForm = function () {
    imgUpload.classList.remove(`hidden`);
    document.body.classList.add(`modal-open`);

    let file = fileUploadInput.files[0];
    let fileName = file.name.toLowerCase();
    let matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      let reader = new FileReader();

      reader.addEventListener(`load`, function () {
        imgPreview.querySelector(`img`).src = reader.result;
        imgEffectPreviews.forEach(function (n) {
          n.style.backgroundImage = `url(` + reader.result + `)`;
        });
      });

      reader.readAsDataURL(file);
    }

    document.addEventListener(`keydown`, onFormEscPress);
    cancelUploadButton.addEventListener(`click`, cancelFileUpload);
  };

  fileUploadInput.addEventListener(`change`, openForm);

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


  const errorHandler = function () {
    const errorMessageTemplate = document.querySelector(`#error`)
          .content
          .querySelector(`.error`);
    let errorMessage = errorMessageTemplate.cloneNode(true);
    let fragment = document.createDocumentFragment();
    fragment.appendChild(errorMessage);
    main.appendChild(fragment);
    errorMessage.style.zIndex = `2`;

    const errorCloseButton = errorMessage.querySelector(`.error__button`);

    const onMessageEscPress = function (evt) {
      if (evt.key === `Escape`) {
        errorMessage.remove();
      }
      document.removeEventListener(`keydown`, onMessageEscPress);
    };

    const closeHandler = function (evt) {
      if (evt.target.matches(`section.error`)) {
        errorMessage.remove();
      }
      document.removeEventListener(`click`, closeHandler);
    };

    document.addEventListener(`keydown`, onMessageEscPress);
    document.addEventListener(`click`, closeHandler);
    errorCloseButton.addEventListener(`click`, function () {
      errorMessage.remove();
    });
  };

  const successHandler = function () {
    imgUpload.classList.add(`hidden`);
    document.body.classList.remove(`modal-open`);

    const successMessageTemplate = document.querySelector(`#success`)
          .content
          .querySelector(`.success`);
    let successMessage = successMessageTemplate.cloneNode(true);
    let fragment = document.createDocumentFragment();
    fragment.appendChild(successMessage);
    main.appendChild(fragment);

    const successCloseBtn = successMessage.querySelector(`.success__button`);

    const onMessageEscPress = function (evt) {
      if (evt.key === `Escape`) {
        successMessage.remove();
      }
      document.removeEventListener(`keydown`, onMessageEscPress);
    };

    const closeHandler = function (evt) {
      if (evt.target.matches(`section.success`)) {
        successMessage.remove();
      }
      document.removeEventListener(`click`, closeHandler);
    };

    clearForm();

    document.addEventListener(`keydown`, onMessageEscPress);
    document.addEventListener(`click`, closeHandler);
    successCloseBtn.addEventListener(`click`, function () {
      successMessage.remove();
    });
  };

  const submitHandler = function (evt) {
    window.upload.upload(new FormData(imgUploadForm), successHandler, errorHandler);
    evt.preventDefault();
  };

  imgUploadForm.addEventListener(`submit`, submitHandler);

})();
