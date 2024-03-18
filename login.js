import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyD3OCZT9QKhWU3cCapxQlOcu_cle7t6lmc",
  authDomain: "ridbuter.firebaseapp.com",
  projectId: "ridbuter",
  storageBucket: "ridbuter.appspot.com",
  messagingSenderId: "587151532996",
  appId: "1:587151532996:web:e30af8c97ee4198e89ba91",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

console.log(auth);

const loginForm = document.getElementById("loginForm");


loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
  
    // Get user input
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    // Use 'auth' directly, not 'app.auth()'
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User signed in:", user);
        window.location.href = "/index.html";
      })
      .catch((error) => {
        console.error("Login error:", error.message);
      });
  });
  
