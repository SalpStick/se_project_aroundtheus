export default class Section {
  constructor({ renderer }, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderItems(data) {
    data.forEach((item) => {
      this.renderCard(item);
    });
  }

  renderCard(card) {
    this._renderer(card);
  }

  addItem(item) {
    this._container.prepend(item);
  }
}
