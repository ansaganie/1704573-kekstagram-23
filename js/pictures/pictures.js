import { showBigPicture } from './big-picture.js';
import { picturesJson } from '../api.js';
import { doFilter, showFilters } from './filter.js';

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

const clearPicturesContainer = () => {
  const imgUpload = picturesContainer
    .querySelector('.img-upload')
    .cloneNode(true);
  const picturesTitle = picturesContainer
    .querySelector('.pictures__title')
    .cloneNode(true);
  picturesContainer.innerHTML = '';
  picturesContainer.appendChild(imgUpload);
  picturesContainer.appendChild(picturesTitle);
};

const drawPictures = (pictures, filterType) => {
  const fragment = document.createDocumentFragment();
  clearPicturesContainer();
  picturesContainer
    .querySelector('.pictures__title')
    .classList.remove('visually-hidden');

  showFilters();
  doFilter[filterType](pictures)
    .forEach((picture) => {
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
