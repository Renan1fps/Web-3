import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

const baseUrl = "http://localhost:8000";
const firebaseConfig = {
  apiKey: "AIzaSyAr_PFw8M5Y5HY0XMhh0Bwl2AwL5O1hLU8",
  authDomain: "aula-web-ed32e.firebaseapp.com",
  projectId: "aula-web-ed32e",
  storageBucket: "aula-web-ed32e.appspot.com",
  messagingSenderId: "583347514426",
  appId: "1:583347514426:web:84cbfbe9881d9522cf5903",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let btnAuth = document.getElementById("btn_auth");
btnAuth.addEventListener("click", handleGoogleSignIn);

async function handleGoogleSignIn() {
  const provider = new GoogleAuthProvider();

  const { user } = await signInWithPopup(auth, provider);

  const response = await fetch(`${baseUrl}/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: user.email,
      authType: "google",
      name: user.displayName,
    }),
  });

  const { token, id } = await response.json();

  const dataUser = await fetch(`${baseUrl}/users/${id}`);

  const userJson = await dataUser.json();

  localStorage.setItem("@token", token);
  localStorage.setItem("@user", JSON.stringify(userJson));
  window.location.href = "main.html";
}

let btnLogin = document.getElementById("btnLogin");
btnLogin.addEventListener("click", handleLoginAPI);

async function handleLoginAPI() {
  const email = document.getElementById("in-login").value;
  const password = document.getElementById("in-password").value;

  const response = await fetch(`${baseUrl}/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, authType: "api", password }),
  });

  if(response.status === 500){
    alert("Credenciais inválidas");
    return
  }

  const { token, id } = await response.json();

  const dataUser = await fetch(`${baseUrl}/users/${id}`);

  const userJson = await dataUser.json();

  localStorage.setItem("@token", token);
  localStorage.setItem("@user", JSON.stringify(userJson));
  window.location.href = "main.html";
}
