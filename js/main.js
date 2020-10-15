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

// Загрузка изображения и показ формы редактирования

const formUpload = document.querySelector(`#upload-file`);
const cancelUploadBtn = document.querySelector(`#upload-cancel`);
const imgUpload = document.querySelector(`.img-upload__overlay`);

const onUploadEscPress = function (evt) {
  if (evt.key === `Escape` && !hashtagInput.matches(`:focus`)) {
    evt.preventDefault();
    imgUpload.classList.add(`hidden`);
    document.body.classList.remove(`modal-open`);
  }
};

const openUpload = function () {
  imgUpload.classList.remove(`hidden`);
  document.body.classList.add(`modal-open`);

  document.addEventListener(`keydown`, onUploadEscPress);
};

const cancelUpload = function () {
  imgUpload.classList.add(`hidden`);
  document.body.classList.remove(`modal-open`);

  document.removeEventListener(`keydown`, onUploadEscPress);
};

formUpload.addEventListener(`change`, openUpload);
cancelUploadBtn.addEventListener(`click`, cancelUpload);

// Эффекты

const EFFECT_DEFAULT_VALUE = `100%`;
const effectLevel = document.querySelector(`.effect-level`);
const effectLevelPin = document.querySelector(`.effect-level__pin`);
const effectLevelLine = document.querySelector(`.effect-level__line`);
const effectLevelVal = document.querySelector(`.effect-level__depth`);
const effectRadioList = document.querySelector(`.effects`);

effectLevel.classList.add(`hidden`);

effectLevelPin.addEventListener(`mouseup`, function (evt) {
  evt.preventDefault();
  let effectValue = Math.round(100 * effectLevelPin.offsetLeft / effectLevelLine.offsetWidth) + `%`;
});

effectRadioList.addEventListener(`click`, function (evt) {
  let target = evt.target;
  if (target.matches(`.effects__radio`)) {
    effectLevelVal.style.width = EFFECT_DEFAULT_VALUE;
    effectLevelPin.style.left = EFFECT_DEFAULT_VALUE;
    effectLevel.classList.remove(`hidden`);
  }
  if (target.matches(`.effects__radio`) && target.matches(`#effect-none`)) {
    effectLevel.classList.add(`hidden`);
  }
});

// Хэштеги

const HASHTAGS_MAX_NUMBER = 5;
const REGEX_HASHTAGS = /^(#)[a-zA-Z0-9]{1,19}$/i;
const hashtagInput = document.querySelector(`.text__hashtags`);


hashtagInput.addEventListener(`input`, function () {
  let validityMessage = ``;
  let hashtags = [];

  hashtags = hashtagInput.value.split(/\s+/).filter(function (word) {
    return word !== ` ` && word !== ``;
  });

  if (hashtags.length > HASHTAGS_MAX_NUMBER) {
    validityMessage += `Не более 5 хэштегов. `;
  }

  for (let i = 0; i < hashtags.length; i++) {
    if (!REGEX_HASHTAGS.test(hashtags[i])) {
      validityMessage += `Неверный формат хэштега. `;
      break;
    }
  }

  for (let i = 0; i < hashtags.length; i++) {
    if (hashtags.indexOf(hashtags[i]) !== i) {
      validityMessage += `Хэштеги не должны повторяться. `;
      break;
    }
  }

  hashtagInput.setCustomValidity(validityMessage);
  hashtagInput.reportValidity();
});
