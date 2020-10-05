import {initialCards} from './components/InitialCardsData.js';
import {Card} from './components/Card.js';
import {FormValidator} from './components/FormValidator.js';
import {Section} from './components/Section.js';
import {PopupWithImage} from './components/PopupWithImage.js';
import {PopupWithForm} from './components/PopupWithForm.js';
import { UserInfo } from './components/UserInfo.js';
import './index.html';
import './pages/index.css';

// Объект с селекторами для валидации
const obj = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_inactive",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__error_active",
};

// DOM элементы попапов
const popupEditElement = document.querySelector(".popup_edit");
const popupAddElement = document.querySelector(".popup_add");
const popupPhotoElement = document.querySelector(".popup_photo");

const popupPhotoConatiner = popupPhotoElement.querySelector(".popup__container");

// Контейнер для карточек
const cardListSelector = '.elements__list';
const cardList = document.querySelector(cardListSelector);

// Данные автора из профиля
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

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
const popupAddLink = popupAddElement.querySelector(".popup__input_value_place-link");

// Формы редактирования и добавления
const popupAddForm = popupAddElement.querySelector('.popup__form');
const popupEditForm = popupEditElement.querySelector(".popup__form");

// Функция закрытия попапа картинки кликом по оверлей
const closePopupPhotoOverlay = (popup) => {
  popupPhotoElement.addEventListener('click', (evt) => {
    if (!popupPhotoConatiner.contains(evt.target)) {
      popup.close();
    }
  });
}

// Добавление изначальных карточек на страницу

const defaultCardList = new Section ({items: initialCards, renderer: (item) => {
    const card = new Card(item, "#new-card", () => {
      const popup = new PopupWithImage(".popup_photo");

      popup.setEventListeners();
      closePopupPhotoOverlay(popup);

      popup.open(item);
    });
  
    const cardElement = card.generateCard();
    defaultCardList.addItem(cardElement);

}}, cardListSelector);

defaultCardList.renderItems();

// Создание класс попапа редактирования

const popupEdit = new PopupWithForm('.popup_edit', submitFormEditing);
const buttonSubmitEdit = popupEditElement.querySelector('.popup__submit');
popupEdit.setEventListeners();

// Функция установки новых данных автора

function submitFormEditing({ name, description }) {
  const userInfo = new UserInfo(name, description);
  userInfo.setUserInfo(userInfo.getUserInfo());

  popupEdit.close();
}

// Обработка попапа редактирования

editorElement.addEventListener("click", () => {
  popupEdit.open();
  buttonSubmitEdit.disabled = false;
  buttonSubmitEdit.classList.remove("popup__submit_inactive");
  popupName.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;
});

// Создание класс попапа добавления

const popupAdd = new PopupWithForm('.popup_add', submitFormAddition);
const buttonSubmitAdd = popupAddElement.querySelector('.popup__submit');
popupAdd.setEventListeners();

// Функция вставки новой карточки в контейнер

function renderCard(item) {
  cardList.prepend(item);
}

// Функция отправки формы новой карточки

function submitFormAddition({ name, link }) {
  const card = new Card({name, link},
    "#new-card", () => {
      const popup = new PopupWithImage(".popup_photo");

      popup.setEventListeners();
      closePopupPhotoOverlay(popup);

      popup.open({name, link});
    }
  );

  renderCard(card.generateCard());

  popupAddName.value = "";
  popupAddLink.value = "";

  popupAdd.close();
}

// Обработка попапа добавления

addElement.addEventListener("click", () => {
  popupAdd.open();
  buttonSubmitAdd.disabled = true;
  buttonSubmitAdd.classList.add('popup__submit_inactive');
});



// Функция закрытия форм кликом на оверлей

const closePopupOverlay = (popupElement, popup) => (evt) => {
  if (
    popupElement != popupPhotoElement &&
    !popupElement.querySelector(".popup__form").contains(evt.target)
  ) {
    popup.close();
  } 
};

// Закрытие попапа редактирования кликом на оверлей

popupEditElement.addEventListener("click", closePopupOverlay(popupEditElement, popupEdit));

// Закрытие попапа добавлениякликом на оверлей

popupAddElement.addEventListener("click", closePopupOverlay(popupAddElement, popupAdd));

// Добавление валидации формам

const formValidEdit = new FormValidator(obj, popupEditForm);
formValidEdit.enableValidation();
formValidEdit.deleteErrorMessage(editorElement);

const formValidAdd = new FormValidator(obj, popupAddForm);
formValidAdd.enableValidation();
formValidAdd.deleteErrorMessage(addElement);
