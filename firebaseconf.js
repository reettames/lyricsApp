import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
export default function initApp(){
  const firebaseConf = {
    apiKey: "AIzaSyBLlxQGJLqfAVj3hqpkxW_SXNPWR2ssOZk",
    authDomain: "soittolistat-a3023.firebaseapp.com",
    databaseURL: "https://soittolistat-a3023-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "soittolistat-a3023",
    storageBucket: "soittolistat-a3023.appspot.com",
    messagingSenderId: "1017583205795",
    appId: "1:1017583205795:web:2b8101ac9ccad6b82eee16"
  }
  const app = initializeApp(firebaseConf);
  const db = getDatabase(app);
  return db;
}