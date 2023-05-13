import './index.css';
import { avatarForm, validation } from "../utils/constants.js";
import {
  popupEditProfile,
  popupAddCards,
  popupAvatar,
  popupConfirmDelete,
  profileForm,
  cardsForm,
  popupBigImage,
  confirmDeleteForm,
  profileName,
  profileJob,
  profileAvatar,
  elementOpenButtonProfile,
  cardsAddButton,
  elementAvatarButton,
  nameInput,
  jobInput,
  cardsSection
} from '../utils/constants.js';
import Api from '../components/Api.js'
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import UserInfo from '../components/UserInfo.js';

let userId;

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-65",
  headers: {
    "Content-Type": "application/json",
    authorization: "561c351e-1fa6-44a4-8675-268f6f753b23",
  },
});

//
Promise.all([api.getInitialCards(), api.getUserData()])
  .then(([initialCards, user]) => {
    userInfo.setUserInfo(user);
    userId = user._id;
    section.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });

//
const userInfo = new UserInfo({
  name: profileName,
  about: profileJob,
  avatar: profileAvatar
});

//
const section = new Section({
  renderer: (item) => {
    section.addItem(createCard(item));
  },
}, cardsSection);

//
const userDataSubmit = (data) => {
  popupWithForm.loading(true);
  api
    .editUserInfo(data)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupWithForm.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupWithForm.loading(false);
    });
};

//
const addCardsDataSubmit = (data) => {
  popupWithFormAddCards.loading(true);
  api
    .addCard(data)
    .then((data) => {
      section.addItemPrepend(createCard(data));
      popupWithFormAddCards.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupWithFormAddCards.loading(false);
    });
};

//
const openAvatar = (data) => {
  popupWithFormAvatar.loading(true);
  api
    .editProfileAvatar(data)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupWithFormAvatar.close();
    })
    .catch((err) => {
      console.log(
        `Ошибка: ${err}`
      );
    })
    .finally(() => {
      popupWithFormAvatar.loading(false);
    });
};

function openPopupAvatar() {
  popupWithFormAvatar.open();
  formValidatorAvatarForm.resetValidation();
}

elementAvatarButton.addEventListener('click', openPopupAvatar);

//
const createCard = (data) => {
  const card = new Card({
    data: data,
    templateSelector: "#template__element",
    handleCardClick: (link, name) => {
      popupWithImage.open(link, name);
    },
    userId: userId,
    handleDeleteIconClick: (id) => {
      popupDeleteCard.open();
      popupDeleteCard.submitHandler(() => {
        popupDeleteCard.deleting(true);
        api
          .deleteCard(id)
          .then(() => {
            popupDeleteCard.close();
            card.deleteCard();
          })
          .catch((err) => {
            console.log(
              `Ошибка: ${err}`
            );
          })
          .finally(() => {
            popupDeleteCard.deleting(false);
          });
      });
    },
    handleLikeClick: (id) => {
      api
        .addLike(id)
        .then((data) => {
          card.handleCardLike(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    },
    handleRemoveLike: (id) => {
      api
        .deleteLike(id)
        .then((data) => {
          card.handleCardLike(data);
        })
        .catch((err) => {
          console.log(
            `Ошибка: ${err}`
          );
        });
    },
  });
  const cardElement = card.createCard();
  return cardElement;
};

//
function saveProfileData() {
  formValidatorProfileForm.resetValidation();
  popupWithForm.open();
  const userInfoData = userInfo.getUserInfo();

  nameInput.value = userInfoData.name;
  jobInput.value = userInfoData.about;
}

elementOpenButtonProfile.addEventListener('click', saveProfileData);

//
function openAddCards() {
  formValidatorCardsForm.resetValidation();
  popupWithFormAddCards.open();
}

cardsAddButton.addEventListener('click', openAddCards);

//
const formValidatorProfileForm = new FormValidator(validation, profileForm);
formValidatorProfileForm.enableValidation();

const formValidatorCardsForm = new FormValidator(validation, cardsForm);
formValidatorCardsForm.enableValidation();

const formValidatorAvatarForm = new FormValidator(validation, avatarForm);
formValidatorAvatarForm.enableValidation();

const popupWithForm = new PopupWithForm(popupEditProfile, userDataSubmit);
popupWithForm.setEventListeners();

const popupWithFormAddCards = new PopupWithForm(popupAddCards, addCardsDataSubmit);
popupWithFormAddCards.setEventListeners();

const popupWithImage = new PopupWithImage(popupBigImage);
popupWithImage.setEventListeners();

const popupWithFormAvatar = new PopupWithForm(popupAvatar, openAvatar);
popupWithFormAvatar.setEventListeners();

const popupDeleteCard = new PopupWithSubmit(popupConfirmDelete);
popupDeleteCard.setEventListeners();