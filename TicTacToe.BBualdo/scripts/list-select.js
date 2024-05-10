categoryButtons.forEach((button) => {
  button.addEventListener('click', () => {
    toggleOff();
    button.classList.add('is-toggled');
  });
});

function toggleOff() {
  categoryButtons.forEach((button) => {
    button.classList.remove('is-toggled');
  });
};