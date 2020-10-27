'use strict';

(function () {
  const getPicture = function (photo) {
    const pictureTemplate = document.querySelector(`#picture`)
        .content
        .querySelector(`.picture`);
    let pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector(`.picture__img`).src = photo.url;
    pictureElement.querySelector(`.picture__img`).alt = photo.description;
    pictureElement.querySelector(`.picture__comments`).textContent = photo.comments.length;
    pictureElement.querySelector(`.picture__likes`).textContent = photo.likes;
    return pictureElement;
  };

  const renderPicture = function (photos) {
    const picturesContainer = document.querySelector(`.pictures`);

    let fragment = document.createDocumentFragment();

    for (let i = 0; i < photos.length; i++) {
      const picture = getPicture(photos[i]);

      picture.addEventListener(`click`, function (evt) {
        evt.preventDefault();
        window.preview.openPreview(photos[i]);
      });

      fragment.appendChild(picture);
    }

    picturesContainer.appendChild(fragment);
  };

  window.gallery = {
    renderPicture: renderPicture
  };

})();
