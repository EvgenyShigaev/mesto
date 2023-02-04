const validation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

const showInputError = (formSelector, inputSelector, errorMessage) => {
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);

  inputSelector.classList.add(validation.inputErrorClass);
  errorElement.classList.add(validation.errorClass);
  errorElement.textContent = errorMessage;
}

const hideInputError = (formSelector, inputSelector) => {
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);

  inputSelector.classList.remove(validation.inputErrorClass);
  errorElement.classList.remove(validation.errorClass);
  errorElement.textContent = '';
}

const checkInputValidity = (formSelector, inputSelector) => {
  if (!inputSelector.validity.valid) {
    showInputError(formSelector, inputSelector, inputSelector.validationMessage);
  } else {
    hideInputError(formSelector, inputSelector);
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputSelector) => {
    return !inputSelector.validity.valid;
  })
}

const toggleButtonState = (inputList, submitButtonSelector) => {
  if (hasInvalidInput(inputList)) {
    submitButtonSelector.classList.add(validation.inactiveButtonClass);
    submitButtonSelector.setAttribute('disabled', true);
  } else {
    submitButtonSelector.classList.remove(validation.inactiveButtonClass);
    submitButtonSelector.removeAttribute('disabled');
  }
}

const setEventListeners = (formSelector) => {
  const inputList = Array.from(formSelector.querySelectorAll(validation.inputSelector));
  const saveButton = formSelector.querySelector(validation.submitButtonSelector);

  toggleButtonState(inputList, saveButton);
  inputList.forEach((inputSelector) => {
    inputSelector.addEventListener('input', () => {
      checkInputValidity(formSelector, inputSelector);
      toggleButtonState(inputList, saveButton);
    });
  });
}

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(validation.formSelector));
  formList.forEach((formSelector) => {
    setEventListeners(formSelector);
  });
}

enableValidation(validation);