export default class Popup {
  constructor(popupElement) {
    this._popupElement = popupElement;
    this._handleEscClose = this._handleEscClose.bind(this);
  }
//
  open() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }
//
  close() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }
//
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
//
  setEventListeners() {
    const btnClose = this._popupElement.querySelector('.popup__close-button');
    btnClose.addEventListener('click', () => this.close());

    this._popupElement.addEventListener('mousedown', (evt) => {
      const classes = evt.target.classList;
      if (classes.contains('popup')) {
        this.close();
      }
    });
  }
}