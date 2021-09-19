import { signInWithEmailAndPassword, signOut as logOut } from '@firebase/auth';
import { collection, getDocs, query, where } from '@firebase/firestore';

import { auth, db } from '../../configs/Fire';
import { dispatchError, dispatchLoading, dispatchSuccess } from '../../utils';

export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';
export const CHECK_LOGIN = 'CHECK_LOGIN';

export const signIn = (email, password) => (dispatch) => {
  // console.log(email, password);
  dispatchLoading(dispatch, SIGN_IN);

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // console.log(user.uid);

      async function getUser() {
        const q = query(collection(db, 'users'), where('uid', '==', user.uid));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, ' => ', doc.data());
          if (doc.data().role === 'admin') {
            localStorage.setItem('users', JSON.stringify(doc.data()));
            dispatchSuccess(dispatch, SIGN_IN, doc.data());
          }
          dispatchError(dispatch, SIGN_IN, 'Anda bukan admin');
        });
      }

      return getUser();
    })
    .catch((error) => {
      // console.log(error);
      const errorMessage = error.message;
      dispatchError(dispatch, SIGN_IN, errorMessage);
    });
};

export const checkLogin = (history) => (dispatch) => {
  dispatchLoading(dispatch, CHECK_LOGIN);

  if (localStorage.getItem('users')) {
    const user = JSON.parse(localStorage.getItem('users'));
    console.log(user);

    async function getUser() {
      const q = query(collection(db, 'users'), where('uid', '==', user.uid));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, ' => ', doc.data());
        localStorage.setItem('users', JSON.stringify(doc.data()));
        dispatchSuccess(dispatch, CHECK_LOGIN, doc.data());
      });
    }

    return getUser();
  } else {
    dispatchError(dispatch, SIGN_OUT, 'Silahkan Login');
    history.push('/login');
  }
};

export const signOut = (history) => (dispatch) => {
  dispatchLoading(dispatch, SIGN_OUT);

  logOut(auth)
    .then(() => {
      // console.log('berhasil');
      dispatchSuccess(dispatch, SIGN_OUT, true);
      localStorage.removeItem('users');
      history.push('/login');
    })
    .catch((error) => {
      const errorMessage = error.message;
      dispatchError(dispatch, SIGN_OUT, errorMessage);
    });
};
