import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyD3OCZT9QKhWU3cCapxQlOcu_cle7t6lmc",
    authDomain: "ridbuter.firebaseapp.com",
    projectId: "ridbuter",
    storageBucket: "ridbuter.appspot.com",
    messagingSenderId: "587151532996",
    appId: "1:587151532996:web:e30af8c97ee4198e89ba91",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Get user input
  const name = document.getElementById("name").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User signed up:", user);
      localStorage.setItem("userName", name);
      window.location.href = "/index.html"; // Redirect to login page
    })
    .catch((error) => {
      console.error("Signup error:", error.message);
    });
});
