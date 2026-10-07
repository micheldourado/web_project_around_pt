let initialCards = [
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
const cardTitle = document.querySelector(".card__title");
const cardImage = document.querySelector(".card__image");
const cardInputTitle = newCardModal.querySelector(
  ".popup__input_type_card-name",
);
const cardInputLink = newCardModal.querySelector(".popup__input_type_url");

const imageModal = document.querySelector("#image-popup");
const imagePopup = imageModal.querySelector(".popup__image");
const imageCaption = imageModal.querySelector(".popup__caption");
const imagePopupClose = imageModal.querySelector(".popup__close");

function openModal(modalElement) {
  modalElement.classList.add("popup_is-opened");
}

function closeModal(modalElement) {
  modalElement.classList.remove("popup_is-opened");
}

function fillProfileForm() {
  inputName.value = profileTitle.textContent;
  inputDescription.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  openModal(editModal);
}

let profileForm = editModal.querySelector(".popup__form");

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

function getCardElement(
  name = "lugar sem nome",
  link = "./images/placeholder.jpg",
) {
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
  imagePopupClose.addEventListener("click", () => closeModal(imageModal));

  return cardElement;
}

function renderCard(name, link, container) {
  const cardEl = getCardElement(name, link);
  container.append(cardEl);
}

let cardForm = newCardModal.querySelector(".popup__form");

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const name = cardInputTitle.value;
  const link = cardInputLink.value;

  const cardEl = getCardElement(name, link);

  cardsContainer.prepend(cardEl);

  closeModal(newCardModal);
}

editProfileBtn.addEventListener("click", () => handleOpenEditModal());
editProfileCloseBtn.addEventListener("click", () => closeModal(editModal));
profileForm.addEventListener("submit", (evt) => handleProfileFormSubmit(evt));

newCardBtn.addEventListener("click", () => openModal(newCardModal));
newCardCloseBtn.addEventListener("click", () => closeModal(newCardModal));
cardForm.addEventListener("submit", (evt) => handleCardFormSubmit(evt));

initialCards.forEach((card) => {
  renderCard(card.name, card.link, cardsContainer);
});
