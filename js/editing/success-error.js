import { isEscapePressed, destroyElement } from '../utils.js';

const EVENT_HANDLER_OPTIONS = { once: true };

const showSuccessMessage = () => {
  const successNode = document
    .querySelector('#success')
    .content.querySelector('.success')
    .cloneNode(true);

  document.body.appendChild(successNode);

  const onEscapeKeydown = (evt) => {
    if (isEscapePressed(evt)) {
      destroyElement(successNode);
    }
  };

  const onSuccessSectionClick = () => {
    destroyElement(successNode);
    document.removeEventListener('keydown', onEscapeKeydown);
  };

  document.addEventListener('keydown', onEscapeKeydown);
  successNode.addEventListener('click', onSuccessSectionClick);
};

const showErrorMessage = () => {
  const errorNode = document
    .querySelector('#error')
    .content.querySelector('.error')
    .cloneNode(true);

  document.body.appendChild(errorNode);

  const onEscapeKeydown = (evt) => {
    if (isEscapePressed(evt)) {
      destroyElement(errorNode);
    }
  };

  const onErrorSectionClick = () => {
    destroyElement(errorNode);
    document.removeEventListener('keydown', onEscapeKeydown);
  };

  document.addEventListener('keydown', onEscapeKeydown);
  errorNode.addEventListener(
    'click',
    onErrorSectionClick,
    EVENT_HANDLER_OPTIONS,
  );
};

const showLoadingMessage = () => {
  const messageLoadingNode = document
    .querySelector('#messages').content
    .querySelector('.img-upload__message--loading')
    .cloneNode(true);
  document.body.appendChild(messageLoadingNode);
};

const hideLoadingMessage = () => {
  const messageLoadingNode = document
    .querySelector('.img-upload__message--loading');
  if (messageLoadingNode) {
    messageLoadingNode.parentElement.removeChild(messageLoadingNode);
  }
};

export {
  showSuccessMessage,
  showErrorMessage,
  showLoadingMessage,
  hideLoadingMessage
};
