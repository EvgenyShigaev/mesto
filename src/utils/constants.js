// export const initialCards = [
//   {
//     name: 'г. Выборг',
//     link: 'https://images.unsplash.com/photo-1536012354193-8bb300dc3ce6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
//   },
//   {
//     name: 'г. Судак',
//     link: 'https://images.unsplash.com/photo-1565342403875-07a8dc5ed13c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
//   },
//   {
//     name: 'Рускеала',
//     link: 'https://images.unsplash.com/photo-1573156667506-115190c68737?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
//   },
//   {
//     name: 'Алтай',
//     link: 'https://images.unsplash.com/photo-1626538481998-0629afebd684?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
//   },
//   {
//     name: 'Северная Осетия',
//     link: 'https://images.unsplash.com/photo-1653629154311-6ed0256d5782?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
//   },
//   {
//     name: 'Байкал',
//     link: 'https://images.unsplash.com/photo-1552588353-09a1c9524f49?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
//   }
// ]

export const validation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};
// попапы
export const popupEditProfile = document.querySelector('#popup_edit-profile');
export const popupAddCards = document.querySelector('#popup_add-cards');
export const popupAvatar = document.querySelector('#popup_edit-avatar');
export const popupConfirmDelete = document.querySelector('#popup_confirm-delete');
export const popupBigImage = document.querySelector('#popup__big-photo');
// формы
export const profileForm = document.forms.profile_form;
export const cardsForm = document.forms.cards_form;
export const avatarForm = document.forms.avatar_form;
export const confirmDeleteForm = document.forms.confirm_delete;
// инпуты
export const nameInput = profileForm.elements.name;
export const jobInput = profileForm.elements.job;
// поля для редактирования
export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__job');
export const profileAvatar = document.querySelector('.profile__avatar');
// кнопки
export const elementOpenButtonProfile = document.querySelector('.profile__edit-button');
export const cardsAddButton = document.querySelector('.profile__add-button');
export const elementsCloseButton = document.querySelectorAll('.popup__close-button');
export const elementAvatarButton = document.querySelector('.profile__avatar-button');
// карточки
export const cardsSection = document.querySelector('.elements__container');
