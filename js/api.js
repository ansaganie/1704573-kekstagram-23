import { drawPictures } from './browsing/pictures.js';
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

export { picturesJson };
