(() => {

  const loginForm = document.querySelector('.login');

  loginForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    const inputs = zeitgeber.extractRequestPayload(loginForm, 'input', 'value');

    const response = await zeitgeber.sendCaptchaRequest('login', window.location.pathname, {
      ...inputs
    });

    window.location.href = response.redirectTo;
  });

})();
