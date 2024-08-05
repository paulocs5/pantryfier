// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
require('dotenv').config();

console.log(process.env);    


    
// TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
    
    // Your web app's Firebase configuration
   
    const firebaseConfig  = {
      apiKey: process.env.apiKey,
      authDomain: "headstarter-pantry-tracker-app.firebaseapp.com",
      projectId: "headstarter-pantry-tracker-app",
      storageBucket: "headstarter-pantry-tracker-app.appspot.com",
      messagingSenderId: "928869281575",
      appId: "1:928869281575:web:eeedde103775c5de998302",
    };
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const firestore  = getFirestore(app)
    export {app, firestore} 
    


