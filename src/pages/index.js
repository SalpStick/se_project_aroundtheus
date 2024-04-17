import "./index.css";

import Api from "../components/Api.js";
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

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "4e95a33d-e536-4fff-9ea5-7d7d422028a7",
    "Content-Type": "application/json",
  },
});

let section;

api
  .getInitialCards()
  .then((cards) => {
    section = new Section(
      {
        items: cards,
        renderer: (cardData) => {
          const sectionCard = createCard(cardData);
          section.addItem(sectionCard);
        },
      },
      ".cards__list "
    );

    section.renderItems();
  })
  .catch((error) => {
    console.error("Error fetching initial cards", error);
  });

// test

api
  .getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo({
      name: userData.name,
      description: userData.about,
      avatar: userData.url,
    });
  })
  .catch((err) => {
    console.log(err);
  });

const currentUserInfo = new UserInfo(
  selectors.profileTitle,
  selectors.profileDescription
);

const imageModal = new PopupWithImage(selectors.imageModal);
const addCardModal = new PopupWithForm(
  selectors.addCardForm,
  handleCardFormSubmit
);

const deleteModalPopup = new PopupWithForm(
  "#delete-modal-popup",
  handleDeleteButton
);

deleteModalPopup.setEventListeners();

const avatarModalPopup = new PopupWithForm(
  "#modal-avatar-popup",
  handleAvatarFormSubmit
);

// const cardSection = new Section(
//   {
//     renderer: (data) => {
//       const cardElement = createCard(data);
//       document.querySelector(selectors.cardSection).prepend(cardElement);
//     },
//   },
//   selectors.cardSection
// );
const profileEdit = new PopupWithForm(
  selectors.profileEditForm,
  handleProfileFormSubmit
);

const formValidators = {};
const enableValidation = (selectors) => {
  const formList = Array.from(
    document.querySelectorAll(selectors.formSelector)
  );
  formList.forEach((formElement) => {
    const validator = new FormValidator(validationOptions, formElement);
    const formName = formElement.getAttribute("id");

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

// cardSection.renderItems(initialCards);
enableValidation(selectors);
profileEdit.setEventListeners();
addCardModal.setEventListeners();
imageModal.setEventListeners();
avatarModalPopup.setEventListeners();

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

function handleImageClick(title, image) {
  imageModal.open(title, image);
}

function handleAvatarFormSubmit(data) {
  api
    .updateAvatar(data)
    .then((res) => {
      console.log("Avatar updated successfully");
      userInfo.setAvatar(res.avatar);
    })
    .catch((error) => {
      console.error("Error updating avatar:", error);
    });

  avatarModalPopup.close();
}

function handleProfileFormSubmit() {
  const newName = editModalTitleInput.value;
  const newJob = editModalSubtitleInput.value;
  api
    .updateProfile(newName, newJob)
    .then((response) => {
      console.log("Profile updated successfully:", response);
      userInfo.setUserInfo({ name: newName, job: newJob });
    })
    .catch((error) => {
      console.error("Error updating profile:", error);
    });
  editModalPopup.close();
}

function handleCardFormSubmit() {
  api
    .addCard({ name: addCardTitleInput.value, link: addCardUrlInput.value })
    .then((cardData) => {
      // Render the new card
      renderCard(cardData);
      // Close the popup
      addCardPopup.close();
    })
    .catch((error) => {
      console.error("Error adding card:", error);
    });
}

function handleDeleteButton(card) {
  console.log("Deleting card with ID:", card);

  api
    .deleteCard(card._id)
    .then(() => {
      cardSection.handleDeleteCard();
    })
    .catch((error) => {
      console.error("Error deleting card:", error);
    });
}

/*------- Event Listeners --------*/

editProfileButton.addEventListener("click", () => {
  profileEdit.open();
  formValidators["profile-edit-form"].resetValidation();
  setFormInfo(selectors.editFormTitle, selectors.editFormDetails);
});

addCardButton.addEventListener("click", () => {
  addCardModal.open();
  formValidators["add-card-form"].resetValidation();
});
