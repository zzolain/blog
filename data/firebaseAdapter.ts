import { FirebaseOptions, getApp, initializeApp } from "@firebase/app";
import { getFirestore } from "@firebase/firestore";

const config: FirebaseOptions = {
  apiKey: "AIzaSyCuvFHOCtBRy1j8sA9dkWx8q0eWx-OPjRI",
  authDomain: "blog-31625.firebaseapp.com",
  projectId: "blog-31625",
  storageBucket: "blog-31625.appspot.com",
  messagingSenderId: "267798392305",
  appId: "1:267798392305:web:8149cac36f0ca749f96850",
  measurementId: "G-PGR9E5W5KP",
};

function createFirebaseApp(config: FirebaseOptions) {
  try {
    return getApp();
  } catch {
    return initializeApp(config);
  }
}

const firebaseApp = createFirebaseApp(config);

export const firestore = getFirestore(firebaseApp);
