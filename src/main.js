import {
  checkForm,
  emitCustomEvent,
  validateName,
  validatePhone,
} from './utils/index';

const URL = import.meta.env.VITE_URL;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.forms['registration-form'];

  const menu = document.getElementById('dropdown-menu');
  const selectedText = document.getElementById('selected-course');
  const courseSelectButton = form['course-select-button'];
  const courseSelect = form['course-select'];
  const nameInput = form['name-input'];
  const phoneInput = form['phone-input'];
  const submitButton = form['submit-button'];

  // Закрытие списка при клике вне его
  document.addEventListener('click', event => {
    if (
      !courseSelectButton.contains(event.target) &&
      !menu.contains(event.target)
    ) {
      menu.classList.add('hidden');
    }
  });

  // Открытие/закрытие списка
  courseSelectButton.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });

  // Обработчик выбора элемента
  menu.querySelectorAll('li').forEach(item => {
    item.addEventListener('click', () => {
      const value = item.dataset.value;
      selectedText.textContent = item.textContent;
      courseSelect.value = value;
      emitCustomEvent(courseSelect, 'change');

      menu.classList.add('hidden');
    });
  });

  form.addEventListener('input', event => {
    if (event.target === nameInput) {
      validateName(nameInput);
    }

    if (event.target === phoneInput) {
      validatePhone(phoneInput);
    }

    checkForm(nameInput, phoneInput, courseSelect, submitButton);
  });

  courseSelect.addEventListener('change', () => {
    checkForm(nameInput, phoneInput, courseSelect, submitButton);
  });

  form.addEventListener('submit', async event => {
    event.preventDefault();

    const formData = {
      name: nameInput.value,
      phone: phoneInput.value,
      course: courseSelect.value,
    };

    const response = await fetch(URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
      redirect: 'follow', // Ключевой параметр
      mode: 'no-cors',
    });

    const result = await response.json();
    console.dir(result);
    // if (result.status) {
    //   alert('Заявка отправлена!');
    // }
  });
});
