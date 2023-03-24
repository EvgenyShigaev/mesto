import Card from './Card.js';
import FormValidator from './FormValidator.js';

const initialCards = [
  {
    name: 'г. Выборг',
    link: 'https://images.unsplash.com/photo-1536012354193-8bb300dc3ce6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
  },
  {
    name: 'г. Судак',
    link: 'https://images.unsplash.com/photo-1565342403875-07a8dc5ed13c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
  },
  {
    name: 'Рускеала',
    link: 'https://images.unsplash.com/photo-1573156667506-115190c68737?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
  },
  {
    name: 'Алтай',
    link: 'https://images.unsplash.com/photo-1626538481998-0629afebd684?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
  },
  {
    name: 'Северная Осетия',
    link: 'https://images.unsplash.com/photo-1653629154311-6ed0256d5782?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
  },
  {
    name: 'Байкал',
    link: 'https://images.unsplash.com/photo-1552588353-09a1c9524f49?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
  }
]

const validation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

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

// // вадидация
const formValidatorProfileForm = new FormValidator(validation, profileForm);
formValidatorProfileForm.enableValidation();

const formValidatorCardsForm = new FormValidator(validation, cardsForm);
formValidatorCardsForm.enableValidation();

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
//
function openAddCardPopup() {
  openPopup(popupAddCardsElement);
  cardsForm.reset();
  formValidatorCardsForm.resetValidation();

  // const buttonSave = cardsForm.elements.submit;
  // buttonSave.classList.add('popup__save-button_inactive');
  // buttonSave.setAttribute('disabled', true);
}
cardsAddButton.addEventListener('click', openAddCardPopup);
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
     closePopup(evt.currentTarget);
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
//
function openBigImage(link, name) {
  bigPhoto.src = link;
  bigPhoto.alt = name;
  bigPhotoCaption.textContent = name;
  openPopup(popupBigPhotoElement);
}

function createCard(evt) {
  const card = new Card(evt, '.template__element', openBigImage);
  return card.generateCard();
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
// обработка и перебор массива
function renderCards() {
  initialCards.forEach((item) => {
    const cardCreation = createCard(item);
    cardsContainer.prepend(cardCreation);
  });
}

renderCards();