
const MAIN_LINK = 'https://23.javascript.pages.academy/kekstagram';

const api = {
  get : '/data',
  post : '',
};

let pictures;

fetch(MAIN_LINK + api.get)
  .then((response) => response.json())
  .then((data) => pictures = data);

export { pictures };
