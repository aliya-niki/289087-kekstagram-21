'use strict';

(function () {
  const MIN_LIKES_NUMBER = 15;
  const MAX_LIKES_NUMBER = 200;
  const COMMENTS_NUMBER = 2;
  const AVATARS_NUMBER = 6;
  const COMMENTS_CONTENTS = [
    `Всё отлично!`,
    `В целом всё неплохо. Но не всё.`,
    `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
    `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
    `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
    `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`
  ];
  const COMMENTS_AUTHORS = [`Чубака`, `Рей`, `Кекс`, `Кайло`, `Люк`, `Йода`];

  const getComments = function () {
    const Comment = function (avatar, message, name) {
      this.avatar = avatar;
      this.message = message;
      this.name = name;
    };

    let comments = [];
    for (let j = 0; j < COMMENTS_NUMBER; j++) {
      let avatar = `img/avatar-${window.util.getRandomNumber(1, AVATARS_NUMBER)}.svg`;
      let message = window.util.getRandomElement(COMMENTS_CONTENTS);
      let name = window.util.getRandomElement(COMMENTS_AUTHORS);
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

    let photos = [];
    for (let i = 0; i < photosNumber; i++) {
      const likesNumber = window.util.getRandomNumber(MIN_LIKES_NUMBER, MAX_LIKES_NUMBER);
      const photoUrl = `photos/${i + 1}.jpg`;
      const photoDescription = ``;
      photos.push(new Photo(photoUrl, photoDescription, likesNumber, getComments()));
    }
    return photos;
  };

  window.data = {
    getPhotos: getPhotos
  };
})();
