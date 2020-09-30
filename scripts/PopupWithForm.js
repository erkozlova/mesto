import {Popup} from './Popup.js';

export class PopupWithForm extends Popup{
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submit = submitForm;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
  }
  // Получение всех значений инпутов формы
  _getInputValues() {
      this._formValues = {};
    
      this._inputList.forEach(input => {
        this._formValues[input.name] = input.value;
      });
    
      return this._formValues;
  }

  // Установка слушателей закрытия и сабмита 
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      this._submit(this._getInputValues());
    });
  }

  // Закрытие попапа и очищение всех полей формы при закрытии
  close() {
    this._inputList.forEach((input) => {
      input.value = '';
    })
    super.close();
  }
}