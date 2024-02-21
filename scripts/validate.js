function showInputError(formElement, inputElement, errorMessage, options) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(options.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.remove(options.errorClass);
}

function hideInputError(formElement, inputElement, options) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(options.inputErrorClass);
  errorElement.classList.add(options.errorClass);
  errorElement.textContent = "";
}

function checkInputValidity(formElement, inputElement, options) {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      options
    );
  } else {
    hideInputError(formElement, inputElement, options);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const toggleButtonState = (inputList, buttonElement, options) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.remove(options.inactiveButtonClass);
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.add(options.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
};

// function setEventListeners(formElement) {
//   const inputList = formElement.querySelectorAll(".form__input");
//   const buttonElement = formElement.querySelector(".form__submit");
//   console.log("here");

//   toggleButtonState(inputList, buttonElement);

//   inputElement.addEventListener("input", function () {
//     checkInputValidity(formElement, inputElement);
//     toggleButtonState(inputList, buttonElement);
//   });

//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener("input", function () {
//       checkInputValidity(formElement, inputElement);
//       toggleButtonState(inputList, buttonElement);
//     });
//   });
// }

function enableValidation(options) {
  const formList = document.querySelectorAll(options.formSelector);
  formList.forEach((formElement) => {
    const inputList = Array.from(
      formElement.querySelectorAll(options.inputSelector)
    );
    const buttonElement = formElement.querySelector(
      options.submitButtonSelector
    );

    toggleButtonState(inputList, buttonElement, options);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        checkInputValidity(formElement, inputElement, options);
        toggleButtonState(inputList, buttonElement, options);
      });
    });

    // const fieldsetList = formElement.querySelectorAll(".form__set");

    // fieldsetList.forEach((fieldset) => {
    //   setEventListeners(fieldset);
    //   console.log("here");
    // });
  });
}

// enabling validation by calling enableValidation()
// pass all the settings on call

const options = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_enabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_disabled",
};

enableValidation(options);
