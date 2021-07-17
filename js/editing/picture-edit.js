
const overlay = document.querySelector('.img-upload__overlay');
const imgPreview = overlay
  .querySelector('.img-upload__preview')
  .querySelector('img');


const editImage = (url) => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  imgPreview.src = url;
};

export { editImage };
