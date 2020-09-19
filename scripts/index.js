import {
  popupEdit,
  popupAdd,
  popupPhoto,
  popupAddName,
  popupAddLink,
  openPopup,
  closePopup,
  addElement,
  popupAddForm,
  popupEditForm,
} from "./utils.js";

import {initialCards} from "./InitialCardsData.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const cardList = document.querySelector(".elements__list");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const editorElement = document.querySelector(".profile__editor");

const popupName = popupEdit.querySelector(".popup__input_value_name");
const popupDescription = popupEdit.querySelector(
  ".popup__input_value_description"
);

const buttonSubmitEdit = popupEdit.querySelector('.popup__submit');
const closedEdit = popupEdit.querySelector(".popup__close");

const buttonSubmitAdd = popupAdd.querySelector('.popup__submit');
const closedAdd = popupAdd.querySelector(".popup__close");

const closedFullimage = popupPhoto.querySelector(".popup__close");

// Функция добавления новой карточки

function renderCard(item) {
  cardList.prepend(item);
}

// Функция отправки формы новой карточки

function submitFormAddition() {
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

// Функция закрытия форм кликом на оверлей

const closePopupOverlay = (popup) => (evt) => {
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

// Функция редактирования профиля

function submitFormHandler() {
  profileName.textContent = popupName.value;
  profileDescription.textContent = popupDescription.value;

  closePopup(popupEdit);
}

// Обарботка попапа полной картинки

popupPhoto.addEventListener("click", closePopupOverlay(popupPhoto));
closedFullimage.addEventListener("click", () => {
  closePopup(popupPhoto);
});

// Обработка попапа редактирования

editorElement.addEventListener("click", () => {
  openPopup(popupEdit);
  buttonSubmitEdit.disabled = false;
  buttonSubmitEdit.classList.remove("popup__submit_inactive");
  popupName.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;
});

popupEdit.addEventListener("click", closePopupOverlay(popupEdit));
closedEdit.addEventListener("click", () => {
  closePopup(popupEdit);
});

// Обработка попапа добавления

addElement.addEventListener("click", () => {
  openPopup(popupAdd);
  buttonSubmitAdd.disabled = true;
  buttonSubmitAdd.classList.add('popup__submit_inactive');
});

popupAdd.addEventListener("click", closePopupOverlay(popupAdd));
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

popupEditForm.addEventListener("submit", submitFormHandler);
popupAddForm.addEventListener("submit", submitFormAddition);

const formValidEdit = new FormValidator(obj, popupEditForm);
formValidEdit.enableValidation();
formValidEdit.deleteErrorMessage();

const formValidAdd = new FormValidator(obj, popupAddForm);
formValidAdd.enableValidation();
formValidAdd.deleteErrorMessage();
