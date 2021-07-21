const removeSuccessMessage = () => {
  const successTemplate = document
    .querySelector('#success').content
    .querySelector('.success')
    .cloneNode(true);
};

const onEscapeKeydown = () => {
  
}

const showSuccessMessage = () => {
  const successTemplate = document
    .querySelector('#success').content
    .querySelector('.success')
    .cloneNode(true);
};

const showErrorMessage = () => {
  const successTemplate = document
    .querySelector('#error').content
    .querySelector('.error')
    .cloneNode(true);
};

const removeErrorMessage = () => {
  const successTemplate = document
    .querySelector('#error').content
    .querySelector('.error')
    .cloneNode(true);
};

export { showSuccessMessage, showErrorMessage };
