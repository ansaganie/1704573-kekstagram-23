import { isEscapePressed } from '../utils.js';
import { clearUploadFile } from './pictures-upload.js';

const overlay = document.querySelector('.img-upload__overlay');
const imgPreview = overlay
  .querySelector('.img-upload__preview')
  .querySelector('img');

const cancel = overlay.querySelector('.img-upload__cancel');

const closeImgEditModal = () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imgPreview.src = '';
  clearUploadFile();
};

const onEscapeKeydown = (evt) => {
  if (isEscapePressed(evt)) {
    closeImgEditModal();
  }
};

const onCancelClick = () => {
  closeImgEditModal();
  document.removeEventListener('keydown', onEscapeKeydown);
};

const showImgEditModal = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  cancel.addEventListener('click', onCancelClick, { once: true});
  document.addEventListener('keydown', onEscapeKeydown);
};

const editImage = (url) => {
  showImgEditModal();
  imgPreview.src = url;
};

export { editImage, overlay, imgPreview };
