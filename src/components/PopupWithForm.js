import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleSubmitForm = handleSubmitForm;
    this._inputs = this._popupElement.querySelectorAll(".modal__input");
    this._submitButton = this._popupElement.querySelector(".modal__button");
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  _getInputValues() {
    const inputValues = {};
    this._inputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();

      const inputValues = this._getInputValues();
      this._handleSubmitForm(inputValues);
    });
  }

  setInputValues(data) {
    this._inputs.forEach((input) => {
      input.value = data[input.name];
    });
  }

  renderSaving(saving) {
    if (saving) {
      this._submitButton.textcontent = "Saving...";
    } else {
      this._submitButton.textcontent = "Save";
    }
  }
}
