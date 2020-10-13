export class UserInfo {
  constructor(nameSelector, descriptionSelector) {
    this._profileName = document.querySelector(nameSelector);
    this._profileDescription = document.querySelector(descriptionSelector);
  }

  // Получение объекта с данными автора
  getUserInfo() {
    return {name: this._profileName.textContent, description: this._profileDescription.textContent};
  }

  // Установка данных автора на страницу
  setUserInfo(user) {
    this._profileName.textContent = user.name;
    this._profileDescription.textContent = user.description;
  }
}