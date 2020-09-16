import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

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

const popupAddForm = popupAdd.querySelector('.popup__form');
const popupAddName = popupAdd.querySelector(".popup__input_value_name");
const popupAddLink = popupAdd.querySelector(".popup__input_value_place-link");
const closedAdd = popupAdd.querySelector(".popup__close");

let popupPhotoLink = popupPhoto.querySelector(".popup__fullimage");
let popupPhotoSubtitile = popupPhoto.querySelector(".popup__subtitle");

const closedFullimage = popupPhoto.querySelector(".popup__close");

// Функция добавления новой карточки

function renderCard(item) {
  cardList.prepend(item);
}

// Функция отправки формы новой карточки

function formSubmitAddition() {
  const card = new Card(
    {
      name: popupAddName.value,
      link: popupAddLink.value,
    },
    "#new-card"
  );

  renderCard(card.generateCard());

  popupAddName.value = "";
  popupAddLink.value = "";

  closePopup(popupAdd);
}

// Функция закрытия попапа нажатие ESC

function popupEsc(evt) {
  if (evt.keyCode === 27) {
    if (popupAdd.classList.contains("popup_opened")) {
      closePopup(popupAdd);
    }
    if (popupEdit.classList.contains("popup_opened")) {
      closePopup(popupEdit);
    }
    if (popupPhoto.classList.contains("popup_opened")) {
      closePopup(popupPhoto);
    }
  }
}

// Функция закрытия форм кликом на оверлей

const handlePopupOverlayClick = (popup) => (evt) => {
  if (
    popup != popupPhoto &&
    !popup.querySelector(".popup__form").contains(evt.target)
  ) {
    closePopup(popup);
  } else {
    if (
      popup === popupPhoto &&
      !popupPhoto.querySelector(".popup__container").contains(evt.target)
    ) {
      closePopup(popup);
    }
  }
};

// Функции открытия/закрытия

const openPopup = (item) => {
  item.classList.add("popup_opened");
  document.addEventListener("keydown", popupEsc);
};

const closePopup = (item) => {
  item.classList.remove("popup_opened");
  document.removeEventListener("keydown", popupEsc);
  if (item === popupAdd) {
    popupAddName.value = "";
    popupAddLink.value = "";
  }
};

// Функция редактирования профиля

function formSubmitHandler() {
  profileName.textContent = popupName.value;
  profileDescription.textContent = popupDescription.value;

  closePopup(popupEdit);
}

// Обарботка попапа полной картинки

popupPhoto.addEventListener("click", handlePopupOverlayClick(popupPhoto));
closedFullimage.addEventListener("click", () => {
  closePopup(popupPhoto);
});

// Обработка попапа редактирования

editorElement.addEventListener("click", () => {
  openPopup(popupEdit);
  popupEdit
    .querySelector(".popup__submit")
    .classList.remove("popup__submit_inactive");
  popupName.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;
});

popupEdit.addEventListener("click", handlePopupOverlayClick(popupEdit));
closedEdit.addEventListener("click", () => {
  closePopup(popupEdit);
});

// Обработка попапа добавления

addElement.addEventListener("click", () => {
  openPopup(popupAdd);
});

popupAdd.addEventListener("click", handlePopupOverlayClick(popupAdd));
closedAdd.addEventListener("click", () => {
  closePopup(popupAdd);
});

// Добавление изначальных карточек на страницу

initialCards.forEach(function (item) {
  const card = new Card(item, "#new-card");

  renderCard(card.generateCard());
});

const obj = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_inactive",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__error_active",
};

const formList = Array.from(document.querySelectorAll(obj.formSelector));

formList.forEach((form) => {
  const formValid = new FormValidator(obj, form);
  formValid.enableValidation();
});

export {
  openPopup,
  popupPhoto,
  popupPhotoLink,
  popupPhotoSubtitile,
  popupEditForm,
  popupAddForm,
  formSubmitHandler,
  formSubmitAddition,
  addElement
};
