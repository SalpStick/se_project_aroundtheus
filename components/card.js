export default class Card {
  constructor({ name, link }, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    console.log("1");
  }

  _setEventListeners() {
    //like button
    this._cardElement
      .querySelector(".card__heart")
      .addEventListener("click", () => this._handleLikeBtn);

    this._cardElement
      .querySelector(".card__trash")
      .addEventListener("click", () => this._handleDelete);
  }

  _handleLikeBtn() {
    this._cardElement
      .querySelector(".card__heart")
      .classList.toggle("card__heart_active");
  }

  _handleDelete() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._setEventListeners();

    console.log("2");

    return this._cardElement;
  }
}
