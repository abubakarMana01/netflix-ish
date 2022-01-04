import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyAoQtsC9mFpBL-NRg5HtNd8oBZfZmejpus",
	authDomain: "netflix-clone-4580f.firebaseapp.com",
	projectId: "netflix-clone-4580f",
	storageBucket: "netflix-clone-4580f.appspot.com",
	messagingSenderId: "456963850309",
	appId: "1:456963850309:web:092bc670e448f4db25632c",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export { db, auth, storage };
