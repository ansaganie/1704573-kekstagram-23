import { drawPictures } from './browsing/pictures.js';
import { closeImgEditModal } from './editing/picture-edit.js';
import { showImgUploadTitle } from './editing/pictures-upload.js';

const MAIN_LINK = 'https://23.javascript.pages.academy/kekstagram';

const api = {
  get: '/data',
  post: '',
};

let picturesJson;

fetch(MAIN_LINK + api.get)
  .then((response) => response.json())
  .then((data) => {
    picturesJson = data;
    drawPictures(picturesJson, 'filter-default');
    showImgUploadTitle();
  });

const sendForm = (formData, showSuccessMessage, showErrorMessage) => {
  fetch(
    MAIN_LINK + api.get,
    {
      method: 'POST',
      credentials: 'same-origin',
      body: formData,
    },
  ).then((response) => {
    if (response.ok) {
      showSuccessMessage();
      closeImgEditModal();
    } else {
      showErrorMessage();
    }
  });
};


export { picturesJson, sendForm };
