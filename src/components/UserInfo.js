export class UserInfo {
  constructor(nameSelector, descriptionSelector, avatarSelector) {
    this._profileName = document.querySelector(nameSelector);
    this._profileDescription = document.querySelector(descriptionSelector);
    this._profileAvatar = document.querySelector(avatarSelector)
  }

  // Получение объекта с данными автора
  getUserInfo() {
    return {name: this._profileName.textContent, description: this._profileDescription.textContent};
  }

  // Установка данных автора на страницу
  setUserInfo({name, description, userId}) {
    this._profileName.textContent = name;
    this._profileDescription.textContent = description;
    this._id = userId;
  }

  setUserAvatar(avatar) {
    this._profileAvatar.src = avatar;
  }

  getUserId() {
    return this._id;
  }
}