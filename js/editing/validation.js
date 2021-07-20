import { onEscapeKeydown } from './picture-edit.js';
import { debounce, hasDuplicateElements } from '../utils.js';
import { sendForm } from '../api.js';

const HASHTAG_MAX_LENGTH = 20;
const HASHTAG_MAX_COUNT = 5;
const HASHTAG_PATTERN = /^#[a-zа-я0-9]{1,19}$/;

const uploadForm = document.querySelector('.img-upload__form');
const hashtagsInput = uploadForm.querySelector('.text__hashtags');
const descriptionInput = uploadForm.querySelector('.text__description');

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

const validateInput = (element, message) => {
  if (message !== 'valid') {
    element.setCustomValidity(message);
    element.reportValidity();

    return false;
  } else {
    element.setCustomValidity('');
    element.reportValidity();

    return true;
  }
};

const validateHashtags = () => {
  if (hashtagsInput.value.length === 0) {
    return validateInput(hashtagsInput, 'valid');
  }

  const hashtagsSpilted = hashtagsInput.value
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ');
  return validateInput(hashtagsInput, isHashtagsValid(hashtagsSpilted));
};

const validateDescription = () =>
  validateInput(descriptionInput, isDescriptionValid(descriptionInput.value));

const onFormSubmit = (evt) => {
  evt.preventDefault();
  const validHashtags = validateHashtags();
  const validDescription = validateDescription();

  if (validHashtags && validDescription) {
    sendForm(new FormData(uploadForm));
  }
};

const onHashtagsInput = () => {
  validateHashtags();
};

const onDescriptionInput = () => {
  validateDescription();
};

hashtagsInput.addEventListener('focus', onHashtagsOrDescriptionFocus);
hashtagsInput.addEventListener('blur', onHashtagsOrDescriptionBlur);
descriptionInput.addEventListener('focus', onHashtagsOrDescriptionFocus);
descriptionInput.addEventListener('blur', onHashtagsOrDescriptionBlur);
uploadForm.addEventListener('submit', onFormSubmit);
hashtagsInput.addEventListener('input', debounce(onHashtagsInput));
descriptionInput.addEventListener('input', debounce(onDescriptionInput));
