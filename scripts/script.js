// Попап редактирования

let profileName = document.querySelector(".profile__name");
let profileDescription = document.querySelector(".profile__description");

let editorElement = document.querySelector(".profile__editor");
let popupEdit = document.querySelector(".popup_edit");
let closedEdit = popupEdit.querySelector(".popup__close");

let popupName = popupEdit.querySelector(".popup__input_value_name");
let popupDescription = popupEdit.querySelector(
  ".popup__input_value_description"
);
let popupEditForm = popupEdit.querySelector(".popup__form");

function openEdit() {
  popupEdit.classList.add("popup_opened");
  popupName.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;
}

function closeEdit() {
  popupEdit.classList.remove("popup_opened");
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileDescription.textContent = popupDescription.value;
  closeEdit();
}

editorElement.addEventListener("click", openEdit);
closedEdit.addEventListener("click", closeEdit);
popupEditForm.addEventListener("submit", formSubmitHandler);

// Попап добавления

let addElement = document.querySelector(".profile__addition");
let popupAdd = document.querySelector(".popup_add");
let closedAdd = popupAdd.querySelector(".popup__close");
let createAdd = popupAdd.querySelector(".popup__create");

function openAdd() {
  popupAdd.classList.add("popup_opened");
}

function closeAdd() {
  popupAdd.classList.remove("popup_opened");
}

addElement.addEventListener("click", openAdd);
closedAdd.addEventListener("click", closeAdd);

// Добавление новой карточки

// TODO Не распознается value о названии и ссылке
// TODO Не очищаютя поля заполнения при создании и закрытии
const cardTemplate = document.querySelector("#new-card").content;
let elements = document.querySelector(".elements");

function formSubmitAddition(evt) {
  evt.preventDefault();
  const cardElement = cardTemplate.cloneNode(true);
  let cardImage = cardElement.querySelector(".elements__image").src;
  let cardPlace = cardElement.querySelector(".elements__place").textContent;

  let placeName = addElement.querySelector(".popup__input_value_name");
  let placeLink = addElement.querySelector(".popup__input_value_place-link");

  console.log(placeLink);
  console.log(placeName);

  cardImage = placeLink;
  cardPlace = placeName;
  elements.prepend(cardElement);
  closeAdd();
}

createAdd.addEventListener("click", formSubmitAddition);


// Появление/исчезновение лайка и удаление карточки

// TODO Не работает для новых карточек
const cardElement = Array.from(elements.querySelectorAll(".elements__card"));

cardElement.forEach( function (item) {
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
});
