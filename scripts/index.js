// подключение dom-элементов
// попапы
const popupProfileElement = document.querySelector('#popup_edit-profile');
const popupAddCardsElement = document.querySelector('#popup_add-cards');
const popupBigPhotoElement = document.querySelector('#popup__big-photo');
// формы
const popupProfileFormElement = popupProfileElement.querySelector('#popup__profile-form');
const popupCardsFormElement = popupAddCardsElement.querySelector('#popup__cards-form')
// поля профиля
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
// инпуты
const nameInput = popupProfileElement.querySelector('.popup__input_data_name');
const jobInput = popupProfileElement.querySelector('.popup__input_data_job');
const placeInput = popupAddCardsElement.querySelector('.popup__input_data_place');
const linkInput = popupAddCardsElement.querySelector('.popup__input_data_link');
// кнопки
const popupCloseButton = document.querySelectorAll('.popup__close-button');
const profileEditButton = document.querySelector('.profile__edit-button');
const cardsAddButton = document.querySelector('.profile__add-button');
// контейнер с карточками и темплейт
const cardsContainer = document.querySelector('.elements__container');
const cardTemplate = document.querySelector('.template__element').content.querySelector('.element').cloneNode(true);
// большая картинка и ее подпись
const bigPhoto = popupBigPhotoElement.querySelector('.popup__photo');
const bigPhotoCaption = popupBigPhotoElement.querySelector('.popup__photo-caption');

// открытие попапов + слушатели
function openPopup(popup) {
  popup.classList.add('popup_opened');
};

profileEditButton.addEventListener('click', () => {
  openPopup(popupProfileElement);
  insertProfileValues();
});

cardsAddButton.addEventListener('click', () => {
  openPopup(popupAddCardsElement);
});
// инпуты сразу заполнены при открытии
function insertProfileValues() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}
// сохранение информации из инпутов для профиля
popupProfileFormElement.addEventListener('submit', (submitFormHandler) => {
  submitFormHandler.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfileElement);
});
// закрытие попапов + слушатель
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

popupCloseButton.forEach((close) => {
  const popupElement = close.closest('.popup');
  close.addEventListener('click', () => closePopup(popupElement))
});
// добавление карточек + слушатели взаимодействия с ними
function createCard(card) {
  const templateCloneElement = cardTemplate.cloneNode(true);
  const cardImage = templateCloneElement.querySelector('.element__image');
  const cardImageName = templateCloneElement.querySelector('.element__text');
  const cardImageLike = templateCloneElement.querySelector('.element__like');
  const cardDeleteButton = templateCloneElement.querySelector('.element__delete-button');

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardImageName.textContent = card.name;

  cardImageLike.addEventListener('click', addLike);
  cardDeleteButton.addEventListener('click', deleteCard);
  cardImage.addEventListener('click', function () {
    bigPhoto.src = card.link;
    bigPhoto.alt = card.name;
    bigPhotoCaption.textContent = card.name;
    openPopup(popupBigPhotoElement);
  });

  return templateCloneElement;
}
// сохранение информации из инпутов для добавления карточки
popupCardsFormElement.addEventListener('submit', (submitFormHandler) => {
  submitFormHandler.preventDefault();
  const cardValues = createCard({
    name: placeInput.value,
    link: linkInput.value,
  });

  cardsContainer.prepend(cardValues);
  popupCardsFormElement.reset();
  closePopup(popupAddCardsElement);
});
// лайки
const addLike = (evt) => {
  evt.target.classList.toggle('element__like_active');
}
// удаление карточки
const deleteCard = (evt) => {
  evt.target.closest('.element').remove();
}
// обработка и перебор массива
function renderCard() {
  initialCards.forEach((item) => {
    const cardCreation = createCard(item);
    cardsContainer.prepend(cardCreation);
  });
}

renderCard();