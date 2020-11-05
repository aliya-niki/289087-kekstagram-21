'use strict';

(function () {
  const picturesContainer = document.querySelector(`.pictures`);
  const pictureTemplate = document.querySelector(`#picture`)
        .content
        .querySelector(`.picture`);
  const galleryFilter = document.querySelector(`.img-filters`);
  const galleryFilterButtons = document.querySelectorAll(`.img-filters__button`);
  let photos;

  const onLoadRenderPictures = (data) => {
    photos = data;

    photos.map((photo, index) => {
      photo.index = `${index}`;
    });

    picturesContainer.addEventListener(`click`, (evt) => {
      let target = evt.target;
      if (target.matches(`.picture img`)) {
        evt.preventDefault();
        let index = target.closest(`.picture`).dataset.index;
        window.preview.open(photos[index]);
      }
    });

    renderPictures(photos);
    showFilters();
  };

  const renderPictures = (anyPhotos) => {
    picturesContainer.querySelectorAll(`.picture`).forEach((picture) => {
      return picture.remove();
    });

    let fragment = document.createDocumentFragment();

    anyPhotos.forEach((photo) => {
      const picture = getPicture(photo);
      fragment.appendChild(picture);
    });

    picturesContainer.appendChild(fragment);
  };

  const getPicture = (photo) => {
    let pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector(`.picture__img`).src = photo.url;
    pictureElement.querySelector(`.picture__img`).alt = photo.description;
    pictureElement.querySelector(`.picture__comments`).textContent = photo.comments.length;
    pictureElement.querySelector(`.picture__likes`).textContent = photo.likes;
    pictureElement.dataset.index = photo.index;
    return pictureElement;
  };

  const sortByComments = (left, right) => {
    return right.comments.length - left.comments.length;
  };

  const filterGallery = (evt) => {
    evt.preventDefault();
    let target = evt.target;

    if (target.matches(`.img-filters__button`)) {
      galleryFilterButtons.forEach((element) => {
        element.classList.remove(`img-filters__button--active`);
      });

      target.classList.add(`img-filters__button--active`);
      switch (target.id) {
        case `filter-random` :
          let randomTenPhotos = window.utils.shuffle(photos).slice(0, 10);
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

  const showFilters = () => {
    galleryFilter.classList.remove(`img-filters--inactive`);

    galleryFilter.addEventListener(`click`, window.utils.debounce(filterGallery));
  };

  window.gallery = {
    onLoadRenderPictures
  };
})();
