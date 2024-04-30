export default class Card {
  constructor(
    { data },
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick,
    handleDislikeClick
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._isLiked = data.isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDislikeClick = handleDislikeClick;
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

    if (this._isLiked) {
      this._likeButton.classList.add("card__heart_active");
    }

    this._setEventListeners();

    return this._cardElement;
  }

  _setEventListeners() {
    //like button
    this._likeButton.addEventListener("click", () => this._handleLikeBtn());

    this._trashButton.addEventListener("click", () =>
      this._handleDeleteClick(this)
    );

    this._cardImageEl.addEventListener("click", () =>
      this._handleImageClick(this._name, this._link)
    );
  }

  _handleLikeBtn() {
    if (!this._isLiked) {
      this._handleLikeClick(this);
    } else {
      this._handleDislikeClick(this);
    }
  }

  toggleLikeBtn() {
    this._likeButton.classList.toggle("card__heart_active");
    this._isLiked = !this._isLiked;
  }

  handleDelete() {
    this._cardElement.remove();
    this._cardElement = null;
  }
}
