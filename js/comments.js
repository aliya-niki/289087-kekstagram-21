'use strict';

(function () {
  const preview = document.querySelector(`.big-picture`);
  const previewComments = preview.querySelector(`.social__comments`);
  const previewCommentsLoader = preview.querySelector(`.social__comments-loader`);
  const previewLoadedComments = preview.querySelector(`.comments-count--loaded`);

  const showComments = function (photo) {
    previewComments.querySelectorAll(`.social__comment`).forEach((n) => n.remove());

    const commentTemplate = document.querySelector(`#social-comment`)
          .content
          .querySelector(`.social__comment`);

    const renderComment = function (index) {
      let newComment = commentTemplate.cloneNode(true);
      newComment.querySelector(`img`).src = photo.comments[index].avatar;
      newComment.querySelector(`img`).alt = photo.comments[index].name;
      newComment.querySelector(`.social__text`).textContent = photo.comments[index].message;

      let fragment = document.createDocumentFragment();
      fragment.appendChild(newComment);

      previewComments.appendChild(fragment);
    };

    for (let i = 0; i < Math.min(photo.comments.length, 5); i++) {
      renderComment(i);
    }
    previewLoadedComments.textContent = Math.min(photo.comments.length, 5);

    const loadMoreComments = function (evt) {
      evt.preventDefault();

      let currentLength = previewComments.querySelectorAll(`.social__comment`).length;
      for (let j = currentLength; j < Math.min(photo.comments.length, currentLength + 5); j++) {
        renderComment(j);
      }
      previewLoadedComments.textContent = Math.min(photo.comments.length, currentLength + 5);

      if (previewComments.querySelectorAll(`.social__comment`).length === photo.comments.length) {
        previewCommentsLoader.removeEventListener(`click`, loadMoreComments);
        previewCommentsLoader.classList.add(`hidden`);
      }
    };

    previewCommentsLoader.addEventListener(`click`, loadMoreComments);

    if (photo.comments.length === previewComments.querySelectorAll(`.social__comment`).length) {
      previewCommentsLoader.classList.add(`hidden`);
    }

    window.comments.loadMoreComments = loadMoreComments;
  };

  window.comments = {
    showComments: showComments
  };

})();
