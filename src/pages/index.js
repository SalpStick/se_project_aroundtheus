import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import {
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
    authorization: "317093d4-9da7-4ac1-bd2d-6d651b36e683",
    "Content-Type": "application/json",
  },
});

const currentUserInfo = new UserInfo(
  selectors.profileTitle,
  selectors.profileDescription,
  ".profile__picture"
);

let section;
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
    });
    currentUserInfo.setAvatar(userData.avatar);
  })
  .catch((err) => {
    console.log(err);
  });

const imageModal = new PopupWithImage(selectors.imageModal);

const addCardModal = new PopupWithForm(
  selectors.addCardForm,
  handleCardFormSubmit
);

const deleteModalPopup = new PopupWithConfirmation("#delete-modal-popup");

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
    handleDeleteClick,
    handleLikeClick,
    handleDislikeClick
  );
  return cardElement.getView();
}

/*------- Event Handlers --------*/

function handleImageClick(title, image) {
  imageModal.open(title, image);
}

function handleProfileFormSubmit(inputs) {
  const newName = inputs.name;
  const newDescription = inputs.description;
  profileEdit.renderSaving(true);
  api
    .updateUserInfo(newName, newDescription)
    .then((response) => {
      console.log("Profile updated successfully:", response);
      currentUserInfo.setUserInfo({
        name: newName,
        description: newDescription,
      });

      profileEdit.close();
    })
    .catch((error) => {
      console.error("Error updating profile:", error);
    })
    .finally(() => {
      profileEdit.renderSaving(false);
    });
}

function handleAvatarFormSubmit(data) {
  avatarModalPopup.renderSaving(true);
  api
    .updateAvatar(data)
    .then((res) => {
      console.log("Avatar updated successfully");
      currentUserInfo.setAvatar(res.avatar);

      avatarModalPopup.close();
    })
    .catch((error) => {
      console.error("Error updating avatar:", error);
    })
    .finally(() => {
      avatarModalPopup.renderSaving(false);
    });
}

function handleCardFormSubmit(inputValues) {
  addCardModal.renderSaving(true);
  api
    .addCard({ name: inputValues.title, url: inputValues.url })
    .then((cardData) => {
      createCard(cardData);

      section.renderCard(cardData);

      addCardModal.close();
    })
    .catch((error) => {
      console.error("Error adding card:", error);
    })
    .finally(() => {
      addCardModal.renderSaving(false);
    });
}

function handleDeleteClick(card) {
  deleteModalPopup.open();
  deleteModalPopup.setSubmitHandler(() => {
    deleteModalPopup.renderLoading(true, "Deleting...");
    api
      .deleteCard(card._id)
      .then(() => {
        card.handleDelete();
        console.log("Deleting card:", card);
        deleteModalPopup.close();
      })
      .catch(console.error)
      .finally(() => {
        deleteModalPopup.renderLoading(false, "");
      });
  });
}

// function handleDeleteSubmit(deleteRequest) {
//   deleteModalPopup.renderLoading(true);
//   deleteRequest()
//     .then(() => {
//       deleteModalPopup.close();
//     })
//     .catch(console.error);

//   deleteModalPopup.renderLoading(false);
// }

function handleLikeClick(card) {
  api
    .likeCard(card._id)
    .then(() => {
      card.toggleLikeBtn();
      console.log(card._id + " has been liked");
    })
    .catch(console.error);
}

function handleDislikeClick(card) {
  api.dislikeCard(card._id);
  then(() => {
    card.toggleLikeBtn();
    console.log(card._id + " has been disliked");
  }).catch(console.error);
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
  formValidators["profile-picture-form"].resetValidation();
});
