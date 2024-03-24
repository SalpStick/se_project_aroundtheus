import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitFunction) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._formSubmitFunction = formSubmitFunction;
    this._inputs = this._popupElement.querySelector(".modal__input");
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
      this._formSubmitFunction(inputValues);
    });
  }

  setInputValues(data) {
    this._inputs.forEach((input) => {
      input.value = data[input.name];
    });
  }
}
