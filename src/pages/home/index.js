export const Home = () => {
  // Coloque sua página
  const rootElement = document.createElement('div');
  const singupHtml = `
    <main>
      <section class="container-home">
        <h1>Welcome!</h1>
        <img src="images/welcome.png" alt="Welcome to BeeU">
        <p>Connect with people from all over the world and learn to appreciate the natural beauty.</p>

        <section class="btn-container">
          <button class="btn-login" id="btn-login">Login</button> 
          <button class="btn-signup" id="btn-singup">SignUp</button>
        </section> 
      </section>
    </main>`;
  rootElement.innerHTML = singupHtml;
  return rootElement;
};
