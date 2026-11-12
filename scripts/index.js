const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const editProfileBtn = document.querySelector(".profile__edit-button");
const editModal = document.querySelector("#edit-popup");
const editProfileCloseBtn = editModal.querySelector(".popup__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const inputName = editModal.querySelector(".popup__input_type_name");
const inputDescription = editModal.querySelector(
  ".popup__input_type_description",
);

const container = document.querySelector(".content");
const cardsContainer = container.querySelector(".cards__list");

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

const newCardBtn = document.querySelector(".profile__add-button");
const newCardModal = document.querySelector("#new-card-popup");
const newCardCloseBtn = newCardModal.querySelector(".popup__close");
const cardInputTitle = newCardModal.querySelector(
  ".popup__input_type_card-name",
);
const cardInputLink = newCardModal.querySelector(".popup__input_type_url");

const imageModal = document.querySelector("#image-popup");
const imagePopup = imageModal.querySelector(".popup__image");
const imageCaption = imageModal.querySelector(".popup__caption");
const imagePopupClose = imageModal.querySelector(".popup__close");

const editProfileForm = document.getElementById("edit-profile-form");
const inputsProfile = editProfileForm.querySelectorAll(".popup__input");

const profileForm = editModal.querySelector(".popup__form");

const submitProfileButton = editModal.querySelector(".popup__button");

const cardForm = newCardModal.querySelector(".popup__form");

const newCardForm = document.getElementById("new-card-form");
const inputsNewCard = newCardForm.querySelectorAll(".popup__input");

const submitNewCardButton = newCardModal.querySelector(".popup__button");

let currentEscHandler;

function clearErrorsForm(formElement) {
  const inputs = formElement.querySelectorAll(".popup__input");

  inputs.forEach((inputElement) => {
    hideInputError(inputElement, formElement);
  });
}

function openModal(modalElement) {
  modalElement.classList.add("popup_is-opened");
  currentEscHandler = escKeyPressed(modalElement);
  clickOutside(modalElement);
}

function closeModal(modalElement) {
  modalElement.classList.remove("popup_is-opened");
  if (currentEscHandler) {
    document.removeEventListener("keydown", currentEscHandler);
    currentEscHandler = null; // Limpa a referência
  }
}

function fillProfileForm() {
  inputName.value = profileTitle.textContent;
  inputDescription.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  clearErrorsForm(editProfileForm);
  fillProfileForm();
  openModal(editModal);
  toggleButtonState(submitProfileButton, [inputName, inputDescription]);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;

  closeModal(editModal);
}

function handleCardLike(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

function handleCardImage(name, link) {
  imagePopup.src = link;
  imagePopup.alt = name;
  imageCaption.textContent = name;
  openModal(imageModal);
}

function getCardElement(name, link) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const cardLikeBtn = cardElement.querySelector(".card__like-button");
  const cardDelBtn = cardElement.querySelector(".card__delete-button");

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  cardLikeBtn.addEventListener("click", (evt) => handleCardLike(evt));
  cardDelBtn.addEventListener("click", () => cardElement.remove());
  cardImage.addEventListener("click", () => handleCardImage(name, link));

  return cardElement;
}

function renderCard(name, link, container) {
  const cardEl = getCardElement(name, link);
  container.append(cardEl);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const name = cardInputTitle.value;
  const link = cardInputLink.value;

  const cardEl = getCardElement(name, link);

  cardsContainer.prepend(cardEl);

  closeModal(newCardModal);
}

function showInputError(inputElement, errorMessage, form) {
  const errorElement = form.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__error_visible");
}

function hideInputError(inputElement, form) {
  const errorElement = form.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("popup__input_type_error");
  errorElement.textContent = "";
  errorElement.classList.remove("popup__error_visible");
}

function toggleButtonState(button, inputs) {
  const allValid = Array.from(inputs).every((input) => input.validity.valid);
  button.disabled = !allValid;
}

function clickOutside(modalElement) {
  function handleDocumentClick(evt) {
    if (evt.target === modalElement) {
      closeModal(modalElement);
      document.removeEventListener("click", handleDocumentClick);
    }
  }

  document.addEventListener("click", handleDocumentClick);
}

function escKeyPressed(modalElement) {
  function handleEscClose(evt) {
    if (evt.key === "Escape") {
      closeModal(modalElement);
      document.removeEventListener("keydown", handleEscClose);
    }
  }
  document.addEventListener("keydown", handleEscClose);
  return handleEscClose;
}

editProfileBtn.addEventListener("click", () => handleOpenEditModal());
editProfileCloseBtn.addEventListener("click", () => closeModal(editModal));
profileForm.addEventListener("submit", (evt) => handleProfileFormSubmit(evt));

newCardBtn.addEventListener("click", () => {
  newCardForm.reset();
  toggleButtonState(submitNewCardButton, [cardInputTitle, cardInputLink]);
  clearErrorsForm(newCardForm);
  openModal(newCardModal);
});

newCardCloseBtn.addEventListener("click", () => closeModal(newCardModal));
cardForm.addEventListener("submit", (evt) => handleCardFormSubmit(evt));

imagePopupClose.addEventListener("click", () => closeModal(imageModal));

initialCards.forEach((card) => {
  renderCard(card.name, card.link, cardsContainer);
});

inputsProfile.forEach((input) => {
  input.addEventListener("input", () => {
    if (!input.validity.valid) {
      showInputError(input, input.validationMessage, editProfileForm);
    } else {
      hideInputError(input, editProfileForm);
    }
    toggleButtonState(submitProfileButton, inputsProfile);
  });
});

inputsNewCard.forEach((input) => {
  input.addEventListener("input", () => {
    if (!input.validity.valid) {
      showInputError(input, input.validationMessage, newCardForm);
    } else {
      hideInputError(input, newCardForm);
    }
    toggleButtonState(submitNewCardButton, inputsNewCard);
  });
});
