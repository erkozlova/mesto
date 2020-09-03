const initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const cardTemplate = document.querySelector("#new-card").content;

const elements = document.querySelector(".elements");
const cardList = document.querySelector(".elements__list");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const editorElement = document.querySelector(".profile__editor");
const addElement = document.querySelector(".profile__addition");

const popupEdit = document.querySelector(".popup_edit");
const popupAdd = document.querySelector(".popup_add");
const popupPhoto = document.querySelector(".popup_photo");

const popupEditForm = popupEdit.querySelector(".popup__form");
const popupName = popupEdit.querySelector(".popup__input_value_name");
const popupDescription = popupEdit.querySelector(
  ".popup__input_value_description"
);
const closedEdit = popupEdit.querySelector(".popup__close");

const popupAddName = popupAdd.querySelector(".popup__input_value_name");
const popupAddLink = popupAdd.querySelector(".popup__input_value_place-link");
const closedAdd = popupAdd.querySelector(".popup__close");

const closedFullimage = popupPhoto.querySelector(".popup__close");

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



// Функция создания новой карточки

function getCardElement(item) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardElementImage = cardElement.querySelector(".elements__image");

  cardElementImage.src = item.link;
  cardElement.querySelector(".elements__place").textContent = item.name;

  cardElement.querySelector(".elements__like").addEventListener('click', (evt) => likeButton(evt));
  cardElement.querySelector(".elements__delete").addEventListener('click', (evt) => deleteButton(evt));
  cardElementImage.addEventListener('click', () => openFullImage(item));

  return cardElement;
}

// Функция добавления новой карточки

function renderCard(item) {
  cardList.prepend(getCardElement(item));
}

// Функция отправки формы новой карточки

function formSubmitAddition() {

  renderCard({
    name: popupAddName.value,
    link: popupAddLink.value,
  });

  popupAddName.value = "";
  popupAddLink.value = "";

  closePopup(popupAdd);
}

// Появление/исчезновение лайка и удаление карточки

function likeButton(evt) {
  evt.target.classList.toggle("elements__like_active");
}

function deleteButton(evt) {
  evt.target.closest(".elements__card").remove();
}

// Открытие попапа с полной картинкой

function openFullImage(item) {
  openPopup(popupPhoto);

  popupPhoto.querySelector(".popup__fullimage").src = item.link;
  popupPhoto.querySelector(".popup__subtitle").textContent = item.name;
}

// Функции открытия/закрытия

const openPopup = (item) => {
  item.classList.add("popup_opened");
};

const closePopup = (item) => {
  item.classList.remove("popup_opened");
};

// Функция редактирования профиля

function formSubmitHandler() {

  profileName.textContent = popupName.value;
  profileDescription.textContent = popupDescription.value;

  closePopup(popupEdit);
}

// Функция закрытия форм кликом на оверлей

function popupOverlay (popup) {
  popup.addEventListener('click', function (evt) {
    if(!popup.querySelector('.popup__form').contains(evt.target)) {
      closePopup(popup);
    }
  });
}

// Функция закрытия формы нажатием на ESC

function popupEsc (popup) {
  popup.addEventListener('keydown', function (evt) {
    if(evt.keyCode === 27) {
      closePopup(popup);
    }
  });
}

// Обарботка попапа полной картинки

closedFullimage.addEventListener('click', () => {
  closePopup(popupPhoto);
});

popupPhoto.addEventListener('click', function (evt) {
  if(!popupPhoto.querySelector('.popup__container').contains(evt.target)) {
    closePopup(popupPhoto);
  }
});

// Обработка попапа редактирования

editorElement.addEventListener('click', () => {
  openPopup(popupEdit);

  popupEdit.querySelector('.popup__submit').classList.remove('popup__submit_inactive');
  popupName.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;
});

closedEdit.addEventListener('click', () => {
  closePopup(popupEdit);
  const inputEditArray = Array.from(popupEdit.querySelectorAll('.popup__input'));
  inputEditArray.forEach((inputEdit) =>{
    hideInputError(popupEdit, inputEdit);
  });
  popupEdit.querySelector('.popup__submit').classList.remove('popup__submit_inactive');
});

popupOverlay(popupEdit);

function buttonFirstCondition (){
  popupAdd.querySelector('.popup__submit').classList.add('popup__submit_inactive');
}

// Обработка попапа добавления

addElement.addEventListener('click', () => {
  buttonFirstCondition();
  openPopup(popupAdd);
});
closedAdd.addEventListener('click', () => {
  closePopup(popupAdd);
  const inputAddArray = Array.from(popupAdd.querySelectorAll('.popup__input'));
  inputAddArray.forEach((inputAdd) =>{
    hideInputError(popupAdd, inputAdd);
  });
  buttonFirstCondition();
  popupAddName.value = "";
  popupAddLink.value = "";
});

popupOverlay(popupAdd);


// Добавление изначальных карточек на страницу

initialCards.forEach(function (item) {
  renderCard(item);
});

popupEsc(popupAdd);
document.addEventListener('keydown', function (evt) {
  if(evt.keyCode === 27 ) {
    closePopup(popupEdit);
    closePopup(popupAdd);
    closePopup(popupPhoto);
  }
});