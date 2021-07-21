import { isEscapePressed } from '../utils.js';

const EVENT_HANDLER_OPTIONS = { once: true };

const destroyElement = (element) => {
  if (element.parentNode) {
    element.parentNode.removeChild(element);
  }
};

const showSuccessMessage = () => {
  const successSection = document
    .querySelector('#success')
    .content.querySelector('.success')
    .cloneNode(true);

  document.body.appendChild(successSection);

  const onEscapeKeydown = (evt) => {
    if (isEscapePressed(evt)) {
      destroyElement(successSection);
    }
  };

  const onSuccessSectionClick = () => {
    destroyElement(successSection);
    document.removeEventListener('keydown', onEscapeKeydown);
  };

  document.addEventListener('keydown', onEscapeKeydown);
  successSection.addEventListener('click', onSuccessSectionClick);
};

const showErrorMessage = () => {
  const errorSection = document
    .querySelector('#error')
    .content.querySelector('.error')
    .cloneNode(true);

  document.body.appendChild(errorSection);

  const onEscapeKeydown = (evt) => {
    if (isEscapePressed(evt)) {
      destroyElement(errorSection);
    }
  };

  const onErrorSectionClick = () => {
    destroyElement(errorSection);
    document.removeEventListener('keydown', onEscapeKeydown);
  };

  document.addEventListener('keydown', onEscapeKeydown);
  errorSection.addEventListener(
    'click',
    onErrorSectionClick,
    EVENT_HANDLER_OPTIONS,
  );
};

const showLoadingMessage = () => {
  const messageLoading = document
    .querySelector('#messages').content
    .querySelector('.img-upload__message--loading')
    .cloneNode(true);
  document.body.appendChild(messageLoading);
};

const hideLoadingMessage = () => {
  const messageLoading = document
    .querySelector('.img-upload__message--loading');
  if (messageLoading) {
    messageLoading.parentElement.removeChild(messageLoading);
  }
};

export {
  showSuccessMessage,
  showErrorMessage,
  showLoadingMessage,
  hideLoadingMessage
};
