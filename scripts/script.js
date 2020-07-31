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

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const editorElement = document.querySelector(".profile__editor");
const popupEdit = document.querySelector(".popup_edit");
const closedEdit = popupEdit.querySelector(".popup__close");

const popupName = popupEdit.querySelector(".popup__input_value_name");
const popupDescription = popupEdit.querySelector(
  ".popup__input_value_description"
);
const popupEditForm = popupEdit.querySelector(".popup__form");
const addElement = document.querySelector(".profile__addition");
const popupAdd = document.querySelector(".popup_add");
const closedAdd = popupAdd.querySelector(".popup__close");
const createAdd = popupAdd.querySelector(".popup__create");
let cardElements;
const popupPhoto = document.querySelector(".popup_photo");

const cardList = document.querySelector(".elements__list");

const closedFullimage = popupPhoto.querySelector(".popup__close");

// Функция создания новой карточки

function getCardElement(item) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector(".elements__image").src = item.link;
  cardElement.querySelector(".elements__place").textContent = item.name;
  LikeButton(cardElement);
  DeleteButton(cardElement);
  openFullImage.bind(cardElement)(item);
  return cardElement;
}

// Функция добавления новой карточки

function renderCard(item) {
  cardList.prepend(getCardElement(item));
}

// Функция отправки формы новой карточки

function formSubmitAddition(evt) {
  evt.preventDefault();

  renderCard({
    name: popupAdd.querySelector(".popup__input_value_name").value,
    link: popupAdd.querySelector(".popup__input_value_place-link").value,
  });

  popupAdd.querySelector(".popup__input_value_name").value = "";
  popupAdd.querySelector(".popup__input_value_place-link").value = "";

  closePopup(popupAdd);
}

// Появление/исчезновение лайка и удаление карточки

function LikeButton(item) {
  item
    .querySelector(".elements__like")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("elements__like_active");
    });
}

function DeleteButton(item) {
  item
    .querySelector(".elements__delete")
    .addEventListener("click", function (evt) {
      evt.target.closest(".elements__card").remove();
    });
}

// Открытие попапа с полной картинкой

function openFullImage(item) {
  this.querySelector(".elements__image").addEventListener("click", function () {
    openPopup(popupPhoto);
    popupPhoto.querySelector(".popup__fullimage").src = item.link;
    popupPhoto.querySelector(".popup__subtitle").textContent = item.name;
  });
}

// Функции открытия/закрытия

const openPopup = (item) => {
  item.classList.add("popup_opened");
};

const closePopup = (item) => {
  item.classList.remove("popup_opened");
};

// Функция редактирования профиля

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileDescription.textContent = popupDescription.value;
  closePopup(popupEdit);
}

// Обарботка попапа полной картинки

closedFullimage.addEventListener("click", () => {
  closePopup(popupPhoto);
});

// Обработка попапа редактирования

editorElement.addEventListener("click", () => {
  openPopup(popupEdit);
  popupName.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;
});

closedEdit.addEventListener("click", () => {
  closePopup(popupEdit);
});

popupEditForm.addEventListener("submit", formSubmitHandler);

// Обработка попапа добавления

addElement.addEventListener("click", () => {
  openPopup(popupAdd);
});
closedAdd.addEventListener("click", () => {
  closePopup(popupAdd);
});

createAdd.addEventListener("click", formSubmitAddition);

// Добавление изначальных карточек на страницу

initialCards.forEach(function (item) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector(".elements__image").src = item.link;
  cardElement.querySelector(".elements__place").textContent = item.name;
  cardList.append(cardElement);
});

// Обработка событий для первоначальных карточек

Array.from(elements.querySelectorAll(".elements__card")).forEach(function (
  item
) {
  LikeButton(item);
  DeleteButton(item);
  openFullImage.bind(item)({
    link: item.querySelector(".elements__image").src,
    name: item.querySelector(".elements__place").textContent,
  });
});
