// проверка подключен ли скрипт
console.log("check");

// подключение dom-элементов
const popupElement = document.querySelector(".popup");
const popupCloseButtonElement = popupElement.querySelector(".popup__close-button");
const popupOpenButtonElement = document.querySelector(".profile__edit-button");
const popupFormElement = popupElement.querySelector(".popup__form");
const nameInput = popupElement.querySelector(".popup__input_data_name");
const jobInput = popupElement.querySelector(".popup__input_data_job");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");

// открытие попапа
const openPopup = function() {
  popupElement.classList.toggle("popup__opened");
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
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
  popupElement.classList.toggle("popup__opened");
}

// закрытие попапа при нажатии на область вне него
const closePopupByClickOnOverlay = function(event) {
  console.log(event.target, event.currentTarget);
  if (event.target !== event.currentTarget) {
    return;
  }

  closePopup();
}

// регистрация обработчиков по клику
popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
popupElement.addEventListener('click', closePopupByClickOnOverlay);
popupFormElement.addEventListener('submit', formSubmitHandler);