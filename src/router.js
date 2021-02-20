// Este é seu ponto de entrada da sua aplicação
import { Feed } from './pages/feed/index.js';
import { Home } from './pages/home/index.js';
import { Login } from './pages/login/index.js';
import { SignUp } from './pages/signup/index.js';
import { IsCurrentUser } from './services/index.js';
import { onNavigate } from './utils/history.js';

export const routeRender = () => {
  const rootDiv = document.getElementById('root');
  const routes = {
    '/': Home,
    '/login': Login,
    '/signup': SignUp,
    '/feed': Feed,
  };

  rootDiv.innerHTML = '';
  rootDiv.appendChild(routes[window.location.pathname]());

  document.getElementById('home').addEventListener('click', (e) => {
    e.preventDefault();
    onNavigate('/');
  });

  document.getElementById('login').addEventListener('click', (e) => {
    e.preventDefault();
    IsCurrentUser('/login');
  });

  if (document.getElementById('btn-login') != null) {
    document.getElementById('btn-login').addEventListener('click', (e) => {
      e.preventDefault();
      IsCurrentUser('/login');
    });
  }

  document.getElementById('signup').addEventListener('click', (e) => {
    e.preventDefault();
    IsCurrentUser('/signup');
  });

  if (document.getElementById('btn-signup') != null) {
    document.getElementById('btn-signup').addEventListener('click', (e) => {
      e.preventDefault();
      IsCurrentUser('/signup');
    });
  }
};

window.addEventListener('popstate', routeRender);

window.addEventListener('load', routeRender);
