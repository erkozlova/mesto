const escKeyCode = 27;

export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  // Закрытие попапа по ESC
  _handleEscClose(evt) {
    if(evt.keyCode === escKeyCode) {
      const openedPopup = new Popup('.popup_opened');
      openedPopup.close();
    }
  }
  // Открытие и закрытие попапов 
  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  // Добавление слушателя закрытия кликом на крестик
  setEventListeners() {
    this._popup.querySelector(".popup__close").addEventListener('click', () => {
      this.close();});
  }
}