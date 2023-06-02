const emailEl = document.querySelector('#email');
const countryEl = document.querySelector('#country');
const zipEl = document.querySelector('#zip');
const passwordEl = document.querySelector('#password');
const passConfEl = document.querySelector('#pass-conf');

const form = document.querySelector('form');

const isRequired = (value) => (value === '' ? false : true);

const isBetween = (length, min, max) =>
  length < min || length > max ? false : true;

const isEmailValid = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const isPasswordSecure = (password) => {
  const re = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
  );
  return re.test(password);
};

const showError = (input, message) => {
  const formField = input.parentElement;

  input.classList.remove('valid');
  input.classList.add('invalid');

  const error = formField.querySelector('p');
  error.textContent = message;
};

const showSuccess = (input) => {
  const formField = input.parentElement;

  input.classList.remove('invalid');
  input.classList.add('valid');

  const error = formField.querySelector('p');
  error.textContent = '';
};

form.addEventListener('submit', (e) => {
  e.preventDefault();

  let isEmailValid = checkEmail();
  let isCountryValid = checkCountry();
  let isZipValid = checkZip();
  let isPasswordValid = checkPassword();
  let isPassConfValid = checkPasswordConf();

  let isFormValid =
    isEmailValid &&
    isCountryValid &&
    isZipValid &&
    isPasswordValid &&
    isPassConfValid;

  if (!isFormValid) {
    // error message
  } else {
    // show high five
  }
});

const checkEmail = () => {
  let valid = false;

  const email = emailEl.value.trim();

  if (!isRequired(email)) {
    showError(emailEl, 'Please enter an email address.');
  } else if (!isEmailValid(email)) {
    showError(emailEl, 'Not a valid email address.');
  } else {
    showSuccess(emailEl);
    valid = true;
  }

  return valid;
};

const checkCountry = () => {
  let valid = false;

  const min = 4;
  const max = 56;
  const country = countryEl.value.trim();

  if (!isRequired(country)) {
    showError(countryEl, 'Please enter a country.');
  } else if (!isBetween(country.length, min, max)) {
    showError(countryEl, 'Country must be a minimum of 4 letters long.');
  } else {
    showSuccess(countryEl);
    valid = true;
  }

  return valid;
};

const checkZip = () => {
  let valid = false;

  const min = 5;
  const max = 10;
  const zip = zipEl.value.trim();

  if (!isRequired(zip)) {
    showError(zipEl, 'Please enter a zip (or postal) code.');
  } else if (!isBetween(zip.length, min, max)) {
    showError(zipEl, 'Zip code must be between 5 and 10 characters long');
  } else {
    showSuccess(zipEl);
    valid = true;
  }

  return valid;
};

const checkPassword = () => {
  let valid = false;

  const password = passwordEl.value.trim();

  if (!isRequired(password)) {
    showError(passwordEl, 'Please enter password.');
  } else if (!isPasswordSecure(password)) {
    showError(
      passwordEl,
      'Password must be at least 8 characters long and include at least 1 lowercase, 1 uppercase, 1 number, and 1 special character in(!@#$%^&*)'
    );
  } else {
    showSuccess(passwordEl);
    valid = true;
  }

  return valid;
};

const checkPasswordConf = () => {
  let valid = false;

  const passConf = passConfEl.value.trim();
  const password = passwordEl.value.trim();

  if (!isRequired(passConf)) {
    showError(passConfEl, 'Please enter the password again');
  } else if (password !== passConf) {
    showError(passConfEl, 'Password does not match.');
  } else {
    showSuccess(passConfEl);
    valid = true;
  }

  return valid;
};

const debounce = (fn, delay = 500) => {
  let timeoutId;

  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};

form.addEventListener(
  'input',
  debounce(function (e) {
    switch (e.target.id) {
      case 'email':
        checkEmail();
        break;
      case 'country':
        checkCountry();
        break;
      case 'zip':
        checkZip();
        break;
      case 'password':
        checkPassword();
        break;
      case 'pass-conf':
        checkPasswordConf();
        break;
    }
  })
);
