export const initialCards = [
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

export const editProfileButton = document.querySelector("#profile-edit-button");
export const profileEditForm = document.forms["#profile-edit-form"];
export const addCardButton = document.querySelector(".profile__add-button");
export const addCardForm = document.forms["#add-form"];

export const validationOptions = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_disabled",
  inactiveButtonClass: "modal__button_disabled",
  submitButtonSelector: ".modal__button",
};

export const selectors = {
  cardSection: ".cards__list",
  cardTemplate: "#card-template",
  imageModal: "#image-modal",
  addCardForm: "#add-card-modal",
  cardTitleInput: "#add-title-input",
  cardLinkInput: "#add-url-input",
  profileEditForm: "#profile-edit-modal",
  profileDescription: ".profile__description",
  profileTitle: ".profile__name",
  formSelector: ".modal__form",
  editFormTitle: "#profile-title-input",
  editFormDetails: "#profile-description-input",
};
