import { drawPictures } from './browsing/pictures.js';
import { closeImgEditModal } from './editing/picture-edit.js';
import { showImgUploadTitle } from './editing/pictures-upload.js';
import { showDangerAlert } from './alert.js';

const MAIN_LINK = 'https://23.javascript.pages.academy/kekstagram';

const api = {
  get: '/data',
  post: '',
};

let pictures;

fetch(MAIN_LINK + api.get)
  .then((response) => response.json())
  .then((data) => {
    pictures = data;
    drawPictures(pictures, 'filter-default');
    showImgUploadTitle();
  })
  .catch(() => {
    showDangerAlert(
      'Фотографии не были загружены с сервера, пожалуйста попробуйте обновить страницу',
    );
  });

const sendForm = (
  formData,
  showLoadingMessage,
  hideLoadingMessage,
  showSuccessMessage,
  showErrorMessage,
) => {
  showLoadingMessage();
  fetch(MAIN_LINK + api.post, {
    method: 'POST',
    credentials: 'same-origin',
    body: formData,
  })
    .then((response) => {
      hideLoadingMessage();
      if (response.ok) {
        closeImgEditModal();
        showSuccessMessage();
      } else {
        closeImgEditModal();
        showErrorMessage();
      }
    })
    .catch(() => {
      hideLoadingMessage();
      closeImgEditModal();
      showErrorMessage();
    });
};

export { pictures, sendForm };
