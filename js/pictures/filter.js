import { picturesJson } from '../api.js';
import { getRandomPositiveInteger } from '../utils.js';
import { drawPictures } from './pictures.js';

const filters = document.querySelector('.img-filters');

const showFilters = () => {
  filters.classList.remove('img-filters--inactive');
  filters
    .querySelector('.img-filters__title')
    .classList.remove('visually-hidden');
};

const onFilterClick = (evt) => {
  evt.preventDefault();

  const current = evt.target;
  current.parentNode.childNodes.forEach((child) => {
    if (child.classList) {
      child.classList.remove('img-filters__button--active');
    }
  });
  current.classList.add('img-filters__button--active');

  drawPictures(picturesJson, current.id);
};

const doFilter = {
  'filter-default' : (pictures) => pictures,
  'filter-random' : (pictures) => {
    const result = [];

    while (result.length < 10) {
      const randomPicture = pictures[getRandomPositiveInteger(0, pictures.length - 1)];
      if (!result.includes(randomPicture)) {
        result.push(randomPicture);
      }
    }

    return result;
  },
  'filter-discussed' : (pictures) => {
    const sorted = pictures
      .slice()
      .sort((first, second) =>
        second.comments.length - first.comments.length);
    return sorted;
  },
};

filters.addEventListener('click', onFilterClick);

export { showFilters, doFilter };
