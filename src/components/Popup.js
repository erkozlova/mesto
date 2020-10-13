import {ESC_KEY_CODE} from "../utils/constants.js";

export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  // Закрытие попапа по ESC
  _handleEscClose(evt) {
    if (evt.keyCode === ESC_KEY_CODE) {
      this.close();
    }
  }
  // Открытие и закрытие попапов
  open() {
    this._popup.classList.add("popup_opened");
    this._escClose = this._handleEscClose.bind(this);
    document.addEventListener("keydown", this._escClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._escClose);
  }

  // Закрытие попапа кликом на оверлей
  _closePopupOverlay(evt) {
    if (
      !this._popup.querySelector(".popup__wrapper").contains(evt.target)
    ) {
      this.close();
    }
  }

  // Добавление слушателя закрытия кликом на крестик
  setEventListeners() {
    this._popup.querySelector(".popup__close").addEventListener("click", () => {
      this.close();
    });

    this._popup.addEventListener("click", this._closePopupOverlay.bind(this));
  }
}
