'use strict';

(function () {
  const preview = document.querySelector(`.big-picture`);
  const previewImg = preview.querySelector(`.big-picture__img`);
  const previewDescription = preview.querySelector(`.social__caption`);
  const previewLikes = preview.querySelector(`.likes-count`);
  const previewComments = preview.querySelector(`.social__comments`);
  const previewSocialCommentsCount = preview.querySelector(`.social__comment-count`);
  const previewCommentsLoader = preview.querySelector(`.comments-loader`);
  const previewCommentsCount = preview.querySelector(`.comments-count`);

  const closePreviewBtn = document.querySelector(`#picture-cancel`);

  const onPreviewEscPress = function (evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      closePreview();
    }
  };

  const closePreview = function () {
    preview.classList.add(`hidden`);
    document.body.classList.remove(`modal-open`);

    document.removeEventListener(`keydown`, onPreviewEscPress);
    closePreviewBtn.removeEventListener(`click`, closePreview);
  };

  const openPreview = function (photo) {
    preview.classList.remove(`hidden`);
    document.body.classList.add(`modal-open`);

    previewSocialCommentsCount.classList.add(`hidden`);
    previewCommentsLoader.classList.add(`hidden`);

    previewImg.querySelector(`img`).src = photo.url;
    previewLikes.textContent = photo.likes;
    previewCommentsCount.textContent = photo.comments.length;
    previewDescription.textContent = photo.description;

    for (let i = 0; i < photo.comments.length; i++) {
      previewComments.querySelectorAll(`.social__comment`)[i].querySelector(`img`).src = photo.comments[i].avatar;
      previewComments.querySelectorAll(`.social__comment`)[i].querySelector(`img`).alt = photo.comments[i].name;
      previewComments.querySelectorAll(`.social__comment`)[i].querySelector(`.social__text`).textContent = photo.comments[i].message;
    }

    closePreviewBtn.addEventListener(`click`, closePreview);
    document.addEventListener(`keydown`, onPreviewEscPress);
  };

  window.preview = {
    openPreview: openPreview
  };
})();
