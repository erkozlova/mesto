// Функция добавления сообщения ошибки

const showInputError = (formElement, inputElement, errorMessage, {inputErrorClass, errorClass}) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

// Функции удаления сообщения об ошибке

const hideInputError = (formElement, inputElement, {inputErrorClass, errorClass}) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

// Проверка валидности инпутов для сообщения о ошибке

const checkInputValidity = (formElement, inputElement, {...rest}) => {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, rest);
  } else {
    hideInputError(formElement, inputElement, rest);
  }
};

// Проверка валидности инпутов для статуса кнопки

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// Функция статуса активности кнопки

const toggleButtonState = (inputList, buttonElement, {inactiveButtonClass, ...rest}) => {
  if(hasInvalidInput(inputList)){
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
}

// Функция подключения слушателей для формы

const setEventListeners = (formElement, inputList, {submitButtonSelector, ...rest}) => {
  const buttonElement = formElement.querySelector(submitButtonSelector);
  
  toggleButtonState(inputList, buttonElement, rest); 

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, rest);
      toggleButtonState(inputList, buttonElement, rest);
    });
  });

};

// Функция изначального состояния форм

function buttonFirstState ({submitButtonSelector, inactiveButtonClass}){
  popupAdd.querySelector(submitButtonSelector).classList.add(inactiveButtonClass);
}

const editBeginState = (inputSelector, {submitButtonSelector, inactiveButtonClass, ...rest}) => {
  closedEdit.addEventListener('click', () => {
    const inputEditArray = Array.from(popupEdit.querySelectorAll(inputSelector));
    const popupButtonSubmit = popupEdit.querySelector(submitButtonSelector);
    inputEditArray.forEach((inputEdit) =>{
      hideInputError(popupEdit, inputEdit, rest); 
    });
    if(popupButtonSubmit.classList.contains(inactiveButtonClass)){
      popupButtonSubmit.classList.remove(inactiveButtonClass);
    }
  });

  addElement.addEventListener('click', () => {
    buttonFirstState({submitButtonSelector, inactiveButtonClass}); 
  });

  closedAdd.addEventListener('click', () => {
  const inputAddArray = Array.from(popupAdd.querySelectorAll(inputSelector));
  inputAddArray.forEach((inputAdd) =>{
    hideInputError(popupAdd, inputAdd, rest); 
  });
  buttonFirstState({submitButtonSelector, inactiveButtonClass});
  });
};

// Функция включения валидации

const enableValidation = ({formSelector, inputSelector, ...rest}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
      if (formElement === popupEditForm && !hasInvalidInput(inputList)) {
        formSubmitHandler();
      };
      if (formElement === popupAdd.querySelector(formSelector) && !hasInvalidInput(inputList)) {
        formSubmitAddition();
      };
    });

    setEventListeners(formElement, inputList, rest);
  });

  editBeginState(inputSelector, rest);
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_active'
});