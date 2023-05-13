import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupElement, submitFormHandler) {
    super(popupElement);
    this._submitFormHandler = submitFormHandler;
    this._form = this._popupElement.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');

    this._buttonSubmit = this._form.querySelector('.popup__save-button');
    this._buttonSubmitText = this._buttonSubmit.textContent;
  }
  //
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }
  //
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFormHandler(this._getInputValues());
    });
  }
  //
  close() {
    super.close();
    this._form.reset();
  }
  //
  loading(isLoading) {
    if (isLoading) {
      this._buttonSubmit.textContent = 'Сохранение...';
    } else {
      this._buttonSubmit.textContent = this._buttonSubmitText;
    }
  }
}