/* eslint-disable no-console */
/* eslint-disable no-alert */
import { SingIn, SingInGoogle } from '../../services/index.js';

export const Login = () => {
  const rootElement = document.createElement('div');
  rootElement.classList.add('page-login');
  const formHtml = `
    <img src="images/welcome.png" alt="Welcome to BeeU">
    <h1>Login to your account!</h1>
    <div class="container-form">
      <form class="login-form">
        <input class="email-login" type="email" placeholder="E-mail" required>
        <input class="psw-login" type="password" placeholder="Password" required>
        <button class="btn-login">Login</button>
        <p>Or<p/>
        <button class="btn-google">Login with Google</button>
      </form>
    </div> `;
  rootElement.innerHTML = formHtml;

  const loginForm = rootElement.querySelector('.btn-login');
  loginForm.addEventListener('click', (e) => {
    e.preventDefault();
    const userEmail = document.querySelector('.email-login').value;
    const userPassword = document.querySelector('.psw-login').value;

    if (userEmail === '' || userPassword === '') {
      alert('There are blank fields');
    } else {
      SingIn(userEmail, userPassword);
    }
  });

  const loginGoogle = rootElement.querySelector('.btn-google');
  loginGoogle.addEventListener('click', (e) => {
    e.preventDefault();
    return SingInGoogle();
  });
  return rootElement;
};
