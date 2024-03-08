import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },

  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },

  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },

  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },

  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },

  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// const cardData = {
//   name: "Yosemite Valley",
//   link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
// };

// const card = new Card(cardData, "#card-template");

/*------- Elements --------*/

const profileEditBtn = document.querySelector("#profile-edit-button");
const addCardBtn = document.querySelector(".profile__add-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const profileEditContainer =
  profileEditModal.querySelector(".modal__container");
const addCardContainer = addCardModal.querySelector(".modal__container");
const imageModal = document.querySelector("#image-modal");
const imageContainer = imageModal.querySelector(".modal__container_image");
const profileEditClose = profileEditModal.querySelector(
  "#profile-close-button"
);
const addCardClose = addCardModal.querySelector("#add-close-button");
const imageClose = imageModal.querySelector("#image-close-button");
const profileTitle = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardForm = document.querySelector("#add-form");
const cardTitleInput = document.querySelector("#add-title-input");
const cardUrlInput = document.querySelector("#add-url-input");
const imageSource = imageModal.querySelector(".modal__image");
const imageTitle = imageModal.querySelector(".modal__title");
const cardListEl = document.querySelector(".cards__list");

const cardSelector = "#card-template";

const validationOptions = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_disabled",
  inactiveButtonClass: "modal__button_enabled",
  submitButtonSelector: ".modal__button",
};

const editFormValidator = new FormValidator(validationOptions, profileEditForm);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(validationOptions, addCardForm);
addFormValidator.enableValidation();

/*------- Functions --------*/

function closePopup(modal) {
  modal.classList.remove("modal_opened");

  //makes submit button invalid
  //modal.querySelector(".modal__btn").classList.remove(".modal__button_enabled");

  document.removeEventListener("keydown", closeModalEscape);
}

function openPopup(modal) {
  modal.classList.add("modal_opened");

  //makes submit button invalid
  //modal.querySelector(".modal__btn").classList.remove(".modal__button_enabled");

  document.addEventListener("keydown", closeModalEscape);
}

function createCard(cardData) {
  const card = new Card(cardData, cardSelector, handleImageClick);
  return card.getView();
}

function renderCard(cardData, wrapper) {
  const cardElement = createCard(cardData);
  wrapper.prepend(cardElement);
}

/*------- Event Handlers --------*/

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;

  editFormValidator.disableSubmitButton();

  closePopup(profileEditModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;

  renderCard({ name, link }, cardListEl, handleImageClick);
  addCardForm.reset();

  addFormValidator.disableSubmitButton();

  closePopup(addCardModal);
}

function closeModalOutside(modal, form, e) {
  if (e.target !== form && !form.contains(e.target)) {
    closePopup(modal);
  }
}

function closeModalEscape(e) {
  if (e.key === "Escape") {
    const modal = document.querySelector(".modal_opened");
    closePopup(modal);
  }
}

function handleImageClick(name, link) {
  imageSource.src = link;
  imageSource.alt = name;
  imageTitle.textContent = name;

  openPopup(imageModal);
}

/*------- Event Listeners --------*/

/*------- Profile Edit --------*/
profileEditModal.addEventListener("click", (evt) =>
  closeModalOutside(profileEditModal, profileEditContainer, evt)
);
profileEditBtn.addEventListener("click", function () {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});
profileEditClose.addEventListener("click", () => closePopup(profileEditModal));
profileEditForm.addEventListener("submit", handleProfileEditSubmit);

/*------- Add Card --------*/
addCardModal.addEventListener("click", (evt) =>
  closeModalOutside(addCardModal, addCardContainer, evt)
);
addCardBtn.addEventListener("click", () => openPopup(addCardModal));
addCardClose.addEventListener("click", () => closePopup(addCardModal));
addCardForm.addEventListener("submit", handleAddCardSubmit);

/*------- Image Popup --------*/
imageClose.addEventListener("click", () => closePopup(imageModal));
imageModal.addEventListener("click", (evt) =>
  closeModalOutside(imageModal, imageContainer, evt)
);

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));