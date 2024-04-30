export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getUserInfoAndCards() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  renderResult(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  }

  _request(url, options) {
    return fetch(url, options).then(this.renderResult);
  }

  getInitialCards() {
    return this._request(this._baseUrl + `/cards`, {
      method: "GET",
      headers: this._headers,
    });
  }

  addCard({ name, url }) {
    return this._request(this._baseUrl + `/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, link: url }),
    });
  }

  getUserInfo() {
    return this._request(this._baseUrl + `/users/me`, {
      method: "GET",
      headers: this._headers,
    });
  }

  updateUserInfo(name, about) {
    return this._request(this._baseUrl + `/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name: name, about: about }),
    });
  }

  updateAvatar(url) {
    return this._request(this._baseUrl + `/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar: url.avatar }),
    });
  }

  deleteCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  likeCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
  }

  dislikeCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
  }
}
