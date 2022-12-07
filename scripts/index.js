// подключение dom-элементов
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const popupFormElement = popupElement.querySelector('.popup__form');
const nameInput = popupElement.querySelector('.popup__input_data_name');
const jobInput = popupElement.querySelector('.popup__input_data_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

// открытие попапа
const openPopup = function() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  popupElement.classList.toggle('popup_opened');
}

// сохранение информации из инпутов
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup();
}

// закрытие попапа
const closePopup = function() {
  popupElement.classList.toggle('popup_opened');
}

// регистрация обработчиков по клику
popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
popupFormElement.addEventListener('submit', formSubmitHandler);