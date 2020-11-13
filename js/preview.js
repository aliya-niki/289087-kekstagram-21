'use strict';

const NEW_COMMENTS_MAX_NUMBER = 5;
const preview = document.querySelector(`.big-picture`);
const closePreviewButton = document.querySelector(`#picture-cancel`);
const previewCommentsLoader = preview.querySelector(`.social__comments-loader`);
const previewImg = preview.querySelector(`.big-picture__img`);
const previewDescription = preview.querySelector(`.social__caption`);
const previewLikes = preview.querySelector(`.likes-count`);
const previewCommentsCount = preview.querySelector(`.comments-count`);
const previewComments = preview.querySelector(`.social__comments`);
const previewLoadedComments = preview.querySelector(`.comments-count--loaded`);
const commentTemplate = document.querySelector(`#social-comment`)
        .content
        .querySelector(`.social__comment`);
let comments;

const renderComment = (comment) => {
  let newComment = commentTemplate.cloneNode(true);
  newComment.querySelector(`img`).src = comment.avatar;
  newComment.querySelector(`img`).alt = comment.name;
  newComment.querySelector(`.social__text`).textContent = comment.message;

  let fragment = document.createDocumentFragment();
  fragment.appendChild(newComment);

  previewComments.appendChild(fragment);
};

const showCommentsHandler = () => {
  let currentLength = previewComments.querySelectorAll(`.social__comment`).length;

  for (let j = currentLength; j < Math.min(comments.length, currentLength + NEW_COMMENTS_MAX_NUMBER); j++) {
    renderComment(comments[j]);
  }

  previewLoadedComments.textContent = Math.min(comments.length, currentLength + NEW_COMMENTS_MAX_NUMBER);

  if (comments.length === previewComments.querySelectorAll(`.social__comment`).length) {
    previewCommentsLoader.removeEventListener(`click`, showCommentsHandler);
    previewCommentsLoader.classList.add(`hidden`);
  }
};

const previewEscHandler = (evt) => {
  if (window.utils.isEscEvent(evt)) {
    closePreviewHandler();
  }
};

const closePreviewHandler = () => {
  preview.classList.add(`hidden`);
  document.body.classList.remove(`modal-open`);
  previewCommentsLoader.classList.remove(`hidden`);

  previewCommentsLoader.removeEventListener(`click`, showCommentsHandler);
  document.removeEventListener(`keydown`, previewEscHandler);
  closePreviewButton.removeEventListener(`click`, closePreviewHandler);
};

const openPreview = (photo) => {
  preview.classList.remove(`hidden`);
  document.body.classList.add(`modal-open`);

  previewImg.querySelector(`img`).src = photo.url;
  previewLikes.textContent = photo.likes;
  previewCommentsCount.textContent = photo.comments.length;
  previewDescription.textContent = photo.description;

  previewComments.querySelectorAll(`.social__comment`).forEach((comment) => {
    comment.remove();
  });

  closePreviewButton.addEventListener(`click`, closePreviewHandler);
  document.addEventListener(`keydown`, previewEscHandler);

  previewCommentsLoader.addEventListener(`click`, showCommentsHandler);

  comments = photo.comments;
  showCommentsHandler(comments);
};

window.preview = {
  open: openPreview
};

