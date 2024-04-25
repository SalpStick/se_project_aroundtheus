import Popup from "./Popup.js";

export default class PopupDelete extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._submitButton = this._popupElement.querySelector(".modal__button");
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._submitCallback();
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

  setSubmitHandler(handleSubmit) {
    this._submitCallback = handleSubmit;
  }
}
