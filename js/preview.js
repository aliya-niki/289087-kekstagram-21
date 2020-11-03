'use strict';

(function () {
  const preview = document.querySelector(`.big-picture`);
  const closePreviewButton = document.querySelector(`#picture-cancel`);
  const previewCommentsLoader = preview.querySelector(`.social__comments-loader`);
  const previewImg = preview.querySelector(`.big-picture__img`);
  const previewDescription = preview.querySelector(`.social__caption`);
  const previewLikes = preview.querySelector(`.likes-count`);
  const previewCommentsCount = preview.querySelector(`.comments-count`);
  const previewComments = preview.querySelector(`.social__comments`);
  const previewLoadedComments = preview.querySelector(`.comments-count--loaded`);
  let comments;

  const showComments = function () {
    const commentTemplate = document.querySelector(`#social-comment`)
          .content
          .querySelector(`.social__comment`);

    const renderComment = function (comment) {
      let newComment = commentTemplate.cloneNode(true);
      newComment.querySelector(`img`).src = comment.avatar;
      newComment.querySelector(`img`).alt = comment.name;
      newComment.querySelector(`.social__text`).textContent = comment.message;

      let fragment = document.createDocumentFragment();
      fragment.appendChild(newComment);

      previewComments.appendChild(fragment);
    };

    let currentLength = previewComments.querySelectorAll(`.social__comment`).length;

    for (let j = currentLength; j < Math.min(comments.length, currentLength + 5); j++) {
      renderComment(comments[j]);
    }

    previewLoadedComments.textContent = Math.min(comments.length, currentLength + 5);

    if (comments.length === previewComments.querySelectorAll(`.social__comment`).length) {
      previewCommentsLoader.removeEventListener(`click`, showComments);
      previewCommentsLoader.classList.add(`hidden`);
    }
  };

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

    previewCommentsLoader.removeEventListener(`click`, showComments);
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

    previewComments.querySelectorAll(`.social__comment`).forEach((n) => n.remove());

    closePreviewButton.addEventListener(`click`, closePreview);
    document.addEventListener(`keydown`, onPreviewEscPress);

    previewCommentsLoader.addEventListener(`click`, showComments);

    comments = photo.comments;
    showComments(comments);
  };

  window.preview = {
    openPreview: openPreview
  };
})();
