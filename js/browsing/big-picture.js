import { isEscapePressed } from '../utils.js';
import { drawPictures } from './pictures.js';
import { picturesJson } from '../api.js';

const SHOWN_COMMENTS_COUNT_DEFAULT = 5;
const EVENT_ONCE = {
  once: true,
};

const commentTemplate = {
  id: 100000,
  avatar: 'img/avatar-6.svg',
  name: 'Степан',
  message: '',
};

const bigPictureNode = document.querySelector('.big-picture');
const socialCommentNode = bigPictureNode
  .querySelector('.social__comment')
  .cloneNode(true);
const loaderNodeButton = bigPictureNode.querySelector(
  '.social__comments-loader',
);
const socialCommentsNode = bigPictureNode.querySelector('.social__comments');
const commentsCountNode = bigPictureNode.querySelector('.comments-count');
const commentsCountShownNode = bigPictureNode.querySelector(
  '.comments-count__shown',
);
const footerNodeButton = bigPictureNode.querySelector('.social__footer-btn');
const footerTextNode = bigPictureNode.querySelector('.social__footer-text');

const hideModal = () => {
  bigPictureNode.classList.add('hidden');
  bigPictureNode
    .querySelector('.big-picture__title')
    .classList.add('visually-hidden');
  const activeFilter = document.querySelector(
    '.img-filters__button--active',
  ).id;
  drawPictures(picturesJson, activeFilter);
  document.body.classList.remove('modal-open');
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

const showComments = (comments, from, to) => {
  if (comments.length === to) {
    loaderNodeButton.classList.add('hidden');
  } else {
    loaderNodeButton.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();

  comments.slice(from, to).forEach(({ avatar, message, name }) => {
    const newComment = socialCommentNode.cloneNode(true);
    const img = newComment.querySelector('img');
    img.src = avatar;
    img.alt = name;
    newComment.querySelector('.social__text').textContent = message;

    fragment.append(newComment);
  });

  socialCommentsNode.appendChild(fragment);
};

const updateCommentCount = (shown, max) => {
  commentsCountShownNode.textContent = shown;
  commentsCountNode.textContent = max;
};

const showRestComments = (comments) => {
  const commentsLength = comments.length;
  const currentShownCommentsCount = +commentsCountShownNode.textContent;
  showComments(comments, currentShownCommentsCount, commentsLength);
  updateCommentCount(commentsLength, commentsLength);
};

const addNewComment = (comments) => {
  commentTemplate.id++;
  const newComment = { ...commentTemplate };
  newComment.message = footerTextNode.value;
  comments.push(newComment);
  showRestComments(comments);
  footerTextNode.value = '';
};

const proccessComments = (comments) => {
  socialCommentsNode.innerHTML = '';
  const commentsLength = comments.length;
  const countOfCommentsToShow = Math.min(
    SHOWN_COMMENTS_COUNT_DEFAULT,
    commentsLength,
  );

  showComments(comments, 0, countOfCommentsToShow);
  updateCommentCount(countOfCommentsToShow, commentsLength);

  const onLoaderClick = (evt) => {
    evt.preventDefault();
    showRestComments(comments);
  };

  const onFooterButtonClick = () => {
    addNewComment(comments);
  };

  footerNodeButton.onclick = onFooterButtonClick;
  loaderNodeButton.addEventListener('click', onLoaderClick, EVENT_ONCE);
};

const showBigPicture = ({ url, likes, comments, description }) => {
  const img = bigPictureNode
    .querySelector('.big-picture__img')
    .querySelector('img');
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
  .addEventListener('click', (evt) => evt.stopPropagation());

export { showBigPicture };
