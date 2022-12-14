import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

let formData = {};
const email = document.querySelector('input');

populateInput();

const form = document.querySelector('.feedback-form');
form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onInputForm, 500));

//Відправка форми
function onFormSubmit(evt) {
  evt.preventDefault();
  if (!email.value) {
    alert('Поле email має бути заповнене');
    return;
  }
  evt.currentTarget.reset();
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  localStorage.removeItem(STORAGE_KEY);
}

//Збирає дані введені в полях input
function onInputForm(evt) {
  formData[evt.target.name] = evt.target.value;
  console.log(evt.target.value);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

//Фукнція вставляє дані із localStorage
function populateInput() {
  const input = document.querySelector('input');
  const textarea = document.querySelector('textarea');
  const parsedData = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (parsedData?.email) {
    input.value = parsedData.email;
  }
  if (parsedData?.message) {
    textarea.value = parsedData.message;
  }
  if (parsedData) {
    formData = parsedData;
  }
}
