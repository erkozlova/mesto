let editorElement = document.querySelector('.profile__editor'); 
let popup = document.querySelector('.popup');
let closedElement = popup.querySelector('.popup__close');
let popupName = popup.querySelector('.popup__input_value_name');
let popupDescription = popup.querySelector('.popup__input_value_description');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let popupForm = popup.querySelector('.popup__form');

console.log(popup);

function openForm () {
  popup.classList.add('popup_opened');
  popupName.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;
  console.log(popup);
}

function closeForm () {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileDescription.textContent = popupDescription.value;
  console.log(popupName.value);
  console.log(popupDescription.value);
  closeForm();
}

editorElement.addEventListener('click', openForm);
closedElement.addEventListener('click', closeForm);
popupForm.addEventListener('submit', formSubmitHandler);
