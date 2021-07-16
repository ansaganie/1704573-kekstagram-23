import { showBigPicture } from './big-picture.js';
import { picturesJson } from '../api.js';
import { showFilters } from './filter.js';

const pictureTemplate = document
  .querySelector('#picture')
  .content.querySelector('.picture');

const picturesContainer = document.querySelector('.pictures');

const onPictureClick = (evt) => {
  evt.preventDefault();
  const src = evt.target.getAttribute('src');
  const current = picturesJson.find(({url}) => url === src);

  showBigPicture(current);
};

const drawPictures = (pictures) => {
  const fragment = document.createDocumentFragment();

  picturesContainer
    .querySelector('.pictures__title')
    .classList.remove('visually-hidden');

  showFilters();

  pictures.forEach((picture) => {
    const newPicture = pictureTemplate.cloneNode(true);
    newPicture.querySelector('.picture__img').src = picture.url;
    newPicture.querySelector('.picture__comments').textContent =
      picture.comments.length;
    newPicture.querySelector('.picture__likes').textContent = picture.likes;

    fragment.append(newPicture);
  });

  picturesContainer.appendChild(fragment);
};

picturesContainer.addEventListener('click', onPictureClick);

export { drawPictures };
