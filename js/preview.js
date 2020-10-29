'use strict';

(function () {
  const preview = document.querySelector(`.big-picture`);
  const closePreviewButton = document.querySelector(`#picture-cancel`);
  const previewCommentsLoader = preview.querySelector(`.social__comments-loader`);
  const previewImg = preview.querySelector(`.big-picture__img`);
  const previewDescription = preview.querySelector(`.social__caption`);
  const previewLikes = preview.querySelector(`.likes-count`);
  const previewCommentsCount = preview.querySelector(`.comments-count`);

  const onPreviewEscPress = function (evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      closePreview();
    }
  };

  const closePreview = function () {
    preview.classList.add(`hidden`);
    document.body.classList.remove(`modal-open`);
    previewCommentsLoader.classList.remove(`hidden`);

    previewCommentsLoader.removeEventListener(`click`, window.comments.loadMoreComments);
    document.removeEventListener(`keydown`, onPreviewEscPress);
    closePreviewButton.removeEventListener(`click`, closePreview);
  };

  const openPreview = function (photo) {
    preview.classList.remove(`hidden`);
    document.body.classList.add(`modal-open`);

    previewImg.querySelector(`img`).src = photo.url;
    previewLikes.textContent = photo.likes;
    previewCommentsCount.textContent = photo.comments.length;
    previewDescription.textContent = photo.description;

    closePreviewButton.addEventListener(`click`, closePreview);
    document.addEventListener(`keydown`, onPreviewEscPress);

    window.comments.showComments(photo);
  };

  window.preview = {
    openPreview: openPreview
  };
})();
