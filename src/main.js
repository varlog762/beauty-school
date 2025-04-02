import { checkForm } from './utils/index';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.forms['registration-form'];
  const formData = new FormData(form);

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

      const event = new Event('change');
      courseSelect.dispatchEvent(event);

      menu.classList.add('hidden');
    });
  });

  form.addEventListener('input', () =>
    checkForm(nameInput, phoneInput, courseSelect, submitButton)
  );

  courseSelect.addEventListener('change', () => {
    console.log('changed!');
    checkForm(nameInput, phoneInput, courseSelect, submitButton);
  });

  form.addEventListener('submit', event => {
    event.preventDefault();

    console.log(courseSelect.value, nameInput.value, phoneInput.value);
  });
});
