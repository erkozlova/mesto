 import {openPopup, popupPhoto, popupPhotoLink, popupPhotoSubtitile} from './index.js';

export class Card {
  constructor(data, cardSelector) {
    this._title = data.name;
    this._image = data.link;
    this._cardSelector = cardSelector;
  }

  // Создания шаблона карточки

  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .cloneNode(true);

    return cardElement;
  }

  // Появление/исчезновение лайка и удаление карточки

  _likeButton(evt) {

    evt.target.classList.toggle('elements__like_active');
  }

  _deleteButton(evt) {
    evt.target.closest('.elements__card').remove();
  }

  // Открытие попапа с полной картинкой

  _openFullImage() {
    openPopup(popupPhoto);
    popupPhotoLink.src = this._image;
    popupPhotoSubtitile.textContent = this._title;
  }

  // Подключение слушателей для карточки

  _setEventListeners() {

    this._element
    .querySelector('.elements__like')
    .addEventListener('click', (evt) => {this._likeButton(evt)});

    this._element
    .querySelector('.elements__delete')
    .addEventListener('click', (evt) => {this._deleteButton(evt)});

    this._element
    .querySelector('.elements__image')
    .addEventListener('click', () => {this._openFullImage()});
  }

  // Создание карточки

  generateCard() {
    this._element = this._getTemplate();

    this._element.querySelector('.elements__image').src = this._image;
    this._element.querySelector('.elements__place').textContent = this._title;

    this._setEventListeners();

    return this._element;
  }
}

