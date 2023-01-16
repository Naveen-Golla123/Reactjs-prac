import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const fireBaseConfig = {
    apiKey: "AIzaSyB6pGeq_ruUmtp1ThwDFjCx9nCuTiv9zmU",
    authDomain: "resturantapp-80580.firebaseapp.com",
    databaseURL: "https://resturantapp-80580-default-rtdb.firebaseio.com",
    projectId: "resturantapp-80580",
    storageBucket: "resturantapp-80580.appspot.com",
    messagingSenderId: "533278309511",
    appId: "1:533278309511:web:be9e66b0c58f875f78cc22",
    measurementId: "G-NEX30G3VM7"
}

const app = getApps.length > 0 ? getApp : initializeApp(fireBaseConfig);
console.log(getApps)
const fireStore = getFirestore(app)
const storage = getStorage(app)

export { app, fireStore, storage }
