import Popup from "./Popup.js";

export default class PopupDelete extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._submitButton = this._popupElement.querySelector(".modal__button");
    this._handleFormSubmit = handleFormSubmit;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit();
    });
    super.setEventListeners();
  }

  renderLoading(loading) {
    if (loading) {
      this._submitButton.textContent = "Deleting...";
    } else {
      this._submitButton.textContent = "delete";
    }
  }
}
