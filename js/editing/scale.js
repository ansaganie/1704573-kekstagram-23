import { imgPreview } from './picture-edit.js';

const SCALE_MAX = 100;
const SCALE_MIN = 25;
const SCALE_STEP = 25;

const biggerButtonNode = document.querySelector('.scale__control--bigger');
const smallerButtonNode = document.querySelector('.scale__control--smaller');
const valueNode = document.querySelector('.scale__control--value');

const onBiggerClick = () => {
  let currentValue = parseInt(valueNode.value.slice(0, valueNode.value.length-1), 10);
  if (currentValue !== SCALE_MAX) {
    currentValue += SCALE_STEP;
    valueNode.value = `${currentValue}%`;
    imgPreview.style.transform = `scale(${currentValue / SCALE_MAX})`;
  }
};

const onSmallerClick = () => {
  let currentValue = parseInt(valueNode.value.slice(0, valueNode.value.length-1), 10);
  if (currentValue !== SCALE_MIN) {
    currentValue -= SCALE_STEP;
    valueNode.value = `${currentValue}%`;
    imgPreview.style.transform = `scale(${currentValue / SCALE_MAX})`;
  }
};

smallerButtonNode.addEventListener('click', onSmallerClick);
biggerButtonNode.addEventListener('click', onBiggerClick);
