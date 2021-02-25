import { onNavigate } from '../../utils/history.js';

var clicked = false;

export const updatelikePost = async (postId, postElement) => {
  if(!clicked){
    clicked = true;
    const numberOfLikesElement = postElement.querySelector(`#likes-counter-${postId}`);
    const numberOfLikes = Number(numberOfLikesElement.textContent);
    await firebase.firestore().collection('posts').doc(postId).get()
      .then((doc) => {
        if (doc.data().likes === 0) {
          firebase.firestore().collection('posts').doc(postId).update({ 
            likes: firebase.firestore.FieldValue.increment(1),
          });
          numberOfLikesElement.textContent = numberOfLikes + 1;
        } else {
          firebase.firestore().collection('posts').doc(postId).update({
            likes: firebase.firestore.FieldValue.increment(-1),
          });
          numberOfLikesElement.textContent = numberOfLikes - 1;
        }
    });
    
    setTimeout(function(){
      clicked = false;
    }, 1000);
  }
};

export const addLikeListener = (post, postElement) => {
  const postId = document.getElementById(post.id);
  postId.addEventListener('click', (e) => {
    e.preventDefault;
    updatelikePost(post.id, postElement);
  });
}

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
      onNavigate('/feed');
    }
  });
}

export const updateComments = (id, subComment) => {
  return firebase
    .firestore()
    .collection('post')
    .doc(id)
    .update({ comments: firebase.firestore.FieldValue.arrayUnion(subComment) });
};

function compare(a, b) {
  if (a.time < b.time) {
    return -1;
  }
  if (a.time > b.time) {
    return 1;
  }
  // a must be equal to b
  return 0;
}


function renderPost(user) {
  const postContainer = document.querySelector('.posted-text');
  firebase.firestore().collection('posts')
  .where('user', '==', user.uid)
  .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((post) => {

        const database = post.data();
        const postElement = document.createElement('div');
        postElement.classList.add('post-individual');
        var data = new Date(database.time)
        postElement.innerHTML = `
        <div class="profile-items">
          <div class="up-profile">  
            <img class="profile-pic" src=${database.image} alt="Image">
            <li class="name-profile">${database.name}</li>
          </div>
          <div class='date-posts'>
            <li class="post-posted">${database.text}</li>
            <li class="date-post">${data}</li>
            </div>
            <div class="vertical-infos-post">
            <div class="buttons-social">
              <a class="likes-counters" id='likes-counter-${post.id}'>${database.likes}</a> 
              <button id='${post.id}' class='btn-like'>🖤</button>
              <button id="button-delete"class='button-delete-${post.id}' data-delete='${post.id}'>🗑️</button>
            <div>
              <div id="modal-promocao" class="modal-container> 
                <div class="modal">
                  <form class="update-edit-post">
                    <input class="update-texts"id="update-text-${post.id}" placeholder="Edit your post here" type="text">
                    <button id="button-edit"class='button-update-${post.id}' <i>✓</button>
                  </form>
              </div>
              </div>
            `;
            
        postContainer.append(postElement);
        addLikeListener(post, postElement);
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

