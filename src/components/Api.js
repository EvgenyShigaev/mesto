export default class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }
  _getJson(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then(this._getJson);
  }
  getUserData() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._getJson);
  }
  editUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.job,
      }),
    }).then(this._getJson);
  }
  editProfileAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._getJson);
  }
  addCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.place,
        link: data.link,
      }),
    }).then(this._getJson);
  }
   deleteCard(id) { 
    return fetch(`${this._url}/cards/${id}`, { 
      method: "DELETE", 
      headers: this._headers, 
    }).then(this._getJson); 
  }
  addLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._getJson);
  }
  deleteLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._getJson);
  }
}