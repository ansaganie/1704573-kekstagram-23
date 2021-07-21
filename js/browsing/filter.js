import { pictures } from '../api.js';
import { debounce, getRandomPositiveInteger } from '../utils.js';
import { drawPictures } from './pictures.js';

const filtersNode = document.querySelector('.img-filters');

const showFilters = () => {
  filtersNode.classList.remove('img-filters--inactive');
  filtersNode
    .querySelector('.img-filters__title')
    .classList.remove('visually-hidden');
};

const onFilterClick = (evt) => {
  evt.preventDefault();

  const current = evt.target;
  const filterName = current.id;
  if (filterName) {
    current.parentNode.childNodes.forEach((child) => {
      if (child.classList) {
        child.classList.remove('img-filters__button--active');
      }
    });
    current.classList.add('img-filters__button--active');
    debounce(drawPictures.bind(null, pictures, filterName), 500)();
  }
};

const doFilter = {
  'filter-default' : (picturesArr) => picturesArr,
  'filter-random' : (picturesArr) => {
    const result = [];

    while (result.length < 10) {
      const randomPicture = picturesArr[getRandomPositiveInteger(0, picturesArr.length - 1)];
      if (!result.includes(randomPicture)) {
        result.push(randomPicture);
      }
    }

    return result;
  },
  'filter-discussed' : (picturesArr) => {
    const sorted = picturesArr
      .slice()
      .sort((first, second) =>
        second.comments.length - first.comments.length);
    return sorted;
  },
};

filtersNode.addEventListener('click', onFilterClick);

export { showFilters, doFilter };
