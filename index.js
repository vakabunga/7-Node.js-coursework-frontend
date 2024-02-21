const formContainer = document.querySelector('.form-container');
const formContainerTexarea = document.querySelector('.form-container__textarea');
const formContainerFileInput = document.querySelector('.form-container__file-input');
const formContainerPassword = document.querySelector('.form-container__password');
const formContainerSelectLifetime = document.querySelector('.form-container__select-lifetime');
const formContainerCheckbox = document.querySelector('.form-container__checkbox');
const formContainerSelectTimesToView = document.querySelector('.form-container__select-times-to-view');
const formContainerButton = document.querySelector('.form-container__button');
const formContainerErrorMessage = document.querySelector('.form-container__error-message');
const formContainerSuccessMessage = document.querySelector('.form-container__success-message');

const DOMAIN_NAME = 'http://localhost:3000';

window.addEventListener('load', () => {
  const currentUrl = new URL(document.location.href);
  if (currentUrl.search) {
    formContainer.classList.add('hidden');
    fetch(DOMAIN_NAME + '/secrets/' + String(currentUrl.search).slice(1))
    .then(response => response.json())
    .then(data => console.log(data));
  }
})

formContainerCheckbox.addEventListener('change', () => {
  if (formContainerCheckbox.checked) {
    formContainerSelectTimesToView.disabled = true;
  } else {
    formContainerSelectTimesToView.disabled = false;
  }
});

formContainerButton.addEventListener('click', (event) => {
  event.preventDefault();

  const secret = JSON.stringify({
    secretMsg: formContainerTexarea.value,
    date: new Date(),
    timeToView: formContainerCheckbox.checked ? 1 : +formContainerSelectTimesToView.value,
    lifetime: +formContainerSelectLifetime.value * 3600000,
    password: formContainerPassword.value,
    file: formContainerFileInput.value
  });

  console.log(secret);

  fetch(DOMAIN_NAME + '/secrets/_create', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: secret
  })
    .then(respones => respones.json())
    .then((data) => {
      formContainerSuccessMessage.classList.remove('hidden');
      formContainerSuccessMessage.textContent = `Yor secret message link is here: ${DOMAIN_NAME}/?${data._id}`;
    })
});
