import { imgPreview } from './picture-edit.js';

const EFFECTS_PREVIEW_PREFIX = 'effects__preview--';

const overlayNode = document.querySelector('.img-upload__overlay');
const effectsNode = overlayNode.querySelector('.img-upload__effects');
const sliderNode = overlayNode.querySelector('.effect-level__slider');
const effectLevelNode = overlayNode.querySelector('.img-upload__effect-level');
const effectLevelValueNode = overlayNode.querySelector(
  '.effect-level__value',
);

const effectsDictionary = {
  heat: {
    name: 'brightness',
    max: 1,
    min: 0,
    step: 0.1,
    unit: '',
  },
  phobos: {
    name: 'blur',
    max: 3,
    min: 1,
    step: 0.1,
    unit: 'px',
  },
  chrome: {
    name: 'grayscale',
    max: 1,
    min: 0,
    step: 0.1,
    unit: '',
  },
  sepia: {
    name: 'sepia',
    max: 1,
    min: 0,
    step: 0.1,
    unit: '',
  },
  marvin: {
    name: 'invert',
    max: 100,
    min: 0,
    step: 1,
    unit: '%',
  },
};

const applyEffect = (filterName, intensity, unit) => {
  imgPreview.style.filter = `${filterName}(${intensity}${unit})`;
};

const clearEffect = () => {
  imgPreview.style.filter = 'none';
  effectLevelNode.classList.add('visually-hidden');
  imgPreview.className = '';
};

const onEffectsChange = (evt) => {
  const effect = evt.target.id.replace('effect-', '');
  if (effect) {
    if (effect === 'none') {
      clearEffect();
    } else {
      effectLevelNode.classList.remove('visually-hidden');

      const { name, min, max, step, unit } = effectsDictionary[effect];

      imgPreview.className = '';
      imgPreview.classList.add(`${EFFECTS_PREVIEW_PREFIX}${effect}`);
      effectLevelValueNode.value = max;
      applyEffect(name, max, unit);

      sliderNode.noUiSlider.updateOptions({
        range: {
          min: min,
          max: max,
        },
        start: max,
        step: step,
      });

      sliderNode.noUiSlider.on('update', (values, handle) => {
        const currentValue = values[handle];
        effectLevelValueNode.value = currentValue;
        applyEffect(name, currentValue, unit);
      });
    }
  }
};

noUiSlider.create(sliderNode, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
  animationDuration: 300,
});

effectsNode.addEventListener('change', onEffectsChange);

export { clearEffect };
