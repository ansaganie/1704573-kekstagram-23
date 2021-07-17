import { overlay, imgPreview } from './picture-edit.js';

const effects = overlay.querySelector('.img-upload__effects');
const slider = overlay.querySelector('.effect-level__slider');
const effectLevel = overlay.querySelector('.img-upload__effect-level');

const effectsDictionary = {
  'effect-heat': {
    name: 'brightness',
    max: 1,
    min: 0,
    step: 0.1,
    unit: '',
  },
  'effect-phobos': {
    name: 'blur',
    max: 3,
    min: 1,
    step: 0.1,
    unit: 'px',
  },
  'effect-chrome': {
    name: 'grayscale',
    max: 1,
    min: 0,
    step: 0.1,
    unit: '',
  },
  'effect-sepia': {
    name: 'sepia',
    max: 1,
    min: 0,
    step: 0.1,
    unit: '',
  },
  'effect-marvin': {
    name: 'invert',
    max: 100,
    min: 0,
    step: 1,
    unit: '%',
  },
  'effect-none': {
    name: 'none',
  },
};

const applyEffect = (filterName, intensity, unit) => {
  imgPreview.style.filter = `${filterName}(${intensity}${unit})`;
};

const onEffectsChange = (evt) => {
  const id = evt.target.id;
  if (id) {
    if (id === 'effect-none') {
      effectLevel.classList.add('visually-hidden');
      imgPreview.style.filter = effectsDictionary[id].name;
    } else {
      effectLevel.classList.remove('visually-hidden');

      const { name, min, max, step, unit } = effectsDictionary[id];

      applyEffect(name, max, unit);

      slider.noUiSlider.updateOptions({
        range: {
          min: min,
          max: max,
        },
        start: max,
        step: step,
      });

      slider.noUiSlider.on('update', (values, handle) => {
        applyEffect(name, values[handle], unit);
      });
    }
  }
};

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
  animationDuration: 300,
});

effects.addEventListener('change', onEffectsChange);
