'use strict';

const MIN_LIKES_NUMBER = 15;
const MAX_LIKES_NUMBER = 200;
const AVATARS_AMOUNT = 6;
const COMMENTS_NUMBER = 2;
const PICTURES_NUMBER = 25;
const COMMENTS_CONTENT = [
  `Всё отлично!`,
  `В целом всё неплохо. Но не всё.`,
  `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
  `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
  `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`
];
const COMMENTS_AUTHORS = [`Чубака`, `Рей`, `Кекс`, `Кайло`, `Люк`, `Йода`];

const getRandomNumber = function (minNumber, maxNumber) {
  return (Math.round(Math.random() * (maxNumber - minNumber)) + minNumber);
};


const getComments = function () {
  const Comment = function (avatar, message, name) {
    this.avatar = avatar;
    this.message = message;
    this.name = name;
  };

  const comments = [];
  for (let j = 0; j < COMMENTS_NUMBER; j++) {
    const avatar = `img/avatar-${getRandomNumber(1, AVATARS_AMOUNT)}.svg`;
    const message = COMMENTS_CONTENT[getRandomNumber(0, COMMENTS_CONTENT.length - 1)];
    const name = COMMENTS_AUTHORS[getRandomNumber(0, COMMENTS_AUTHORS.length - 1)];
    comments.push(new Comment(avatar, message, name));
  }
  return comments;
};


const getPhotos = function (photosNumber) {
  const Photo = function (url, description, likes, comments) {
    this.url = url;
    this.description = description;
    this.likes = likes;
    this.comments = comments;
  };
  const photos = [];
  for (let i = 0; i < photosNumber; i++) {
    const likesNumber = getRandomNumber(MIN_LIKES_NUMBER, MAX_LIKES_NUMBER);
    const photoUrl = `photos/${i + 1}.jpg`;
    const photoDescription = ``;
    photos.push(new Photo(photoUrl, photoDescription, likesNumber, getComments()));
  }
  return photos;
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


const renderPicture = function (picturesNumber) {
  const picturesContainer = document.querySelector(`.pictures`);
  const photos = getPhotos(picturesNumber);

  let fragment = document.createDocumentFragment();
  for (let i = 0; i < picturesNumber; i++) {
    fragment.appendChild(getPicture(photos[i]));
  }

  picturesContainer.appendChild(fragment);
};


renderPicture(PICTURES_NUMBER);


// Показать первую фотографию из массива объектов в полноразмерном режиме
// и выводить дополнительную информацию о ней: описание, количество лайков, комментарии и т. д

const bigPicture = document.querySelector(`.big-picture`);
const bigPictureImg = bigPicture.querySelector(`.big-picture__img`);
const bigPictureDescription = bigPicture.querySelector(`.social__caption`);
const bigPictureLikes = bigPicture.querySelector(`.likes-count`);
const bigPictureComments = bigPicture.querySelector(`.social__comments`);
const bigPictureSocialCommentsCount = bigPicture.querySelector(`.social__comment-count`);
const bigPictureCommentsLoader = bigPicture.querySelector(`.comments-loader`);
const bigPictureCommentsCount = bigPicture.querySelector(`.comments-count`);

const photos = getPhotos(PICTURES_NUMBER);
const firstPicture = photos[0];

bigPicture.classList.remove(`hidden`);
bigPictureSocialCommentsCount.classList.add(`hidden`);
bigPictureCommentsLoader.classList.add(`hidden`);
document.body.classList.add(`modal-open`);

bigPictureImg.querySelector(`img`).src = firstPicture.url;
bigPictureLikes.textContent = firstPicture.likes;
bigPictureCommentsCount.textContent = firstPicture.comments.length;
bigPictureDescription.textContent = firstPicture.description;

for (let i = 0; i < COMMENTS_NUMBER; i++) {
  bigPictureComments.querySelectorAll(`.social__comment`)[i].querySelector(`img`).src = firstPicture.comments[i].avatar;
  bigPictureComments.querySelectorAll(`.social__comment`)[i].querySelector(`img`).alt = firstPicture.comments[i].name;
  bigPictureComments.querySelectorAll(`.social__comment`)[i].querySelector(`.social__text`).textContent = firstPicture.comments[i].message;
}

