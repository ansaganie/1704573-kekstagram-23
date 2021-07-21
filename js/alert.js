import { destroyElement } from './utils.js';

const showDangerAlert = (message) => {
  const alertDangerNode = document
    .querySelector('#alert-danger')
    .content.querySelector('.alert-danger')
    .cloneNode(true);
  alertDangerNode.querySelector('.alert-danger__text').textContent = message;
  const onCloseButtonClick = (evt) => {
    evt.preventDefault();
    destroyElement(alertDangerNode);
  };

  const alertDangerCloseButton = alertDangerNode.querySelector(
    '.alert-danger__close-button',
  );
  alertDangerCloseButton.addEventListener('click', onCloseButtonClick, {
    once: true,
  });

  document.body.appendChild(alertDangerNode);
};

export { showDangerAlert };
