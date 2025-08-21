
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyDM8-OLsjxbg-C8Pk_LGgnx-jc_b3vmpis",
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
// };

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const db = getFirestore(app);


import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage"; // Add this import

const firebaseConfig = {
  apiKey: "AIzaSyDM8-OLsjxbg-C8Pk_LGgnx-jc_b3vmpis",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  // Add your databaseURL here (you'll need to get this from your Firebase project)
  databaseURL: "https://auth-57b38-default-rtdb.asia-southeast1.firebasedatabase.app/",
  // Add your storageBucket here (you'll need to get this from your Firebase project)
  storageBucket: "auth-57b38.firebasestorage.app"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app); // Add this export



