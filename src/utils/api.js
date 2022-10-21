class Api {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this.handleResponse);
  }

  getCards() {
    return this._request(this.url + "cards", {
      headers: this.headers,
    });
  }

  createCard(data) {
    return this._request(this.url + "cards", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(data),
    });
  }

  deleteCard(id) {
    return this._request(this.url + "cards/" + id, {
      method: "DELETE",
      headers: this.headers,
    });
  }

  getPersonalInfo() {
    return this._request(this.url + "users/me", {
      headers: this.headers,
    });
  }

  updatePersonalInfo(data) {
    return this._request(this.url + "users/me", {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(data),
    });
  }

  updateAvatar(data) {
    return this._request(this.url + "users/me/avatar ", {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(data),
    });
  }

  changeLikeCardStatus(id, isLiked) {
    return this._request(this.url + "cards/" + id + "/likes", {
      method: `${isLiked ? "PUT" : "DELETE"}`,
      headers: this.headers,
    });
  }
}

const api = new Api({
  url: "https://nomoreparties.co/v1/cohort-42/",
  headers: {
    authorization: "7ccf8939-dd66-46c7-841c-93db6f266356",
    "content-Type": "application/json",
  },
});

export default api;
