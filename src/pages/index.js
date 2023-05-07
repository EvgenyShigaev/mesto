import './index.css';
import { initialCards } from "../utils/constants.js"; 
import { validation } from "../utils/constants.js"; 
import {
  profileForm,
  cardsForm,
  elementOpenButtonProfile,
  cardsAddButton,
  nameInput,
  jobInput
} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
//
const formValidatorProfileForm = new FormValidator(validation, profileForm);
formValidatorProfileForm.enableValidation();

const formValidatorCardsForm = new FormValidator(validation, cardsForm);
formValidatorCardsForm.enableValidation();
//
const section = new Section({ items: initialCards, renderer}, '.elements__container');
const userInfo = new UserInfo('.profile__name', '.profile__job');
const popupWithForm = new PopupWithForm('#popup_edit-profile', submitProfileForm);
popupWithForm.setEventListeners();

const popupWithFormAddCards = new PopupWithForm('#popup_add-cards', submitAddCards);
popupWithFormAddCards.setEventListeners();

const popupWithImage = new PopupWithImage('#popup__big-photo');
popupWithImage.setEventListeners();
//
elementOpenButtonProfile.addEventListener('click', saveProfileData);
cardsAddButton.addEventListener('click', openAddCards); 
//
function createCard(item) {
  const card = new Card(item, '#template__element', handleCardClick);
    
  return card.generateCard();
}
//
function renderer(item) {
  section.addItem(createCard(item));
}
//
function saveProfileData() {
  formValidatorProfileForm.resetValidation();
  popupWithForm.open();
  const userInfoData = userInfo.getUserInfo();

  nameInput.value = userInfoData.name;
  jobInput.value = userInfoData.job;
}

function submitProfileForm(userData) {
  userInfo.setUserInfo(userData);
  popupWithForm.close();
}

function openAddCards() {
  formValidatorCardsForm.resetValidation();
  popupWithFormAddCards.open();
}

function submitAddCards(cardData) {
  renderer({
    name: cardData.place,
    link: cardData.link
  });
}

function handleCardClick(cardPhotoData) {
  popupWithImage.open(cardPhotoData);
}

section.renderItems();