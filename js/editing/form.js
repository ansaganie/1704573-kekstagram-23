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

const uploadFormNode = document.querySelector('.img-upload__form');
const hashtagsNode = uploadFormNode.querySelector('.text__hashtags');
const descriptionNode = uploadFormNode.querySelector('.text__description');
const hashtagsErrorMessageNode = uploadFormNode.querySelector(
  '.hashtags__error-message',
);
const descriptionErrorMessageNode = uploadFormNode.querySelector(
  '.description__error-message',
);

const clearValidationMessages = () => {
  hashtagsErrorMessageNode.textContent = '';
  descriptionErrorMessageNode.textContent = '';
  hashtagsNode.classList.remove('invalid');
  descriptionNode.classList.remove('invalid');
};

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
  if (hashtagsNode.value.length === 0) {
    return validateInput(
      hashtagsNode,
      descriptionErrorMessageNode,
      'valid',
    );
  }

  const hashtagsSpilted = hashtagsNode.value
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ');

  return validateInput(
    hashtagsNode,
    hashtagsErrorMessageNode,
    isHashtagsValid(hashtagsSpilted),
  );
};

const validateDescription = () =>
  validateInput(
    descriptionNode,
    descriptionErrorMessageNode,
    isDescriptionValid(descriptionNode.value),
  );

const onFormSubmit = (evt) => {
  evt.preventDefault();
  const validHashtags = validateHashtags();
  const validDescription = validateDescription();

  if (validHashtags && validDescription) {
    hashtagsErrorMessageNode.classList.add('hidden');
    descriptionErrorMessageNode.classList.add('hidden');
    hashtagsNode.value = hashtagsNode.value.toLowerCase();
    sendForm(
      new FormData(uploadFormNode),
      showLoadingMessage,
      hideLoadingMessage,
      showSuccessMessage,
      showErrorMessage,
    );
  } else {
    hashtagsErrorMessageNode.classList.remove('hidden');
    descriptionErrorMessageNode.classList.remove('hidden');
  }
};

const onHashtagsInput = () => {
  hashtagsErrorMessageNode.classList.add('hidden');
  descriptionErrorMessageNode.classList.add('hidden');
  validateHashtags();
};

const onDescriptionInput = () => {
  hashtagsErrorMessageNode.classList.add('hidden');
  descriptionErrorMessageNode.classList.add('hidden');
  validateDescription();
};

uploadFormNode.addEventListener('submit', onFormSubmit);
hashtagsNode.addEventListener('input', debounce(onHashtagsInput));
descriptionNode.addEventListener('input', debounce(onDescriptionInput));

hashtagsNode.addEventListener('focus', onHashtagsOrDescriptionFocus);
hashtagsNode.addEventListener('blur', onHashtagsOrDescriptionBlur);
descriptionNode.addEventListener('focus', onHashtagsOrDescriptionFocus);
descriptionNode.addEventListener('blur', onHashtagsOrDescriptionBlur);

export { clearValidationMessages };
