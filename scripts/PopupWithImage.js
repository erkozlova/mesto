import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  // Открытие попапа и вставка изначальных данных автора
  open(image) {
    super.open();
    this._popup.querySelector(".popup__fullimage").src = image.link;
    this._popup.querySelector(".popup__subtitle").textContent = image.name;
  }
}