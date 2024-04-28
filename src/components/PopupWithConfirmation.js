import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._submitButton = this._popupElement.querySelector(".modal__button");
    this._submitButtonText = this._submitButton.textContent;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._submitCallback();
    });
    super.setEventListeners();
  }

  renderLoading(loading, phrase) {
    if (loading) {
      this._submitButton.textContent = phrase;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  setSubmitHandler(handleSubmit) {
    this._submitCallback = handleSubmit;
  }
}
