import { htmlClasses, MY_ID, CARD_LIST_SELECTOR } from "../utils/constants.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import "../index.html";
import "./index.css";

import {api} from "../components/Api.js";
import { PopupWithQuestion } from "../components/PupupWithQuestion.js";

// DOM элементы попапов
const popupEditElement = document.querySelector(".popup_edit");
const popupAddElement = document.querySelector(".popup_add");
const pupupAvatarElement = document.querySelector(".popup_avatar");

// Кнопки сабмита
const buttonSubmitEdit = popupEditElement.querySelector(".popup__submit");
const buttonSubmitAdd = popupAddElement.querySelector(".popup__submit");
const buttonSubmitAvatar = pupupAvatarElement.querySelector('.popup__submit');

// Кнопки редактирования профиля и добавления карточки
const editorElement = document.querySelector(".profile__editor");
const addElement = document.querySelector(".profile__addition");
const avatarEditor = document.querySelector('.profile__avatar-editor');

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
const popupAvatarForm = pupupAvatarElement.querySelector(".popup__form");

let defaultCardList;

// Создание класса с данными пользователя
const userInfo = new UserInfo(".profile__name", ".profile__description", ".profile__avatar");


// Попап редактирования аватара
const popupAvatar = new PopupWithForm('.popup_avatar', submitAvatar);
popupAvatar.setEventListeners();

// Попап полной картинки
const popupPhoto = new PopupWithImage(".popup_photo");
popupPhoto.setEventListeners();

// Попап удаления карточки
const popupDelete = new PopupWithQuestion('.popup_delete', submitDeleteCard);
popupDelete.setEventListeners();

// Попап редактирования

const popupEdit = new PopupWithForm(".popup_edit", submitFormEditing);
popupEdit.setEventListeners();

// Создание класса попапа добавления

const popupAdd = new PopupWithForm(".popup_add", submitFormAddition);
popupAdd.setEventListeners();

// Отображения текста загрузки
function renderLoading(isLoading, popupSubmit) {
  if(isLoading) {
    popupSubmit.value = popupSubmit.value + "...";
  } else {
    popupSubmit.value = popupSubmit.value.slice(0, popupSubmit.value.length-3);
  }
}

// Установка данных на страницу с сервера
api.getUserData()
.then((data) => {
  userInfo.setUserInfo({name: data.name, description: data.about});
  userInfo.setUserAvatar(data.avatar);
});

// Функция создание карточки
const createCard = (item) => {
  const card = new Card(item, "#new-card", () => {
    popupPhoto.open(item);
  }, (card, cardId) => {
    popupDelete.open(card, cardId);
  }, (cardId, likeAmount) => {
    api.putLike(cardId).then((data) => {
      likeAmount.textContent = data.likes.length;
    });
  }, (cardId, likeAmount) => {
    api.deleteLike(cardId).then((data) => {
      likeAmount.textContent = data.likes.length;
    });
  });

  const cardElement = card.generateCard();
  return cardElement;
};

// Добавление изначальных карточек на страницу
api.getInitialCards()
.then((initialCards) => {
   defaultCardList = new Section(
    {
      items: initialCards,
      renderer: (item) => {
        defaultCardList.addItem(createCard(item));
      },
    },
    CARD_LIST_SELECTOR
  );
  defaultCardList.renderItems();
})

// Функция изменения аватара
function submitAvatar(avatar) {
  renderLoading(true, buttonSubmitAvatar);
  api.changeAvatar(avatar.link).finally(() => {renderLoading(false, buttonSubmitAvatar)});
  userInfo.setUserAvatar(avatar.link);
  popupAvatar.close();
}


// Функция удаления карточки
function submitDeleteCard(cardId) {
  api.deleteCard(cardId);
}

// Функция установки новых данных автора

function submitFormEditing({ name, description }) {
  renderLoading(true, buttonSubmitEdit);
  api.setUserData({name: name, about: description}).finally(() => {renderLoading(false, buttonSubmitEdit)});
  userInfo.setUserInfo({ name, description });

  popupEdit.close();
}

// Функция отправки формы новой карточки

function submitFormAddition(item) {
  renderLoading(true, buttonSubmitAdd);
  api.addCard({name: item.name, link: item.link}).finally(() => {renderLoading(false, buttonSubmitAdd)});
  item.owner = {_id: MY_ID};
  defaultCardList.addItem(createCard(item));

  popupAddName.value = "";
  popupAddLink.value = "";

  popupAdd.close();
}


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

// Обработка попапа аватара

avatarEditor.addEventListener("click", () => {
  popupAvatar.open();
  buttonSubmitAvatar.disabled = true;
  buttonSubmitAvatar.classList.add("popup__submit_inactive"); 
})


// Добавление валидации формам

const formValidEdit = new FormValidator(htmlClasses, popupEditForm);
formValidEdit.enableValidation();
formValidEdit.deleteErrorMessage(editorElement);

const formValidAdd = new FormValidator(htmlClasses, popupAddForm);
formValidAdd.enableValidation();
formValidAdd.deleteErrorMessage(addElement);

const formValidAvatar = new FormValidator(htmlClasses, popupAvatarForm);
formValidAvatar.enableValidation();
formValidAvatar.deleteErrorMessage(avatarEditor);
