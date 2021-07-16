const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const uploadFile = document.querySelector('#upload-file');
const onUploadFileClick = (evt) => {
  const file = evt.target.files[0];
  console.log(file);
};

uploadFile.addEventListener('change', onUploadFileClick);
