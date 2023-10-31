import axios from './axios';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';


const firebaseConfig = {
  apiKey: 'AIzaSyB4B91QsCqrC9bjtcRYob5cMRXwMMU79pk',
  authDomain: 'auth-d428a.firebaseapp.com',
  projectId: 'auth-d428a',
  storageBucket: 'auth-d428a.appspot.com',
  messagingSenderId: '506757203727',
  appId: '1:506757203727:web:60aa49461ffa4bdaa0a07a',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();



export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then(async (result) => {
      await axios.post('http://localhost:8080/users/login-with-google', {
        email: result.user.email,
        // password: 'asdasdasd',
      });
      console.log('result', result);
      console.log('email', result.user.email);
    })
    .then(() => {
      window.location.href = '/';
    })
    .catch((error) => {
      console.log(error);
    });
};



export const signUpWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then(async (result) => {
      console.log(result);

      await axios.post('http://localhost:8080/users/register-with-google', {
        name: result.user.displayName,
        email: result.user.email,
      });
    })
    .then(() => {
      window.location.href = '/';
    })
    .catch((error) => {
      console.log(error);
    });
};
