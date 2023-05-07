export default class Section {
  constructor({ items, renderer }, sectionContainer) {
    this._initialCards = items.reverse();
    this._renderer = renderer;
    this._container = document.querySelector(sectionContainer);
  }
//
  renderItems() {
    this._initialCards.forEach((item) => {
      this._renderer(item);
    });
  }
//
  addItem(element) {
    this._container.prepend(element);
  }
}