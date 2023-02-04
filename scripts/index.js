// подключение dom-элементов
// попапы
const popupProfileElement = document.querySelector('#popup_edit-profile');
const popupAddCardsElement = document.querySelector('#popup_add-cards');
const popupBigPhotoElement = document.querySelector('#popup__big-photo');
// формы
const profileForm = document.forms.profile_form;
const cardsForm = document.forms.cards_form;
// инпуты
const nameInput = profileForm.elements.name;
const jobInput = profileForm.elements.job;
const placeInput = cardsForm.elements.place;
const linkInput = cardsForm.elements.link;
// поля профиля
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
// кнопки
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
  document.addEventListener('keydown', closeByEscape);
  popup.addEventListener('mousedown', closeByClickOnOverlay);
  popup.addEventListener('click', closeByX);
};

profileEditButton.addEventListener('click', () => {
  openPopup(popupProfileElement);
  insertProfileValues();
});

function openAddCards() {
  openPopup(popupAddCardsElement);
  cardsForm.reset();
  const buttonSave = cardsForm.elements.submit;
  buttonSave.classList.add('popup__save-button_inactive');
  buttonSave.setAttribute('disabled', true);
}
cardsAddButton.addEventListener('click', openAddCards);
// инпуты сразу заполнены при открытии
function insertProfileValues() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}
// сохранение информации из инпутов для профиля
profileForm.addEventListener('submit', (submitFormHandler) => {
  submitFormHandler.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfileElement);
});
// общая функция закрытия попапов
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
  popup.removeEventListener('mousedown', closeByClickOnOverlay);
  popup.removeEventListener('click', closeByX);
}
// закрытие попапов по крестику
function closeByX(evt) {
  if (evt.target.classList.contains('popup__close-button')) {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}
// закрытие попапов по esc
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}
// закрытие попапов по оверлею
function closeByClickOnOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}
// добавление карточек + открытие большой картинки
function createCard(card) {
  const templateCloneElement = cardTemplate.cloneNode(true);
  const cardImage = templateCloneElement.querySelector('.element__image');
  const cardImageName = templateCloneElement.querySelector('.element__text');

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardImageName.textContent = card.name;

  cardImage.addEventListener('click', function () {
    bigPhoto.src = card.link;
    bigPhoto.alt = card.name;
    bigPhotoCaption.textContent = card.name;
    openPopup(popupBigPhotoElement);
  });
  return templateCloneElement;
}
// сохранение информации из инпутов для добавления карточки
cardsForm.addEventListener('submit', (submitFormHandler) => {
  submitFormHandler.preventDefault();
  const cardValues = createCard({
    name: placeInput.value,
    link: linkInput.value,
  });

  cardsContainer.prepend(cardValues);
  cardsForm.reset();
  closePopup(popupAddCardsElement);
});
// лайки
cardsContainer.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('element__like')) {
    evt.target.classList.toggle('element__like_active');
  }
});
// удаление карточки
cardsContainer.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('element__delete-button')) {
    evt.target.closest('.element').remove();
  }
});
// обработка и перебор массива
function renderCard() {
  initialCards.forEach((item) => {
    const cardCreation = createCard(item);
    cardsContainer.prepend(cardCreation);
  });
}

renderCard();