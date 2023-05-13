import Popup from './Popup';

export default class PopupWithSubmit extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._form = this._popupElement.querySelector('.popup__form');
    this._buttonSubmit = this._form.querySelector('.popup__save-button');
    this._buttonSubmitText = this._buttonSubmit.textContent;
  }
  //
  submitHandler(action) {
    this._handleSubmit = action;
  }
  //
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit();
    });
  }
  //
  deleting(isLoading) {
    if (isLoading) {
      this._buttonSubmit.textContent = 'Удаление...';
    } else {
      this._buttonSubmit.textContent = this._buttonSubmitText;
    }
  }
}