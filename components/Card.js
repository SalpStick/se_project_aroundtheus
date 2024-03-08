export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._cardElement = this._getTemplate();

    this._likeButton = this._cardElement.querySelector(".card__heart");
    this._trashButton = this._cardElement.querySelector(".card__trash");

    this._cardTitleEl = this._cardElement.querySelector(".card__title");
    this._cardImageEl = this._cardElement.querySelector(".card__image");

    this._cardTitleEl.textContent = this._name;
    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._name;

    this._setEventListeners();

    return this._cardElement;
  }

  _setEventListeners() {
    //like button
    this._likeButton.addEventListener("click", () => this._handleLikeBtn());

    this._trashButton.addEventListener("click", () => this._handleDelete());

    this._cardImageEl.addEventListener("click", () =>
      this._handleImageClick(this._name, this._link)
    );
  }

  _handleLikeBtn() {
    this._likeButton.classList.toggle("card__heart_active");
  }

  _handleDelete() {
    this._cardElement.remove();
    this._cardElement = null;
  }
}
