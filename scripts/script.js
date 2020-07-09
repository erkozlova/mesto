let editorElement = document.querySelector('.profile__editor'); 
let popup = document.querySelector('.popup');
let closedElement = popup.querySelector('.popup__close');
let popup__name = popup.querySelector('.popup__name');
let popup__description = popup.querySelector('.popup__description');
let profile__name = document.querySelector('.profile__name');
let profile__description = document.querySelector('.profile__description');
let SaveButton = popup.querySelector('.popup__save');
let popup__form = popup.querySelector('.popup__form');

console.log(popup);

function openForm () {
  popup.classList.add('popup_opened');
  popup__name.value = profile__name.textContent;
  popup__description.value = profile__description.textContent;
  console.log(popup);
}

function closeForm () {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profile__name.textContent = popup__name.value;
  profile__description.textContent = popup__description.value;
  console.log(popup__name.value);
  console.log(popup__description.value);
  closeForm();
}

editorElement.addEventListener('click', openForm);
closedElement.addEventListener('click', closeForm);
popup__form.addEventListener('submit', formSubmitHandler);
