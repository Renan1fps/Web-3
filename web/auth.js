console.log('Script carregado.');

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js'

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let btnAuth = document.getElementById("btn_auth");
btnAuth.addEventListener('click', handleGoogleSignIn);

function handleGoogleSignIn() {
  console.log('Botão clicado. Função handleGoogleSignIn chamada.');
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {
        console.log(result);
        window.location.href = 'main.html';
    })
    .catch((err) => console.log(err));
}
