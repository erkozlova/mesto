export class Card {
  constructor(data, cardSelector, ownerId, handleCardClick , deleteButtonClick, putLikeClick, deleteLikeClick) {
    this._title = data.name;
    this._image = data.link;
    this._id = data._id;
    this._likes = data.likes;
    this._owner = data.owner;
    this._ownerId = ownerId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._deleteButtonClick = deleteButtonClick;
    this._putLikeClick = putLikeClick;
    this._deleteLikeClick = deleteLikeClick;
  }

  // Создания шаблона карточки

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.cloneNode(true);

    return cardElement;
  }

  _isLiked() {
    if(this._like.classList.contains('elements__like_active')){
      return true;
    }
    return false;
  }

  // Появление/исчезновение лайка и удаление карточки со страницы

  _likeButton() {
    this._like.classList.toggle("elements__like_active");
  }

  // Подключение слушателей для карточки

  _setEventListeners() {
    this._card = this._element.querySelector(".elements__card");

    this._like.addEventListener("click", () => {                       
      if(!this._isLiked()) {
        this._putLikeClick(this._id).then((data) => {
          this.setLikesInfo(data.likes);
        });
      } else {
        this._deleteLikeClick(this._id).then((data) => {
          this.setLikesInfo(data.likes);
        });
      }

    });
    
    this._deleteIcon = this._element.querySelector(".elements__delete");

    if(this._owner._id === this._ownerId) {
      this._deleteIcon
      .addEventListener("click", () => { 
        this._deleteButtonClick(this._card, this._id);
      });
    } else {
      this._deleteIcon.remove();
    }

    this._element
      .querySelector(".elements__image")
      .addEventListener("click", () => {
        this._handleCardClick();
      });
  }

  // Установка информации о лайке
  
  setLikesInfo(likes) {
    this._likesAmount.textContent = likes.length;
    this._likeButton();
  }

  // Создание карточки

  generateCard() {
    this._element = this._getTemplate();
    this._likesAmount = this._element.querySelector(".elements__amount");
    this._like = this._element.querySelector(".elements__like");
    

    this._element.querySelector(".elements__image").src = this._image;
    this._element.querySelector(".elements__place").textContent = this._title;
    if(this._likes === undefined) {
      this._likesAmount.textContent = 0;
    } else {
      this._likesAmount.textContent = this._likes.length;
    }

    if(this._likes === undefined) {
      this._likes = [];
    }

    this._likesId = [];
    this._likes.forEach((like) => {
      this._likesId.push(like._id);
    })

    if(this._likesId.includes(this._ownerId)) {
      this._like.classList.add("elements__like_active");
    }

    this._setEventListeners();

    return this._element;
  }
}
