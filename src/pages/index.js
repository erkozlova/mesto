import { initialCards } from "../utils/constants.js";
import { htmlClasses } from "../utils/constants.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import "../index.html";
import "./index.css";

// DOM элементы попапов
const popupEditElement = document.querySelector(".popup_edit");
const popupAddElement = document.querySelector(".popup_add");

// Контейнер для карточек
const CARD_LIST_SELECTOR = ".elements__list";

// Кнопки редактирования профиля и добавления карточки
const editorElement = document.querySelector(".profile__editor");
const addElement = document.querySelector(".profile__addition");

// Данные автора из формы
const popupName = document.querySelector(".popup__input_value_name");
const popupDescription = document.querySelector(
  ".popup__input_value_description"
);

// Данные новой карточки из формы
const popupAddName = popupAddElement.querySelector(".popup__input_value_name");
const popupAddLink = popupAddElement.querySelector(
  ".popup__input_value_place-link"
);

// Формы редактирования и добавления
const popupAddForm = popupAddElement.querySelector(".popup__form");
const popupEditForm = popupEditElement.querySelector(".popup__form");

// Попап полной картинки
const popupPhoto = new PopupWithImage(".popup_photo");
popupPhoto.setEventListeners();

const createCard = (item) => {
  const card = new Card(item, "#new-card", () => {
    popupPhoto.open(item);
  });

  const cardElement = card.generateCard();
  return cardElement;
};

// Добавление изначальных карточек на страницу

const defaultCardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      defaultCardList.addItem(createCard(item));
    },
  },
  CARD_LIST_SELECTOR
);

defaultCardList.renderItems();

// Создание класса с данными пользователя

const userInfo = new UserInfo(".profile__name", ".profile__description");

// Создание класс попапа редактирования

const popupEdit = new PopupWithForm(".popup_edit", submitFormEditing);
const buttonSubmitEdit = popupEditElement.querySelector(".popup__submit");
popupEdit.setEventListeners();

// Функция установки новых данных автора

function submitFormEditing({ name, description }) {
  userInfo.setUserInfo({ name, description });

  popupEdit.close();
}

// Функция отправки формы новой карточки

function submitFormAddition(item) {
  defaultCardList.addItem(createCard(item));

  popupAddName.value = "";
  popupAddLink.value = "";

  popupAdd.close();
}

// Создание класса попапа добавления

const popupAdd = new PopupWithForm(".popup_add", submitFormAddition);
const buttonSubmitAdd = popupAddElement.querySelector(".popup__submit");
popupAdd.setEventListeners();

// Обработка попапа редактирования

editorElement.addEventListener("click", () => {
  popupEdit.open();
  buttonSubmitEdit.disabled = false;
  buttonSubmitEdit.classList.remove("popup__submit_inactive");
  const {name, description} = userInfo.getUserInfo();
  popupName.value = name;
  popupDescription.value = description;
});

// Обработка попапа добавления

addElement.addEventListener("click", () => {
  popupAdd.open();
  buttonSubmitAdd.disabled = true;
  buttonSubmitAdd.classList.add("popup__submit_inactive");
});

// Добавление валидации формам

const formValidEdit = new FormValidator(htmlClasses, popupEditForm);
formValidEdit.enableValidation();
formValidEdit.deleteErrorMessage(editorElement);

const formValidAdd = new FormValidator(htmlClasses, popupAddForm);
formValidAdd.enableValidation();
formValidAdd.deleteErrorMessage(addElement);
