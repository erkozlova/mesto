export class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  getInitialCards() {
    return fetch(this.baseUrl + "/cards", {
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  getUserData() {
    return fetch(this.baseUrl + "/users/me", {
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  getAppInfo() {
    return Promise.all([this.getUserData(), this.getInitialCards()]);
  }

  setUserData({ name, about }) {
    return fetch(this.baseUrl + "/users/me", {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  addCard({ name, link }) {
    return fetch(this.baseUrl + "/cards", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => {
      if(res.ok) {
        return res.json();
      }
    });
  }

  deleteCard(cardId) {
    return fetch(this.baseUrl + "/cards/" + cardId, {
      method: "DELETE",
      headers: this.headers,
    });
  }

  putLike(cardId) {
    return fetch(this.baseUrl + "/cards/likes/" + cardId, {
      method: "PUT",
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  deleteLike(cardId) {
    return fetch(this.baseUrl + "/cards/likes/" + cardId, {
      method: "DELETE",
      headers: this.headers,
    }).then((res) => {
      if(res.ok) {
        return res.json();
      }
    });
  }

  changeAvatar(avatar) {
    return fetch(this.baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
}
