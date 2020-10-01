'use strict';

const renderComments = function (number) {
  function Comment(avatar, message, name) {
    this.avatar = avatar;
    this.message = message;
    this.name = name;
  }
  let comments = [];
  let commentMesasages = [`Всё отлично!`,
    `В целом всё неплохо. Но не всё.`,
    `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
    `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
    `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
    `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`];

  let commentsAuthors = [`Чубака`, `Рей`, `Кекс`, `Кайло`, `Люк`, `Йода`];

  for (let j = 0; j < number; j++) {
    let avatar = `img/avatar-${Math.round(Math.random() * 5) + 1}.svg`;
    let message = commentMesasages[(Math.round(Math.random() * 5))];
    let name = commentsAuthors[(Math.round(Math.random() * 5))];
    comments[j] = new Comment(avatar, message, name);
  }
  return comments;
};
let photos = [];
const renderPhotos = function (commentsNumber, times) {
  function Photo(url, description, likes, comments) {
    this.url = url;
    this.description = description;
    this.likes = likes;
    this.comments = comments;
  }
  for (let i = 0; i < times; i++) {
    let likesNumber = Math.round(Math.random() * 185) + 15;
    photos[i] = new Photo(`photos/${i + 1}.jpg`, ` `, likesNumber, renderComments(commentsNumber));
  }
  return photos;
};
let commentsNumber = 2;
renderPhotos(commentsNumber, 25);

const picturesContainer = document.querySelector(`.pictures`);
const pictureTemplate = document.querySelector(`#picture`)
    .content
    .querySelector(`.picture`);
const createPicture = function (photo) {
  let pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector(`.picture__img`).src = photo.url;
  pictureElement.querySelector(`.picture__img`).alt = photo.description;
  pictureElement.querySelector(`.picture__comments`).textContent = commentsNumber;
  pictureElement.querySelector(`.picture__likes`).textContent = photo.likes;
  return pictureElement;
};

const addPicture = function (times) {
  let fragment = document.createDocumentFragment();
  for (let i = 0; i < times; i++) {
    fragment.appendChild(createPicture(photos[i]));
  }
  picturesContainer.appendChild(fragment);
};
addPicture(25);
