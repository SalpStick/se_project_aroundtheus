export default class Section {
  constructor(renderer, selector) {
    this._renderer = renderer;
    this._selector = selector;
  }

  renderItems(data) {
    data.forEach((item) => {
      this._element = this._renderer(item);
      this.addItem(this._element);
    });
  }

  addItem(item) {
    this._list = document.querySelector(this._selector);
    this._list.prepend(item);
  }
}
