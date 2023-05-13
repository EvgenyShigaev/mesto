import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._popupPhoto = this._popupElement.querySelector('.popup__photo');
    this._popupPhotoCaption = this._popupElement.querySelector('.popup__photo-caption');
  }
  //
  open(link, name) {
    super.open();
    this._popupPhoto.alt = name;
    this._popupPhoto.src = link;
    this._popupPhotoCaption.textContent = name;
  }
}