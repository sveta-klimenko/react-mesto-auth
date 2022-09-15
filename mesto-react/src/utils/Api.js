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

  getCards() {
    return fetch(this.url + "cards", {
      headers: this.headers,
    }).then(this.handleResponse);
  }

  createCard(data) {
    return fetch(this.url + "cards", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(data),
    }).then(this.handleResponse);
  }

  deleteCard(id) {
    return fetch(this.url + "cards/" + id, {
      method: "DELETE",
      headers: this.headers,
    }).then(this.handleResponse);
  }

  getPersonalInfo() {
    return fetch(this.url + "users/me", {
      headers: this.headers,
    }).then(this.handleResponse);
  }

  updatePersonalInfo(data) {
    return fetch(this.url + "users/me", {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(data),
    }).then(this.handleResponse);
  }

  updateAvatar(data) {
    return fetch(this.url + "users/me/avatar ", {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(data),
    }).then(this.handleResponse);
  }

  likeCard(id) {
    return fetch(this.url + "cards/" + id + "/likes", {
      method: "PUT",
      headers: this.headers,
    }).then(this.handleResponse);
  }

  dislikeCard(id) {
    return fetch(this.url + "cards/" + id + "/likes", {
      method: "DELETE",
      headers: this.headers,
    }).then(this.handleResponse);
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
