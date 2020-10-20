'use strict';

(function () {
  const HASHTAGS_MAX_NUMBER = 5;
  const REGEX_HASHTAGS = /^(#)[a-zA-Z0-9]{1,19}$/i;

  const formUpload = document.querySelector(`#upload-file`);
  const cancelUploadBtn = document.querySelector(`#upload-cancel`);
  const imgUpload = document.querySelector(`.img-upload__overlay`);
  const hashtagInput = document.querySelector(`.text__hashtags`);
  const commentsInput = document.querySelector(`.text__description`);

  const onUploadEscPress = function (evt) {
    if (evt.key === `Escape` && !hashtagInput.matches(`:focus`) && !commentsInput.matches(`:focus`)) {
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
})();

