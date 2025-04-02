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
