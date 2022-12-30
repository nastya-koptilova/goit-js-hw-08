import throttle from 'lodash.throttle';
import localStorageService from './localstorage.js';

const feedbackFormEl = document.querySelector('.feedback-form');
const userFeedback = {};

const onFeedbackFormLoad = () => {
  const storageData = localStorageService.load('feedback-form-state');

  if (storageData === undefined) {
    return;
  }

  for (const prop in storageData) {
    feedbackFormEl.elements[prop].value = storageData[prop];
  }
};

onFeedbackFormLoad();

const onFeedbackFormInput = event => {
  const { target } = event;
  const fieldValue = target.value;
  const fieldName = target.name;

  userFeedback[fieldName] = fieldValue;

  localStorageService.save('feedback-form-state', userFeedback);
};

const onFeedbackFormSubmit = event => {
  event.preventDefault();

  console.log(localStorageService.load('feedback-form-state'));
  feedbackFormEl.reset();
  localStorageService.remove('feedback-form-state');
};

feedbackFormEl.addEventListener('input', throttle(onFeedbackFormInput, 500));
feedbackFormEl.addEventListener('submit', onFeedbackFormSubmit);
