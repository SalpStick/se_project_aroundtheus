function enableValidation(modal, firstInput, secondInput) {
  var submitButton = modal.querySelector(".modal__button");

  //if either either inputs are not filled in yet it breaks the function
  if (firstInput === "" || secondInput === "") {
    return;
  }

  // Check if both inputs are valid
  if (firstInput.checkValidity() && secondInput.checkValidity()) {
    submitButton.removeAttribute("disabled", true);
    submitButton.classList.add("modal__button_enabled");
  }
  if (!firstInput.checkValidity()) {
    submitButton.setAttribute("disabled", true);
    submitButton.classList.remove("modal__button_enabled");
    showErrorMessage(modal, firstInput);
  } else {
    hideErrorMessage(modal, firstInput);
  }
  if (!secondInput.checkValidity()) {
    submitButton.setAttribute("disabled", true);
    submitButton.classList.remove("modal__button_enabled");
    showErrorMessage(modal, secondInput);
  } else {
    hideErrorMessage(modal, secondInput);
  }
}

function showErrorMessage(modal, inputEl) {
  const errorMessageEl = modal.querySelector("#" + inputEl.id + "-error");
  errorMessageEl.classList.remove("modal__error_disabled");
  errorMessageEl.textContent = inputEl.validationMessage;
  console.log("here");
}

function hideErrorMessage(modal, inputEl) {
  const errorMessageEl = modal.querySelector("#" + inputEl.id + "-error");
  errorMessageEl.classList.add("modal__error_disabled");
}
