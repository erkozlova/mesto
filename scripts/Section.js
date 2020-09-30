export class Section {
  constructor({items, renderer}, containerSelector) {
    this._initialArray = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Вставка всех карточек массива
  renderItems() {
    this._initialArray.forEach(item => {
      this._renderer(item);
    });
  }

  // Вставка эдемента в контейнер
  addItem(item) {
    this._container.prepend(item);
  }
}