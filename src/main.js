document.addEventListener("DOMContentLoaded", () => {
  const form = document.forms["registration-form"];
  const formData = new FormData(form);

  const button = document.getElementById("course-button");
  const menu = document.getElementById("dropdown-menu");
  const selectedText = document.getElementById("selected-course");
  const select = document.getElementById("course-select");

  const nameInput = form["name-input"];
  const phoneInput = form["phone-input"];
  const submitButton = form["submit-button"];

  console.log(submitButton);

  // Закрытие списка при клике вне его
  document.addEventListener("click", (event) => {
    if (!button.contains(event.target) && !menu.contains(event.target)) {
      menu.classList.add("hidden");
    }
  });

  // Открытие/закрытие списка
  button.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });

  // Обработчик выбора элемента
  menu.querySelectorAll("li").forEach((item) => {
    item.addEventListener("click", () => {
      const value = item.dataset.value;
      selectedText.textContent = item.textContent;
      select.value = value;
      menu.classList.add("hidden");
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    console.dir(formData.entries());
  });
});
