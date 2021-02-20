export const Home = () => {
  // Coloque sua página
  const rootElement = document.createElement('div');
  const signupHtml = `
    <main>
      <section class="welcome-home">
        <h1>Welcome!</h1>
        <img src="images/welcome.png" alt="Welcome to BeeU">
        <p>Connect with people from all over the world and learn to appreciate the natural beauty.</p>

        <button class="login" id="btn-login">Login</button> 
        <button class="signup" id="btn-signup">SignUp</button>
      </section>
    </main>`;
  rootElement.innerHTML = signupHtml;
  return rootElement;
};
