'use strict';

(function () {
  const onLoadRenderPictures = function (photos) {
    renderPictures(photos);
    showFilters(photos);
  };

  const renderPictures = function (photos) {
    const picturesContainer = document.querySelector(`.pictures`);

    picturesContainer.querySelectorAll(`.picture`).forEach((n) => n.remove());

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

  const showFilters = function (photos) {
    const galleryFilter = document.querySelector(`.img-filters`);
    const galleryFilterButtons = document.querySelectorAll(`.img-filters__button`);

    galleryFilter.classList.remove(`img-filters--inactive`);

    const filterGallery = function (evt) {
      evt.preventDefault();
      let target = evt.target;

      const sortByComments = function (a, b) {
        return b.comments.length - a.comments.length;
      };

      if (target.matches(`.img-filters__button`)) {
        galleryFilterButtons.forEach((n) => n.classList.remove(`img-filters__button--active`));

        target.classList.add(`img-filters__button--active`);
        switch (target.id) {
          case `filter-random` :
            let randomTenPhotos = window.utils.shuffleArray(photos).slice(0, 10);
            renderPictures(randomTenPhotos);
            break;
          case `filter-discussed` :
            let discussedPhotos = photos.slice().sort(sortByComments);
            renderPictures(discussedPhotos);
            break;
          default:
            renderPictures(photos);
            break;
        }
      }
    };

    galleryFilter.addEventListener(`click`, window.utils.debounce(filterGallery));
  };

  window.gallery = {
    onLoadRenderPictures: onLoadRenderPictures
  };
})();
