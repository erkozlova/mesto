export const popupEdit = document.querySelector(".popup_edit");
export const popupAdd = document.querySelector(".popup_add");
export const popupPhoto = document.querySelector(".popup_photo");

export const addElement = document.querySelector(".profile__addition");

export const popupEditForm = popupEdit.querySelector(".popup__form");

export const popupAddForm = popupAdd.querySelector('.popup__form');
export const popupAddName = popupAdd.querySelector(".popup__input_value_name");
export const popupAddLink = popupAdd.querySelector(".popup__input_value_place-link");

export const popupPhotoLink = popupPhoto.querySelector(".popup__fullimage");
export const popupPhotoSubtitle = popupPhoto.querySelector(".popup__subtitle");

const escKeyCode = 27;

// Фукнция открытия попапа

export const openPopup = (item) => {
  item.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEsc);
};

// Функция закрытия

export const closePopup = (item) => {
  item.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEsc);
  if (item === popupAdd) {
    popupAddName.value = "";
    popupAddLink.value = "";
  }
};

// Функция закрытия попапа нажатие ESC

function closePopupEsc(evt) {
  if(evt.keyCode === escKeyCode) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

