import { imgPreview } from './picture-edit.js';

const SCALE_MAX = 100;
const SCALE_MIN = 25;
const SCALE_STEP = 25;

const bigger = document.querySelector('.scale__control--bigger');
const smaller = document.querySelector('.scale__control--smaller');
const value = document.querySelector('.scale__control--value');

const onBiggerClick = () => {
  let currentValue = parseInt(value.value.slice(0, value.value.length-1), 10);
  if (currentValue !== SCALE_MAX) {
    currentValue += SCALE_STEP;
    value.value = `${currentValue}%`;
    imgPreview.style.transform = `scale(${currentValue / SCALE_MAX})`;
  }
};

const onSmallerClick = () => {
  let currentValue = parseInt(value.value.slice(0, value.value.length-1), 10);
  if (currentValue !== SCALE_MIN) {
    currentValue -= SCALE_STEP;
    value.value = `${currentValue}%`;
    imgPreview.style.transform = `scale(${currentValue / SCALE_MAX})`;
  }
};

smaller.addEventListener('click', onSmallerClick);
bigger.addEventListener('click', onBiggerClick);
