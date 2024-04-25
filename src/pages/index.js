import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupDelete from "../components/PopupDelete.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import {
  initialCards,
  validationOptions,
  selectors,
  editProfileButton,
  addCardButton,
  avatarEditButton,
} from "../utils/constants.js";

import "./index.css";

/*------- Elements --------*/
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "90996786-0396-4a62-b39a-a13824c0c510",
    "Content-Type": "application/json",
  },
});
let section;

const currentUserInfo = new UserInfo(
  selectors.profileTitle,
  selectors.profileDescription,
  document.querySelector(".profile__picture")
);

api
  .getInitialCards()
  .then((cards) => {
    section = new Section(
      {
        renderer: (cardData) => {
          const sectionCard = createCard(cardData);
          section.addItem(sectionCard);
        },
      },
      ".cards__list "
    );
    section.renderItems(cards);
  })
  .catch((error) => {
    console.error("Error fetching initial cards", error);
  });

api
  .getUserInfo()
  .then((userData) => {
    currentUserInfo.setUserInfo({
      name: userData.name,
      description: userData.about,
      avatar: userData.url,
    });
  })
  .catch((err) => {
    console.log(err);
  });

const imageModal = new PopupWithImage(selectors.imageModal);

const addCardModal = new PopupWithForm(
  selectors.addCardForm,
  handleCardFormSubmit
);

const deleteModalPopup = new PopupDelete(
  "#delete-modal-popup",
  handleDeleteButton
);

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
deleteModalPopup.setEventListeners();

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
    handleImageClick,
    handleDeleteClick
  );
  return cardElement.getView();
}

/*------- Event Handlers --------*/

function handleImageClick(title, image) {
  imageModal.open(title, image);
}

function handleDeleteClick(card) {
  deleteModalPopup.open();
  deleteModalPopup.setSubmitHandler(() => {
    function makeRequest() {
      return api.deleteCard(card.getCardId()).then(() => {
        card.delete();
      });
    }

    handleSubmit(makeRequest, deleteConfirmModal, "Deleting...");
  });
}

function handleProfileFormSubmit() {
  const newName = editModalTitleInput.value;
  const newDescription = editModalSubtitleInput.value;
  api
    .updateProfile(newName, newJob)
    .then((response) => {
      console.log("Profile updated successfully:", response);
      currentUserInfo.setUserInfo({
        name: newName,
        description: newDescription,
        avatar: currentUserInfo._avatar,
      });
    })
    .catch((error) => {
      console.error("Error updating profile:", error);
    });
  editModalPopup.close();
}

function handleAvatarFormSubmit(data) {
  api
    .updateAvatar(data)
    .then((res) => {
      console.log("Avatar updated successfully");
      currentUserInfo.setUserInfo({
        name: currentUserInfo._name,
        description: currentUserInfo._description,
        avatar: res.avatar,
      });
    })
    .catch((error) => {
      console.error("Error updating avatar:", error);
    });

  avatarModalPopup.close();
}

function handleCardFormSubmit(inputValues) {
  api
    .addCard({ name: inputValues.title.value, url: inputValues.url.value })
    .then((cardData) => {
      // Render the new card
      createCard(cardData);
      // Close the popup
      addCardModal.close();
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
      card.handleDelete();
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

avatarEditButton.addEventListener("click", () => {
  avatarModalPopup.open();
  formValidators["profile-picture-form"];
});
