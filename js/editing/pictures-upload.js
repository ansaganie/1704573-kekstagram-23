import { editImage } from './picture-edit.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const imgUpload = document.querySelector('.img-upload');
const uploadFile = document.querySelector('#upload-file');

const onUploadFileChange = (evt) => {
  evt.preventDefault();
  const file = evt.target.files[0];

  const isValid = FILE_TYPES.some((imageType) => file.name.endsWith(imageType));

  if (isValid) {
    const reader = new FileReader();

    const onImageLoad = () => {
      editImage(reader.result);
    };

    reader.addEventListener('load', onImageLoad);

    reader.readAsDataURL(file);
  }
};

const showImgUploadTitle = () => {
  imgUpload
    .querySelector('.img-upload__title')
    .classList.remove('visually-hidden');
};

uploadFile.addEventListener('change', onUploadFileChange);

imgUpload.addEventListener('click', (evt) => evt.stopPropagation());

export { showImgUploadTitle };
