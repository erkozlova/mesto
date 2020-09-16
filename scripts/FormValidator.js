import {popupEditForm, popupAddForm, formSubmitHandler, formSubmitAddition, addElement} from './index.js';

export class FormValidator {
  constructor(obj, formElement) {
    this._obj = obj;
    this._formElement = formElement;
  }

  // Добавления сообщения ошибки

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._obj.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._obj.errorClass);
  }

  // Удаления сообщения об ошибке

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._obj.inputErrorClass);
    errorElement.classList.remove(this._obj.errorClass);
    errorElement.textContent = '';
  }

  // Проверка валидности инпутов для сообщения о ошибке

  _checkInputValidaty(inputElement) {
    if(!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // Проверка валидности инпутов для статуса кнопки

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  // Метод статуса активности кнопки

  _toggleButtonState(buttonElement) {
    if(this._hasInvalidInput()) {
      buttonElement.classList.add(this._obj.inactiveButtonClass);
    } else {
      buttonElement.classList.remove(this._obj.inactiveButtonClass);
    }
  }

  // Метод вызова функций сабмита

  _setFormSubmit(evt) {
    evt.preventDefault();
      if(!this._hasInvalidInput())
      {
        if(this._formElement === popupEditForm) {
          formSubmitHandler();
        }
        if(this._formElement === popupAddForm) {
          formSubmitAddition();
        }
      }
  }

  // Подключение слушателей для формы

  _setEventListeners() {
    this._formElement.addEventListener('submit', (evt) => {
      this._setFormSubmit(evt);
    });

    const buttonElement = this._formElement.querySelector(this._obj.submitButtonSelector);

    this._toggleButtonState(buttonElement);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidaty(inputElement);
        this._toggleButtonState(buttonElement);
      });
    });
    
  }

  // Метод изначального состояния форм

  _setBeginButtonState() {
    this._formElement.querySelector('.popup__close').addEventListener('click', () => {
      this._inputList.forEach((inputElement) => {
        this._hideInputError(inputElement);
      });
    });
    addElement.addEventListener('click', () => {
      const submitButton = this._formElement.querySelector(this._obj.submitButtonSelector);
      if(this._formElement === popupAddForm && !submitButton.classList.contains(this._obj.inactiveButtonClass)) {
        submitButton.classList.add(this._obj.inactiveButtonClass);
      }
    });
  }

  // Метод, включающий валидацию

  enableValidation() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._obj.inputSelector));
    this._setEventListeners();
    this._setBeginButtonState();
  }
}