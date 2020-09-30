export class UserInfo {
  constructor(userName, userDescription) {
    this._name = userName;
    this._description = userDescription;
    this._profileName = document.querySelector(".profile__name");
    this._profileDescription = document.querySelector(".profile__description");
  }

  // Получение объекта с данными автора
  getUserInfo() {
    return {name: this._name, description: this._description};
  }

  // Установка данных автора на страницу
  setUserInfo(user) {
    this._profileName.textContent = user.name;
    this._profileDescription.textContent = user.description;
  }
}