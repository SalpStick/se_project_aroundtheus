import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupImage = this._popupElement.querySelector(".modal__image");
    this._popupTitle = this._popupElement.querySelector(".modal__title");
  }

  open(title, link) {
    this._popupImage.src = link;
    this._popupImage.alt = title;
    this._popupTitle.textContent = title;
    super.open();
  }
}
