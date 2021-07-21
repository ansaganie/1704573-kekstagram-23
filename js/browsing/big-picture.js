import { isEscapePressed, stopPropagation } from '../utils.js';
import { pictures } from '../api.js';
import { drawPictures } from './pictures.js';
import {
  proccessComments,
  onFooterButtonClick,
  onFooterEnterKeydown,
  onLoaderClick,
  footerButtonNode,
  loaderButtonNode
} from './comments.js';

const bigPictureNode = document.querySelector('.big-picture');
const img = bigPictureNode
  .querySelector('.big-picture__img')
  .querySelector('img');

const hideModal = () => {
  bigPictureNode.classList.add('hidden');
  bigPictureNode
    .querySelector('.big-picture__title')
    .classList.add('visually-hidden');
  const activeFilter = document.querySelector(
    '.img-filters__button--active',
  ).id;
  drawPictures(pictures, activeFilter);
  document.body.classList.remove('modal-open');
  footerButtonNode.removeEventListener('click', onFooterButtonClick);
  document.removeEventListener('keydown', onFooterEnterKeydown);
  loaderButtonNode.removeEventListener('click', onLoaderClick);
};

const onEscKeydown = (evt) => {
  if (isEscapePressed(evt)) {
    evt.preventDefault();
    hideModal();
  }
};

const onCancelButtonClick = (evt) => {
  evt.preventDefault();
  hideModal();
  document.removeEventListener('keydown', onEscKeydown);
};

const onBigPictureClick = (evt) => {
  evt.preventDefault();
  hideModal();
  document.removeEventListener('keydown', onEscKeydown);
};

const showModal = () => {
  bigPictureNode.classList.remove('hidden');
  bigPictureNode
    .querySelector('.big-picture__title')
    .classList.remove('visually-hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onEscKeydown);
};

const showBigPicture = ({ url, likes, comments, description }) => {
  img.src = url;
  img.alt = description;

  bigPictureNode.querySelector('.social__caption').textContent = description;
  bigPictureNode.querySelector('.likes-count').textContent = likes;

  proccessComments(comments);
  showModal();
};

bigPictureNode
  .querySelector('.big-picture__cancel')
  .addEventListener('click', onCancelButtonClick);

bigPictureNode.addEventListener('click', onBigPictureClick);

bigPictureNode
  .querySelector('.big-picture__preview')
  .addEventListener('click', stopPropagation);

export { showBigPicture };
