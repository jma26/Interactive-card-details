const form = document.querySelector('.preview-card__details-form');
const errorMessages = document.querySelectorAll('.preview-card__error-message');

const formInputs = {
  cardholder_name: document.querySelector('#cardholder_name'),
  card_number: document.querySelector('#card_number'),
  exp_date_mm: document.querySelector('#exp_date_mm'),
  exp_date_yy: document.querySelector('#exp_date_yy'),
  cvc: document.querySelector('#cvc')
};

const livePreviewMap = {
  cardholder_name: 'preview-card__front-card-name',
  card_number: 'preview-card__front-card-number',
  exp_date_mm: 'preview-card__front-card-expiry-mm',
  exp_date_yy: 'preview-card__front-card-expiry-yy',
  cvc: 'preview-card__back-card-cvc'
}

Object.entries(formInputs).forEach(([key, input]) => {
  input.addEventListener('input', (event) => {
    const value = event.target.value;
    const previewClass = livePreviewMap[key];
    const previewElement = document.querySelector(`.${previewClass}`);
    previewElement.textContent = value;
  })
})

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const formObj = Object.fromEntries(formData);
  const errors = isFormValid(formObj);

  displayErrors(errors);

  if (Object.keys(errors).length === 0) {
    console.log('Form is valid!');
  } else {
    console.log('Form is not valid');
  }
});

const isFormValid = ({ card_number, cardholder_name, cvc, exp_date_mm, exp_date_yy }) => {
  const formErrors = {};
  const isIntegerString = /^[0-9]+$/;

  if (cardholder_name.trim() === "") {
    formErrors.cardholder_name = true;
  }

  if (!isIntegerString.test(card_number) || card_number.trim().length < 13) {
    formErrors.card_number = true;
  }

  if (cvc.trim() === "" || !isIntegerString.test(cvc)) {
    formErrors.cvc = true;
  }

  if (exp_date_mm.trim() === "" || exp_date_mm.length !== 2 || !isIntegerString.test(exp_date_mm)) {
    formErrors.exp_date_mm = true;
  }

  if (exp_date_yy.trim() === "" || exp_date_yy.length !== 2 || !isIntegerString.test(exp_date_yy)) {
    formErrors.exp_date_yy = true;
  }

  return formErrors;
}

const displayErrors = (errors) => {
  // Show error messages
  Object.keys(formInputs).forEach((key) => {
    const inputElement = formInputs[key];
    const labelElement = document.querySelector(`label[for='${key}']`);
    const errorElement = labelElement.parentElement.querySelector('.preview-card__error-message');
    inputElement.classList.remove('showError');
    errorElement.classList.remove('showError');

    if (errors[key]) {
      inputElement.classList.add('showError');
      errorElement.classList.add('showError');
    }
  });
}