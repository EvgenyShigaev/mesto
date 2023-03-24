export default class FormValidator {
  constructor(validation, formElement) {
    this._validation = validation;
    this._formElement = formElement;

    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._validation.inputSelector)
    );
    this._submitButton = this._formElement.querySelector(
      this._validation.submitButtonSelector);
  }
  //
  _showInputError(evt) {
    const errorElement = this._formElement.querySelector(`.${evt.id}-error`);

    evt.classList.add(this._validation.inputErrorClass);
    errorElement.classList.add(this._validation.errorClass);
    errorElement.textContent = evt.validationMessage;
  }
  //
  _hideInputError(evt) {
    const errorElement = this._formElement.querySelector(`.${evt.id}-error`);

    evt.classList.remove(this._validation.inputErrorClass);
    errorElement.classList.remove(this._validation.errorClass);
    errorElement.textContent = '';
  }
  //
  _checkInputValidity(evt) {
    if (!evt.validity.valid) {
      this._showInputError(evt);
    } else {
      this._hideInputError(evt);
    }
  }
  //
  _hasInvalidInput() {
    return this._inputList.some((evt) => {
      return !evt.validity.valid;
    });
  }
  //
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(
        this._validation.inactiveButtonClass
      );
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(
        this._validation.inactiveButtonClass
      );
      this._submitButton.disabled = false;
    }
  }
  //
  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((evt) => {
      evt.addEventListener('input', () => {
        this._checkInputValidity(evt);
        this._toggleButtonState();
      });
    });
  }
  //
  enableValidation() {
    this._setEventListeners();
  }
}