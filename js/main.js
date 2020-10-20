'use strict';

(function () {
  const PICTURES_NUMBER = 25;

  let photos = window.data.getPhotos(PICTURES_NUMBER);

  window.gallery.renderPicture(photos);
})();
