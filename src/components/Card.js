export default class Card {
  constructor(cardData, templateSelector, handleCardClick) {
    this._cardData = cardData;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }
  //
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }
  //
  generateCard() {
    this._element = this._getTemplate();
    this._cardDelete = this._element.querySelector('.element__delete-button');
    this._cardImage = this._element.querySelector('.element__image');
    this._cardText = this._element.querySelector('.element__text');
    this._cardLike = this._element.querySelector('.element__like');

    this._cardImage.src = this._cardData.link;
    this._cardImage.alt = this._cardData.name;
    this._cardText.textContent = this._cardData.name;

    this._setEventListeners();

    return this._element;
  }
  //
  _handleLike() {
    this._cardLike.classList.toggle('element__like_active');
  }
  //
  _handleDelete() {
    this._element.remove();
    this._element = null
  }
  //
  _setEventListeners() {
    this._cardLike.addEventListener('click', () => {
      this._handleLike();
    });
    this._cardDelete.addEventListener('click', () => {
      this._handleDelete();
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._cardData);
    });
  }
}