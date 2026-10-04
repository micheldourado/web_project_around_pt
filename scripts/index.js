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

initialCards.forEach(function (item) {
  console.log(item.name);
});

const editProfileBtn = document.querySelector(".profile__edit-button");
const editModal = document.querySelector("#edit-popup");
const editProfileCloseBtn = editModal.querySelector(".popup__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const inputName = editModal.querySelector(".popup__input_type_name");
const inputDescription = editModal.querySelector(
  ".popup__input_type_description",
);

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

editProfileBtn.addEventListener("click", () => handleOpenEditModal());
editProfileCloseBtn.addEventListener("click", () => closeModal(editModal));
profileForm.addEventListener("submit", (evt) => handleProfileFormSubmit(evt));
