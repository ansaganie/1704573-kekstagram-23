import { onEscapeKeydown } from './picture-edit.js';
import { debounce, hasDuplicateElements } from '../utils.js';
import { sendForm } from '../api.js';
import {
  hideLoadingMessage,
  showErrorMessage,
  showLoadingMessage,
  showSuccessMessage
} from './success-error.js';

const HASHTAG_MAX_LENGTH = 20;
const HASHTAG_MAX_COUNT = 5;
const HASHTAG_PATTERN = /^#[a-zа-я0-9]{1,19}$/;

const uploadForm = document.querySelector('.img-upload__form');
const hashtagsInput = uploadForm.querySelector('.text__hashtags');
const descriptionInput = uploadForm.querySelector('.text__description');
const hashtagsErrorMessage = uploadForm.querySelector(
  '.hashtags__error-message',
);
const descriptionErrorMessage = uploadForm.querySelector(
  '.description__error-message',
);

const onHashtagsOrDescriptionFocus = () => {
  document.removeEventListener('keydown', onEscapeKeydown);
};

const onHashtagsOrDescriptionBlur = () => {
  document.addEventListener('keydown', onEscapeKeydown);
};

const isHashtagsValid = (input) => {
  if (input.length > HASHTAG_MAX_COUNT) {
    return 'нельзя указать больше пяти хэш-тегов';
  }

  if (hasDuplicateElements(input)) {
    return 'один и тот же хэш-тег не может быть использован дважды';
  }

  for (const hashtag of input) {
    if (!hashtag.startsWith('#')) {
      return 'хэш-тег начинается с символа # (решётка)';
    }

    if (hashtag === '#') {
      return 'хеш-тег не может состоять только из одной решётки';
    }

    if (hashtag.length > HASHTAG_MAX_LENGTH) {
      return 'максимальная длина одного хэш-тега 20 символов, включая решётку';
    }

    if (!HASHTAG_PATTERN.test(hashtag)) {
      return 'хеш-тег может состоять только из букв и чисел';
    }
  }

  return 'valid';
};

const isDescriptionValid = (input) => {
  if (input.length > 140) {
    return 'длина комментария не может составлять больше 140 символов';
  }

  return 'valid';
};

const validateInput = (inputElement, messageElement, message) => {
  if (message !== 'valid') {
    messageElement.textContent = message;
    inputElement.classList.add('invalid');
    return false;
  } else {
    messageElement.textContent = '';
    inputElement.classList.remove('invalid');
    return true;
  }
};

const validateHashtags = () => {
  if (hashtagsInput.value.length === 0) {
    return validateInput(
      hashtagsInput,
      descriptionErrorMessage,
      'valid');
  }

  const hashtagsSpilted = hashtagsInput.value
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ');

  return validateInput(
    hashtagsInput,
    hashtagsErrorMessage,
    isHashtagsValid(hashtagsSpilted),
  );
};

const validateDescription = () =>
  validateInput(
    descriptionInput,
    descriptionErrorMessage,
    isDescriptionValid(descriptionInput.value),
  );

const onFormSubmit = (evt) => {
  evt.preventDefault();
  const validHashtags = validateHashtags();
  const validDescription = validateDescription();

  if (validHashtags && validDescription) {
    hashtagsErrorMessage.classList.add('hidden');
    descriptionErrorMessage.classList.add('hidden');
    sendForm(
      new FormData(uploadForm),
      showLoadingMessage,
      hideLoadingMessage,
      showSuccessMessage,
      showErrorMessage,
    );
  } else {
    hashtagsErrorMessage.classList.remove('hidden');
    descriptionErrorMessage.classList.remove('hidden');
  }
};

const onHashtagsInput = () => {
  hashtagsErrorMessage.classList.add('hidden');
  descriptionErrorMessage.classList.add('hidden');
  validateHashtags();
};

const onDescriptionInput = () => {
  hashtagsErrorMessage.classList.add('hidden');
  descriptionErrorMessage.classList.add('hidden');
  validateDescription();
};

uploadForm.addEventListener('submit', onFormSubmit);
hashtagsInput.addEventListener('input', debounce(onHashtagsInput));
descriptionInput.addEventListener('input', debounce(onDescriptionInput));

hashtagsInput.addEventListener('focus', onHashtagsOrDescriptionFocus);
hashtagsInput.addEventListener('blur', onHashtagsOrDescriptionBlur);
descriptionInput.addEventListener('focus', onHashtagsOrDescriptionFocus);
descriptionInput.addEventListener('blur', onHashtagsOrDescriptionBlur);
