const filters = document.querySelector('.img-filters');

const showFilters = () => {
  filters.classList.remove('img-filters--inactive');
  filters
    .querySelector('.img-filters__title')
    .classList
    .remove('visually-hidden');
};

export { showFilters };
