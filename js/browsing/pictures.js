import { showBigPicture } from './big-picture.js';
import { pictures } from '../api.js';
import { doFilter, showFilters } from './filter.js';

const pictureTemplate = document
  .querySelector('#picture')
  .content.querySelector('.picture');

const picturesContainerNode = document.querySelector('.pictures');

const onPictureClick = (evt) => {
  evt.preventDefault();
  const src = evt.target.getAttribute('src');

  if (src) {
    showBigPicture(pictures.find(({url}) => url === src));
  }
};

const clearPicturesContainer = () => {
  const imgUpload = picturesContainerNode.querySelector('.img-upload');
  const picturesTitle = picturesContainerNode.querySelector('.pictures__title');

  picturesContainerNode.innerHTML = '';
  picturesContainerNode.appendChild(imgUpload);
  picturesContainerNode.appendChild(picturesTitle);
};

const drawPictures = (picturesArr, filterType) => {
  const fragment = document.createDocumentFragment();
  clearPicturesContainer();
  picturesContainerNode
    .querySelector('.pictures__title')
    .classList.remove('visually-hidden');

  showFilters();
  doFilter[filterType](picturesArr)
    .forEach((picture) => {
      const newPicture = pictureTemplate.cloneNode(true);
      newPicture.querySelector('.picture__img').src = picture.url;
      newPicture
        .querySelector('.picture__comments')
        .textContent = picture.comments.length;
      newPicture.querySelector('.picture__likes').textContent = picture.likes;

      fragment.append(newPicture);
    });

  picturesContainerNode.appendChild(fragment);
};

picturesContainerNode.addEventListener('click', onPictureClick);

export { drawPictures };
