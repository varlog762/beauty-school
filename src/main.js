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

  const popup = document.getElementById('popup');
  const popupCloseButton = document.getElementById('popup-close-button');

  const showPopup = () => {
    document.body.classList.add('overflow-hidden');
    popup.classList.remove('hidden');
    popup.classList.add('flex');
  };

  const closePopup = () => {
    document.body.classList.remove('overflow-hidden');
    popup.classList.remove('flex');
    popup.classList.add('hidden');
  };

  const resetForm = () => {
    form.reset();
    selectedText.textContent = 'Выберите курс';
    submitButton.disabled = false;
  };

  // Закрытие списка при клике вне его
  document.addEventListener('click', event => {
    if (
      !courseSelectButton.contains(event.target) &&
      !menu.contains(event.target)
    ) {
      menu.classList.add('hidden');
    }

    if (event.target === popup || event.target === popupCloseButton) {
      closePopup();
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

  // form.addEventListener('input', event => {
  //   if (event.target === nameInput) {
  //     validateName(nameInput);
  //   }

  //   if (event.target === phoneInput) {
  //     validatePhone(phoneInput);
  //   }

  //   checkForm(nameInput, phoneInput, courseSelect, submitButton);
  // });

  // courseSelect.addEventListener('change', () => {
  //   checkForm(nameInput, phoneInput, courseSelect, submitButton);
  // });

  form.addEventListener('submit', async event => {
    event.preventDefault();

    submitButton.disabled = true;

    // const formData = new FormData(event.target);
    const formData = {
      name: nameInput.value,
      phone: phoneInput.value,
      course: courseSelect.value,
    };

    const response = await fetch(URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    if (result.status === 'success') {
      resetForm();
      showPopup();
    }
  });
});
