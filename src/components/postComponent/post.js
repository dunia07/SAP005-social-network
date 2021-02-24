import { onNavigate } from '../../utils/history.js';

export const updatelikePost = async (postId) => {
  const numberOfLikesElement = document.querySelector(`#likes-counter-${postId}`);
  // eslint-disable-next-line no-unused-vars
  const numberOfLikes = Number(numberOfLikesElement.textContent);
  await firebase.firestore().collection('posts').doc(postId).get()
    .then((doc) => {
      if (doc.data().likes === 0) {
        firebase.firestore().collection('posts').doc(postId).update({
          likes: firebase.firestore.FieldValue.increment(1),
        });
        // numberOfLikesElement.textContent = numberOfLikes + 1;
      } else {
        firebase.firestore().collection('posts').doc(postId).update({
          likes: firebase.firestore.FieldValue.increment(-1),
        });
        // numberOfLikesElement.textContent = numberOfLikes - 1;
      }
    });
    
};

export const deletePost = (postId) => {
  firebase.firestore()
  .collection('posts')
  .doc(postId)
  .delete();
}

export const updateTextPost = (postId, newText) => {
    firebase.firestore().collection('posts').doc(postId).update({
      text: newText
    });
}

export const addLikeListener = (post) => {
  const postId = document.getElementById(post.id);
  // eslint-disable-next-line no-unused-vars
  postId.addEventListener('click', (e) => {
    e.preventDefault;
    updatelikePost(post.id);
    onNavigate('/feed');
  });
}

export const addUpdateTextListener = (post, postElement) => {
  postElement.querySelector('.button-update-' + post.id).addEventListener('click', (e) => {
    e.preventDefault();
    const updateText = document.getElementById('update-text-' + post.id).value;
    console.log(updateText);
    updateTextPost(post.id, updateText);
    onNavigate('/feed');
  });
}

export const addDeleteListener = (post, postElement) => {
  postElement.querySelector('.button-delete-' + post.id).addEventListener('click', (e) => {
    e.preventDefault();
    const confirmDelete = window.confirm('Deseja deletar o post?');
    if (confirmDelete === true) {
      deletePost(post.id);
      postElement.remove('.post-individual');
    }
  });
}

function renderPost(user) {
  const postContainer = document.querySelector('.posted-text');
  firebase.firestore().collection('posts').where('user', '==', user.uid).get()
    .then((querySnapshot) => {
      querySnapshot.forEach((post) => {
        const database = post.data();
        const postElement = document.createElement('div');
        postElement.classList.add('post-individual');
        postElement.innerHTML = `
            <li class="name-profile">${database.name}</li>
            <li class="date-post">${database.date} ${database.time}</li>
            <li class="post-posted">${database.text}</li>
            <img class="profile-pic" src=${database.image} alt="Image">
            <div class="vertical-infos-post">
            
            <div class="buttons-social">
              <a id='likes-counter-${post.id}'>${database.likes}</a> 
              <button id='${post.id}' class='btn-like'><i>💛</i></button>
              <button class='button-delete-${post.id}' data-delete='${post.id}'><i>🗑️</button>
            <div>
              <div id="modal-promocao" class="modal-container> 
                <div class="modal">
                  <form>
                    <input id="update-text-${post.id}" placeholder="Edit your post here" type="text">
                    <button id="button-edit"class='button-update-${post.id}' <i>✓</button>
                  </form>
                </div>
              </div>
              </div>
            <input class="comment" placeholder="Comment" type="text">
            `;
            
        postContainer.append(postElement);
        addLikeListener(post);
        addDeleteListener(post, postElement);
        addUpdateTextListener(post, postElement);
      });
    })
    .catch(() => {
      const postElement = `
        <h1>Error on load please try later</h1>`;
      postContainer.innerHTML = postElement;
    });
}
export default renderPost;
export const showPosts = () => firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    renderPost(user);
    return user;
  }
  return null;
});

