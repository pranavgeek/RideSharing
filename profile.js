import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

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

const profileInfo = document.getElementById("profileInfo");

onAuthStateChanged(auth, (user) => {
  if (user) {
    displayUserProfile(user);
  } else {
    window.location.href = "/loginPage.html";
  }
});

function displayUserProfile(user) {
  // Fetch user information from Firebase Authentication
  const userEmail = user.email;
  const userId = user.uid;

  // Display user information on the profile page
  profileInfo.innerHTML = `
    <p>Email: ${userEmail}</p>
    <p>User ID: ${userId}</p>
    <button id="logoutBtn">Logout</button>
  `;

  // Add event listener for logout button
  const logoutBtn = document.getElementById("logoutBtn");
  logoutBtn.addEventListener("click", () => {
    // Sign out the user
    auth.signOut().then(() => {
      console.log("User signed out");
      window.location.href = "/loginPage.html"; // Redirect to login page after logout
    }).catch((error) => {
      console.error("Logout error:", error.message);
    });
  });
}
