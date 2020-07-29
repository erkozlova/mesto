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
const cardElement = Array.from(elements.querySelectorAll(".elements__card"));
const popupPhoto = document.querySelector(".popup_photo");
const cardList = document.querySelector(".elements__list");

console.log('cardList.querySelector(".elements__card")', cardList.querySelector('.elements__card'));
console.log('elements.querySelector(".elements__list")', elements.querySelector('.elements__list'));

// Функции открытия/закрытия

const openPopup = (item) => () => {
  item.classList.add("popup_opened");
  setTimeout(() => item.classList.add("popup_visible"), 0);
};

const closePopup = (item) => () => {
  item.classList.remove("popup_visible");
  setTimeout(() => item.classList.remove("popup_opened"), 250);
};

// Вставка изначальных карточек на страницу

initialCards.forEach(function (item) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector(".elements__image").src = item.link;
  cardElement.querySelector(".elements__place").textContent = item.name;
  cardList.append(cardElement);
});

//Функция открытия полной картинки

function openFullImage(item) {
  item.querySelector(".elements__image").addEventListener("click", function () {
    openPopup(popupPhoto)();
    popupPhoto.querySelector(".popup__fullimage").src = item.querySelector(
      ".elements__image"
    ).src;
    popupPhoto.querySelector(
      ".popup__subtitle"
    ).textContent = item.querySelector(".elements__place").textContent;
    popupPhoto
      .querySelector(".popup__close")
      .addEventListener("click", function () {
        closePopup(popupPhoto)();
      });
  });
}

// Функция отправки редактирования

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileDescription.textContent = popupDescription.value;
  closePopup(popupEdit)();
}

// Функция добавления новой карточки

function formSubmitAddition(evt) {
  evt.preventDefault();

  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector(".elements__image").src = popupAdd.querySelector(
    ".popup__input_value_place-link"
  ).value;
  cardElement.querySelector(
    ".elements__place"
  ).textContent = popupAdd.querySelector(".popup__input_value_name").value;

  popupAdd.querySelector(".popup__input_value_name").value = "";
  popupAdd.querySelector(".popup__input_value_place-link").value = "";

  cardList.prepend(cardElement);
  LikeDeleteButtons(cardList.firstElementChild);
  openFullImage(cardList.firstElementChild);
  closePopup(popupAdd)();
}

// Появление/исчезновение лайка и удаление карточки

function LikeDeleteButtons(item) {
  item
    .querySelector(".elements__like")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("elements__like_active");
    });

  item
    .querySelector(".elements__delete")
    .addEventListener("click", function (evt) {
      evt.target.closest(".elements__card").remove();
    });
}

// Попап редактирования

editorElement.addEventListener("click", function () {
  openPopup(popupEdit)();
  popupName.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;
});

closedEdit.addEventListener("click", closePopup(popupEdit));
popupEditForm.addEventListener("submit", formSubmitHandler);

// Попап добавления

addElement.addEventListener("click", openPopup(popupAdd));
closedAdd.addEventListener("click", closePopup(popupAdd));

createAdd.addEventListener("click", formSubmitAddition);

console.log('2', cardElement);
cardElement.forEach(function (item) {

  console.log('hi');
  LikeDeleteButtons(item);
});

// Попап открытия картинки

cardElement.forEach(function (item) {
  openFullImage(item);
});
