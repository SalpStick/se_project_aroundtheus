export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
    document.addEventListener("mousedown", this._closePopupOnOutsideClick);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
    document.removeEventListener("mousedown", this._closePopupOnOutsideClick);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  _closePopupOnOutsideClick = (evt) => {
    if (evt.target.classList.contains("modal_opened")) {
      this.close();
    }
  };

  setEventListeners() {
    this._popupCloseButton = this._popupElement.querySelector(".modal__close");
    this._popupCloseButton.addEventListener("click", () => this.close());
  }
}
