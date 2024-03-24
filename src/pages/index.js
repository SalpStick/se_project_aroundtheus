import "./index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import {
  initialCards,
  validationOptions,
  selectors,
  editProfileButton,
  addCardButton,
} from "../utils/constants.js";

/*------- Elements --------*/

const currentUserInfo = new UserInfo(
  selectors.profileTitle,
  selectors.profileDescription
);

const imageModal = new PopupWithImage(selectors.imageModal);
const addCard = new PopupWithForm(
  selectors.addCardForm,
  handleAddCardFormSubmit
);

const cardSection = new Section(createCard, selectors.cardSection);
const profileEdit = new PopupWithForm(
  selectors.profileEditForm,
  handleProfileFormSubmit
);

const formValidators = {};
const enableValidation = (selectors) => {
  const formList = Array.from(
    document.querySelectorAll(selectors.formsSelector)
  );
  formList.forEach((formElement) => {
    const validator = new FormValidator(validationOptions, formElement);
    const formName = formElement.getAttribute("name");

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

cardSection.renderItems(initialCards);
enableValidation(selectors);
profileEdit.setEventListeners();
addCard.setEventListeners();
imageModal.setEventListeners();

function updateUserInfo({ name, description }) {
  currentUserInfo.setUserInfo({ name, description });
}

function setFormInfo(nameSelector, detailsSelector) {
  const formName = document.querySelector(nameSelector);
  const formDetails = document.querySelector(detailsSelector);
  const { description, name } = currentUserInfo.getUserInfo();
  formName.value = name.trim();
  formDetails.value = description.trim();
}

function createCard(data) {
  const cardElement = new Card(
    { data },
    selectors.cardTemplate,
    handleImageClick
  );
  return cardElement.getView();
}

/*------- Event Handlers --------*/

function handleImageClick(imgData) {
  imageModal.open(imgData);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const { name, description } = profileEdit.formValues;
  updateUserInfo(profileEdit.formValues);

  profileEdit.close();
  formValidators["profile-edit-form"].resetValidation();
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const { title: name, link } = addCard.formValues;

  const cardElement = createCard({ name, link });
  cardSection.addItem(cardElement);

  addCard.resetForm();
  formValidators["add-card-form"].resetValidation();
  addCard.close();
}

/*------- Event Listeners --------*/

editProfileButton.addEventListener("click", () => {
  profileEdit.open();
  setFormInfo(selectors.editFormTitle, selectors.editFormDetails);
});

addCardButton.addEventListener("click", () => {
  addCard.open();
});
