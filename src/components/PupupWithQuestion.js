import {Popup} from './Popup.js';

export class PopupWithQuestion extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._agreeButton = this._popup.querySelector('.popup__agree');
    this._submit = submitForm;
  }

  open(card, cardId) {
    super.open();
    this._card = card;
    this._id = cardId;
  }

  setEventListeners() {
    super.setEventListeners();
    this._agreeButton.addEventListener('click', () => {
      this._submit(this._id, this._card, this);
    });
  }
}