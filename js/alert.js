import { destroyElement } from './utils.js';

const showDangerAlert = (message) => {
  const alertDanger = document
    .querySelector('#alert-danger')
    .content.querySelector('.alert-danger')
    .cloneNode(true);
  alertDanger.querySelector('.alert-danger__text').textContent = message;
  const onCloseButtonClick = (evt) => {
    evt.preventDefault();
    destroyElement(alertDanger);
  };

  const alertDangerCloseButton = alertDanger.querySelector(
    '.alert-danger__close-button',
  );
  alertDangerCloseButton.addEventListener('click', onCloseButtonClick, {
    once: true,
  });

  document.body.appendChild(alertDanger);
};

export { showDangerAlert };
