const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaraunt terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

const editProfileBtn = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);

const newPostBtn = document.querySelector(".profile__new-post-button");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostForm = newPostModal.querySelector(".modal__form");
const cardImageInput = newPostModal.querySelector("#card-image-input");
const cardCaptionInput = newPostModal.querySelector("#card-caption-input");

const previewModal = document.querySelector("#preview-modal");
const previewCloseBtn = previewModal.querySelector(".modal__close");
const previewImage = previewModal.querySelector(".modal__image");
const previewDescription = previewModal.querySelector(".modal__description");

previewCloseBtn.addEventListener("click", () => {
  closeModal(previewModal);
});

const profileNameElement = document.querySelector(".profile__name");
const profileDescriptionElement = document.querySelector(
  ".profile__description"
);

const cardContainer = document.querySelector(".card-container");

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  const cardLikeBtn = cardElement.querySelector(".card__like-button");
  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__like-button_active");
  });

  const cardDeleteBtn = cardElement.querySelector(".card__delete-button");
  cardDeleteBtn.addEventListener("click", () => {
    cardDeleteBtn.closest(".card").remove();
  });

  cardImage.addEventListener("click", () => {
    previewImage.src = data.link;
    previewImage.alt = data.name;
    previewDescription.textContent = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

function openModal(modal) {
  modal.classList.add("modal__is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal__is-opened");
}

editProfileBtn.addEventListener("click", function () {
  openModal(editProfileModal);
  editProfileNameInput.value = profileNameElement.textContent;
  editProfileDescriptionInput.value = profileDescriptionElement.textContent;
});

editProfileCloseBtn.addEventListener("click", () => {
  closeModal(editProfileModal);
});

newPostBtn.addEventListener("click", () => {
  openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", () => {
  closeModal(newPostModal);
});

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  profileNameElement.textContent = editProfileNameInput.value;
  profileDescriptionElement.textContent = editProfileDescriptionInput.value;
  closeModal(editProfileModal);
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

function handleNewPostSubmit(evt) {
  evt.preventDefault();
  const inputValues = {
    name: cardCaptionInput.value,
    link: cardImageInput.value,
  };
  const cardElement = getCardElement(inputValues);
  cardContainer.prepend(cardElement);
  closeModal(newPostModal);
  newPostForm.reset();
}

newPostForm.addEventListener("submit", handleNewPostSubmit);

initialCards.forEach(function (item) {
  const cardElement = getCardElement(item);
  cardContainer.prepend(cardElement);
});
