// USE WITH FIREBASE AUTH
// import ViewDirectorBasedOnUserAuthStatus from './utils/viewDirector';
import 'bootstrap'; // import bootstrap elements and js
import '../styles/main.scss';
import {
  getRequest
} from '../api/promises';
import renderToDom from '../utils/renderToDom';

// postRequest, patchRequest, deleteRequest

const htmlStructure = () => {
  document.querySelector('#app').innerHTML = `
    <h1>JOKE GEN</h1>
    <h2 id="joke-text"></h2><br />
    <button class="btn btn-warning" id="get-joke">GET JOKE</button>
  `;
};

/* <button class="btn btn-info" id="post-name">POST YOUR NAME</button>
<button class="btn btn-success" id="patch-name">PATCH YOUR NAME</button>
<button class="btn btn-danger" id="delete-name">DELETE YOUR NAME</button> */

const events = () => {
  let isFirstClick = true;
  document.querySelector('#get-joke').addEventListener('click', () => {
    if (isFirstClick) {
      getRequest().then((joke) => {
        document.querySelector('#get-joke').dataset.joke = JSON.stringify(joke);

        const btnText = 'GET PUNCHLINE';
        renderToDom('#get-joke', btnText);
        renderToDom('#joke-text', joke.setup);

        isFirstClick = false;
      });
    } else {
      const joke = JSON.parse(document.querySelector('#get-joke').dataset.joke);
      renderToDom('#joke-text', `${joke.delivery}`); // add back in ${joke.setup} to display both

      const btnText = 'GET A NEW JOKE';
      renderToDom('#get-joke', btnText);

      isFirstClick = true;
    }
  });
  // document.querySelector('#post-name').addEventListener('click', () => {
  //   // update this object with your name
  //   const payload = { name: 'cPack' };
  //   postRequest(payload).then(console.warn);
  // });
  // document.querySelector('#patch-name').addEventListener('click', () => {
  //   // update this object with your name and firebaseKey that was logged in the console when you created your name in the database
  //   const payload = { name: 'Chris Pack', firebaseKey: '' };
  //   patchRequest(payload).then(console.warn);
  // });
  // document.querySelector('#delete-name').addEventListener('click', () => {
  //   const firebaseKey = '';
  //   deleteRequest(firebaseKey).then(console.warn);
  // });
};

const startApp = () => {
  htmlStructure();
  events(); // ALWAYS LAST
};

startApp();
