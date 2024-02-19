function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  //inputElement.classList.add("form__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.remove("modal__error_disabled");
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  //inputElement.classList.remove("form__input_type_error");
  errorElement.classList.add("modal__error_disabled");
  errorElement.textContent = "";
}

function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

function hasInvalidInput(inputList) {
  console.log(inputList);
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const toggleButtonState = (inputList, buttonElement) => {
  console.log(hasInvalidInput(inputList));
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("button_inactive");
  } else {
    buttonElement.classList.remove("button_inactive");
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

function enableValidation() {
  const formList = document.querySelectorAll(".modal__form");
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    const inputList = Array.from(formElement.querySelectorAll(".modal__input"));
    const buttonElement = formElement.querySelector(".modal__button");

    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
        console.log("2");
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

// enableValidation({
//   formSelector: ".popup__form",
//   inputSelector: ".popup__input",
//   submitButtonSelector: ".popup__button",
//   inactiveButtonClass: "popup__button_disabled",
//   inputErrorClass: "popup__input_type_error",
//   errorClass: "popup__error_visible",
// });

enableValidation();
