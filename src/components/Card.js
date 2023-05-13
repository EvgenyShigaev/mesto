export default class Card {
  constructor({ data,
    templateSelector,
    handleCardClick,
    userId,
    handleLikeClick,
    handleDeleteIconClick,
    handleRemoveLike }) {
    this._link = data.link;
    this._name = data.name;
    this._likes = data.likes;
    this._cardId = data._id;

    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;

    this._userId = userId;
    this._isOwnerCard = data.owner._id === userId;

    this._handleLikeClick = handleLikeClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._handleRemoveLike = handleRemoveLike;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  createCard() {
    this._element = this._getTemplate();
    this._cardDelete = this._element.querySelector('.element__delete-button');
    this._cardImage = this._element.querySelector('.element__image');
    this._cardText = this._element.querySelector('.element__text');
    this._cardLike = this._element.querySelector('.element__like');
    this._cardLikeCounter = this._element.querySelector('.element__like-counter');

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardText.textContent = this._name;

    this._setEventListeners();

    this._userDeleteElement();
    this._userLike();
    this._likeCounter();

    return this._element;
  }

  _userDeleteElement() {
    if (!this._isOwnerCard) {
      this._cardDelete.remove();
    }
  }

  deleteCard() {
    this._element.remove();
  }

  _userLike() {
    if (
      this._likes.some((user) => {
        return this._userId === user._id;
      })
    ) {
      this._cardLike.classList.add('element__like_active');
    }
  }

  handleCardLike(data) {
    this._cardLikeCounter.textContent = data.likes.length;
    this._cardLike.classList.toggle('element__like_active');
  }

  _likeCounter() {
    this._cardLikeCounter.textContent = this._likes.length;
  }

  _setEventListeners() {
    this._cardLike.addEventListener('click', () => {
      if (this._cardLike.classList.contains('element__like_active')) {
        this._handleRemoveLike(this._cardId);
      } else {
        this._handleLikeClick(this._cardId);
      }
    });

    this._cardDelete.addEventListener('click', () => {
      this._handleDeleteIconClick(this._cardId);
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    });
  }
}