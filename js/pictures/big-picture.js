const socialComment = document
  .querySelector('.social__comment')
  .cloneNode(true);
const bigPicture = document.querySelector('.big-picture');

const hideModal = () => {
  bigPicture.classList.add('hidden');
  bigPicture
    .querySelector('.big-picture__title')
    .classList.add('.visually-hidden');
  document.body.classList.remove('modal-open');
};

const onEscKeydown = (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    hideModal();
  }
};

const onCloseButtonClick = (evt) => {
  evt.preventDefault();
  hideModal();
  document.removeEventListener('keydown', onEscKeydown);
};

const showModal = () => {
  bigPicture.classList.remove('hidden');
  bigPicture
    .querySelector('.big-picture__title')
    .classList.remove('.visually-hidden');
  document.body.classList.add('modal-open');

  bigPicture
    .querySelector('.big-picture__cancel')
    .addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onEscKeydown);
};

const createComments = (comments) => {
  const fragment = document.createDocumentFragment();
  comments.forEach(({ avatar, message, name }) => {
    const newComment = socialComment.cloneNode(true);
    const img = newComment.querySelector('img');
    img.src = avatar;
    img.alt = name;
    newComment.querySelector('.social__text').textContent = message;
    fragment.append(newComment);
  });

  return fragment;
};

const showComments = (comments) => {
  const socialComments = bigPicture.querySelector('.social__comments');
  const loader = bigPicture.querySelector('.social__comments-loader');

  socialComments.innerHTML = '';
  let to = 5;

  const commentsCount = bigPicture.querySelector('.comments-count');
  const commentsCountShown = bigPicture.querySelector('.comments-count__shown');

  const updateCommentCount = () => {
    if (comments.length <= to) {
      commentsCountShown.textContent = comments.length;
      loader.classList.add('hidden');
    } else {
      commentsCountShown.textContent = to;
      loader.classList.remove('hidden');
    }
    commentsCount.textContent = comments.length;
  };

  const onLoaderClick = (evt) => {
    evt.preventDefault();
    socialComments.appendChild(createComments(comments.slice(to)));
    to = comments.length;
    updateCommentCount();
  };

  loader.addEventListener('click', onLoaderClick);

  updateCommentCount();
  socialComments.appendChild(createComments(comments.slice(0, to)));
};

const showBigPicture = ({ url, likes, comments, description }) => {
  const img = bigPicture
    .querySelector('.big-picture__img')
    .querySelector('img');
  img.src = url;
  img.alt = description;

  bigPicture.querySelector('.social__caption').textContent = description;
  bigPicture.querySelector('.likes-count').textContent = likes;

  showComments(comments);
  showModal();
};

export { showBigPicture };
