// исходные карточки
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
const addCardsButton = document.querySelector('.profile__add-button');
// контейнер с карточками и темплейт
const cardsContainer = document.querySelector('.elements__container');
const addTemplate = document.querySelector('.template__element').content.querySelector('.element').cloneNode(true);
// большая картинка и ее подпись
const bigPhoto = popupBigPhotoElement.querySelector('.popup__photo');
const bigPhotoCaption = popupBigPhotoElement.querySelector('.popup__photo-caption');

// открытие попапов + слушатели
function openPopup(popup) {
  popup.classList.toggle('popup_opened');
};

profileEditButton.addEventListener('click', () => {
  openPopup(popupProfileElement);
  profileValues();
});

addCardsButton.addEventListener('click', () => {
  openPopup(popupAddCardsElement);
});
// инпуты сразу заполнены при открытии
function profileValues() {
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
  popup.classList.toggle('popup_opened');
}

popupCloseButton.forEach((close) => {
  const popupElement = close.closest('.popup');
  close.addEventListener('click', () => closePopup(popupElement))
});
// добавление карточек + слушатели взаимодействия с ними
function newCard(card) {
  const addCards = addTemplate.cloneNode(true);
  const cardImage = addCards.querySelector('.element__image');
  const cardImageName = addCards.querySelector('.element__text');
  const cardImageLike = addCards.querySelector('.element__like');
  const cardDeleteButton = addCards.querySelector('.element__delete-button');

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

  return addCards;
}
// сохранение информации из инпутов для добавления карточки
popupCardsFormElement.addEventListener('submit', (submitFormHandler) => {
  submitFormHandler.preventDefault();
  const createCard = newCard({
    name: placeInput.value,
    link: linkInput.value,
  });

  cardsContainer.prepend(createCard);
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
    const addCard = newCard(item);
    cardsContainer.prepend(addCard);
  });
}

renderCard();