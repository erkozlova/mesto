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

// here
let popupPhotoLink = popupPhoto.querySelector(".popup__fullimage");
let popupPhotoSubtitile = popupPhoto.querySelector(".popup__subtitle");

const closedFullimage = popupPhoto.querySelector(".popup__close");

// Функция создания новой карточки

function getCardElement(item) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardElementImage = cardElement.querySelector(".elements__image");

  cardElementImage.src = item.link;
  cardElement.querySelector(".elements__place").textContent = item.name;

  cardElement
    .querySelector(".elements__like")
    .addEventListener("click", (evt) => likeButton(evt));
  cardElement
    .querySelector(".elements__delete")
    .addEventListener("click", (evt) => deleteButton(evt));
  cardElementImage.addEventListener("click", () => openFullImage(item));

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

  popupPhotoLink.src = item.link;
  popupPhotoSubtitile.textContent = item.name;
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
  }  else {
    if (popup === popupPhoto && !popupPhoto.querySelector(".popup__container").contains(evt.target)) {
      closePopup(popup);
    }
  }
};

// Функции открытия/закрытия

const openPopup = (item) => {
  item.classList.add("popup_opened");
  document.addEventListener("keydown", popupEsc);
  item.addEventListener("click", handlePopupOverlayClick(item));
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

closedEdit.addEventListener("click", () => {
  closePopup(popupEdit);
});

// Обработка попапа добавления

addElement.addEventListener("click", () => {
  openPopup(popupAdd);
});
closedAdd.addEventListener("click", () => {
  closePopup(popupAdd);
});

// Добавление изначальных карточек на страницу

initialCards.forEach(function (item) {
  renderCard(item);
});
