import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBHgz2lJOhN-AuatTcR3SHIsdorNct8rlY",
    authDomain: "react-native-auth-54d86.firebaseapp.com",
    databaseURL: "https://react-native-auth-54d86.firebaseio.com",
    projectId: "react-native-auth-54d86",
    storageBucket: "react-native-auth-54d86.appspot.com",
    messagingSenderId: "863151849676",
    appId: "1:863151849676:web:5a83f62e19c35b252c8269",
    measurementId: "G-5HKWKF7SJV"
}

const Firebase = firebase.initializeApp(firebaseConfig)

export default Firebase