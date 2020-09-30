export class FormValidator {
  constructor(obj, formElement) {
    this._obj = obj;
    this._element = formElement;
    this._inputSelector = obj.inputSelector;
    this._submitButtonSelector = obj.submitButtonSelector;
    this._inactiveButtonClass = obj.inactiveButtonClass;
    this._inputErrorClass = obj.inputErrorClass;
    this._errorClass = obj.errorClass;
  }

  // Добавления сообщения ошибки

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._element.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  // Удаления сообщения об ошибке

  _hideInputError(inputElement) {
    const errorElement = this._element.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
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
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  // Подключение слушателей для формы

  _setEventListeners() {
    const buttonElement = this._element.querySelector(this._submitButtonSelector);

    this._toggleButtonState(buttonElement);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidaty(inputElement);
        this._toggleButtonState(buttonElement);
      });
    });
  }

  // // Метод изначального состояния форм

  deleteErrorMessage(popupButton) {
    popupButton.addEventListener('click', () => {
      this._inputList.forEach((inputElement) => {
        this._hideInputError(inputElement);
      });
    });
  }


  // Метод, включающий валидацию

  enableValidation() {
    this._element.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    this._inputList = Array.from(this._element.querySelectorAll(this._obj.inputSelector));
    this._setEventListeners();
  }
}