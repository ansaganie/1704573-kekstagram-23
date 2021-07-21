import { isEnterPressed } from '../utils.js';
import { pictures } from '../api.js';

const SHOWN_COMMENTS_COUNT_DEFAULT = 5;
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
const loaderButtonNode = bigPictureNode.querySelector(
  '.social__comments-loader',
);
const socialCommentsNode = bigPictureNode.querySelector('.social__comments');
const commentsCountNode = bigPictureNode.querySelector('.comments-count');
const commentsCountShownNode = bigPictureNode.querySelector(
  '.comments-count__shown',
);
const footerButtonNode = bigPictureNode.querySelector('.social__footer-btn');
const footerTextNode = bigPictureNode.querySelector('.social__footer-text');

const showComments = (comments, from, to) => {
  if (comments.length === to) {
    loaderButtonNode.classList.add('hidden');
  } else {
    loaderButtonNode.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();

  comments.slice(from, to).forEach(({ avatar, message, name }) => {
    const newComment = socialCommentNode.cloneNode(true);
    const avatarImgNode = newComment.querySelector('img');
    avatarImgNode.src = avatar;
    avatarImgNode.alt = name;
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
  const currentCount = +commentsCountShownNode.textContent;
  showComments(comments, currentCount, commentsLength);
  updateCommentCount(commentsLength, commentsLength);
};

const addNewComment = (comments) => {
  if (footerTextNode.value.length !== 0) {
    commentTemplate.id++;
    const newComment = { ...commentTemplate };
    newComment.message = footerTextNode.value;
    comments.push(newComment);
    showRestComments(comments);
    footerTextNode.value = '';
  }
};

const getCurrentComments = () => {
  const currentImg = bigPictureNode
    .querySelector('.big-picture__img')
    .querySelector('img');
  const currentImgSrc = currentImg.getAttribute('src');
  return pictures.find(({ url }) => url === currentImgSrc).comments;
};

const onFooterEnterKeydown = (evt) => {
  if (isEnterPressed(evt)) {
    addNewComment(getCurrentComments());
  }
};

const onFooterButtonClick = () => {
  addNewComment(getCurrentComments());
};

const showNextFiveComments = (comments) => {
  const commentsLength = comments.length;
  const currentCount = +commentsCountShownNode.textContent;
  const toShow = Math.min(currentCount + 5, commentsLength);
  showComments(comments, currentCount, toShow);
  updateCommentCount(toShow, commentsLength);
};

const onLoaderClick = (evt) => {
  evt.preventDefault();
  const comments = getCurrentComments();
  showNextFiveComments(comments);
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

  loaderButtonNode.addEventListener('click', onLoaderClick);
  footerButtonNode.addEventListener('click', onFooterButtonClick);
  document.addEventListener('keydown', onFooterEnterKeydown);
};

export {
  proccessComments,
  onFooterButtonClick,
  onFooterEnterKeydown,
  onLoaderClick,
  loaderButtonNode,
  footerButtonNode
};
