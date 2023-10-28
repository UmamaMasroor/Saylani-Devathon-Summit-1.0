


import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCCi4kZQ4fyfm9odFU02pvD1qyPtGjfND4",
    authDomain: "devathon-25de9.firebaseapp.com",
    projectId: "devathon-25de9",
    storageBucket: "devathon-25de9.appspot.com",
    messagingSenderId: "127978882901",
    appId: "1:127978882901:web:0c25a54ea64ce331e2d1dc",
    measurementId:"G-3GZXXM071B" // This is optional
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

// Function to fetch and display user data
function fetchAndDisplayUserData() {
  const user = auth.currentUser;
  
  if (user) {
    const userRef = ref(database, 'users/' + user.uid);

    onValue(userRef, (snapshot) => {
      const userData = snapshot.val();
      if (userData) {
        // Assuming you have an element with the id "user-info" to display user data
        const userInfoElement = document.getElementById('user-info');
        userInfoElement.innerHTML = `
          <p>Name: ${userData.firstName} ${userData.lastName}</p>
          <p>Email: ${userData.email}</p>
          <p>Last Login: ${userData.last_login ? new Date(userData.last_login).toLocaleString() : 'N/A'}</p>
        `;
      }
    });
  }
}

// Signup event listener
const signupButton = document.getElementById('signup');
signupButton.addEventListener('click', (e) => {
  e.preventDefault();
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      const userData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
      };

      // Set user data in the Firebase database
      set(ref(database, 'users/' + user.uid), userData);
      
      alert('User created!');
      fetchAndDisplayUserData(); // Display user data
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
    });
});

// Login event listener
const loginButton = document.getElementById('login');
loginButton.addEventListener('click', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      fetchAndDisplayUserData(); // Display user data
      alert('User logged in!');
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
    });

// signInWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Successfully signed in
//     const user = userCredential.user;
//     fetchAndDisplayUserData(); // Display user data
//   })
//   .catch((error) => {
//     // Handle the error
//     console.error(error);
//     alert("Login failed: " + error.message);
//   });
});



