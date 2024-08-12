// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"; // Import Firebase Storage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfmBQy4Ov8JH3eto-FSJmAiqO4cE9DMA0",
  authDomain: "formation-573d3.firebaseapp.com",
  projectId: "formation-573d3",
  storageBucket: "formation-573d3.appspot.com",
  messagingSenderId: "257819797628",
  appId: "1:257819797628:web:3f2e67c66f6a2748cfc1f9",
  measurementId: "G-FQ5FWBE11B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app); // Initialize Firebase Storage

// Export the storage object if you need to use it elsewhere in your project
export { storage };
