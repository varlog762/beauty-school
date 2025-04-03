export const checkForm = (
  nameInput,
  phoneInput,
  courseSelect,
  submitButton
) => {
  if (
    nameInput.value.trim() &&
    phoneInput.value.trim() &&
    courseSelect.value.trim()
  ) {
    submitButton.disabled = false;
    return;
  }

  submitButton.disabled = true;
};

const showError = (input, message) => {
  let error = input.nextElementSibling;
  if (!error || !error.classList.contains('error-message')) {
    error = document.createElement('span');
    error.classList.add('error-message', 'text-red-500', 'text-xs');
    input.parentNode.appendChild(error);
  }
  error.textContent = message;
};

const hideError = input => {
  let error = input.nextElementSibling;
  if (error && error.classList.contains('error-message')) {
    error.textContent = '';
  }
};

const validateInput = (regex, message, input) => {
  if (!input.value.trim()) {
    input.classList.add('border-red-500', 'border-2');
    showError(input, 'Это поле должно быть заполнено!');
    return;
  }

  if (!regex.test(input.value.trim())) {
    input.classList.add('border-red-500', 'border-2');
    showError(input, message);
    return;
  }

  input.classList.remove('border-red-500', 'border-2');
  hideError(input);
};

export const validateName = input => {
  const regex = /^[A-Za-zА-Яа-яЁё\s-]+$/;
  const message = 'Имя может содержать только буквы, пробелы и дефис.';

  return validateInput(regex, message, input);
};

export const validatePhone = input => {
  const regex = /^[\+\d\(\)\-\s]*$/;
  const message = 'Неверный формат телефона.';

  return validateInput(regex, message, input);
};

export const emitCustomEvent = (element, eventType) => {
  const event = new Event(eventType);
  element.dispatchEvent(event);
};
