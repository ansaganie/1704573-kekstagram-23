import { isEscapePressed } from '../utils.js';
import { clearEffect } from './effects.js';
import { clearValidationMessages } from './form.js';
import { clearUploadFile } from './pictures-upload.js';

const overlayNode = document.querySelector('.img-upload__overlay');
const imgPreviewNode = overlayNode
  .querySelector('.img-upload__preview')
  .querySelector('img');

const uploadFormNode = document.querySelector('.img-upload__form');
const cancelButtonNode = overlayNode.querySelector('.img-upload__cancel');

const closeImgEditModal = () => {
  overlayNode.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imgPreviewNode.src = '';
  imgPreviewNode.style.transform = 'scale(1)';
  clearUploadFile();
  clearEffect();
  clearValidationMessages();
  uploadFormNode.reset();
};

const onEscapeKeydown = (evt) => {
  if (isEscapePressed(evt)) {
    closeImgEditModal();
    document.removeEventListener('keydown', onEscapeKeydown);
  }
};

const onCancelClick = () => {
  closeImgEditModal();
  document.removeEventListener('keydown', onEscapeKeydown);
};

const showImgEditModal = () => {
  overlayNode.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onEscapeKeydown);
};

const editImage = (url) => {
  showImgEditModal();
  imgPreviewNode.src = url;
};

cancelButtonNode.addEventListener('click', onCancelClick);

export {
  editImage,
  onEscapeKeydown,
  closeImgEditModal,
  overlayNode as overlay,
  imgPreviewNode as imgPreview
};
