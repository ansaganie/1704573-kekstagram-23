import { isEscapePressed } from '../utils.js';
import { clearEffect } from './effects.js';
import { clearUploadFile } from './pictures-upload.js';

const overlay = document.querySelector('.img-upload__overlay');
const imgPreview = overlay
  .querySelector('.img-upload__preview')
  .querySelector('img');

const cancel = overlay.querySelector('.img-upload__cancel');
const wrapper = overlay.querySelector('.img-upload__wrapper');

const closeImgEditModal = () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imgPreview.src = '';
  imgPreview.style.transform = 'scale(1)';
  clearUploadFile();
  clearEffect();
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

const onOverlayClick = () => {
  closeImgEditModal();
  document.removeEventListener('keydown', onEscapeKeydown);
  cancel.removeEventListener('click', onCancelClick, { once: true });
};

const showImgEditModal = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  cancel.addEventListener('click', onCancelClick, { once: true });
  overlay.addEventListener('click', onOverlayClick, { once: true});
  wrapper.addEventListener('click', (evt) => evt.stopPropagation());
  document.addEventListener('keydown', onEscapeKeydown);
};

const editImage = (url) => {
  showImgEditModal();
  imgPreview.src = url;
};

export { editImage, overlay, imgPreview };
