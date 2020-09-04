// Функция добавления сообщения ошибки

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add('popup__input_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__error_active');
};

// Функции удаления сообщения об ошибке

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_error');
  errorElement.classList.remove('popup__error_active');
  errorElement.textContent = '';
};

// Проверка валидности инпутов для сообщения о ошибке

const checkInputValidity = (formElement, inputElement) => {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

// Проверка валидности инпутов для статуса кнопки

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// Функция статуса активности кнопки

const toggleButtonState = (inputList, buttonElement) => {
  if(hasInvalidInput(inputList)){
    buttonElement.classList.add('popup__submit_inactive');
  } else {
    buttonElement.classList.remove('popup__submit_inactive');
  }
}

// Функция подключения слушателей для формы

const setEventListeners = (formElement, inputList) => {
  const buttonElement = formElement.querySelector('.popup__submit');
  
  toggleButtonState(inputList, buttonElement); 

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });

};

// Функция включения валидации

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  formList.forEach((formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
      if (formElement === popupEditForm && !hasInvalidInput(inputList)) {
        formSubmitHandler();
      };
      if (formElement === popupAdd.querySelector('.popup__form') && !hasInvalidInput(inputList)) {
        formSubmitAddition();
      };
    });

    setEventListeners(formElement, inputList);
  });
};

enableValidation();

function buttonFirstCondition (){
  popupAdd.querySelector('.popup__submit').classList.add('popup__submit_inactive');
}

closedEdit.addEventListener('click', () => {
  const inputEditArray = Array.from(popupEdit.querySelectorAll('.popup__input'));
  inputEditArray.forEach((inputEdit) =>{
    hideInputError(popupEdit, inputEdit);
  });
  popupEdit.querySelector('.popup__submit').classList.remove('popup__submit_inactive');
});

addElement.addEventListener('click', () => {
  buttonFirstCondition();
});

closedAdd.addEventListener('click', () => {
  const inputAddArray = Array.from(popupAdd.querySelectorAll('.popup__input'));
  inputAddArray.forEach((inputAdd) =>{
    hideInputError(popupAdd, inputAdd);
  });
  buttonFirstCondition();
});