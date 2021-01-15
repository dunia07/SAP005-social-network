/* eslint-disable no-console */
function renderPost(user) {
  const postContainer = document.querySelector('.posted-text');
  firebase.firestore().collection('posts').where('user', '==', user.uid).get()
    .then((querySnapshot) => {
      querySnapshot.forEach((post) => {
        const database = post.data();
        const postElement = `
          <ul>
            <li>${database.name}</li>
            <li>
              <img src=${database.image} alt="Image">
            <li>
            <li>${database.date} ${database.time}</li>
            <li>${database.text}</li>
            <li>${database.likes}</li>
            <li>
              <input class="comment" placeholder="Comment" type="text">
              <button class="btn-comment">Send</button>
            </li>
          </ul>`;
        postContainer.innerHTML += postElement;
      });
    })
    .catch(() => {
      const postElement = `
        <h1>Error on load please try later</h1>`;
      postContainer.innerHTML = postElement;
    });
}

export const showPosts = () => firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    renderPost(user);
    return user;
  }
  return null;
});
