import { signInWithEmailAndPassword, signOut as logOut } from '@firebase/auth';
import { collection, getDocs, query, where, setDoc, updateDoc, doc } from '@firebase/firestore';

import { auth, db } from '../../configs/Fire';
import { dispatchError, dispatchLoading, dispatchSuccess, date } from '../../utils';

export const GET_TRANSACTION = 'GET_TRANSACTION';

export const getTransaction = () => (dispatch) => {
  dispatchLoading(dispatch, GET_TRANSACTION);

  async function getTransactions() {
    const q = query(collection(db, 'transactions'));

    const querySnapshot = await getDocs(q);
    const data = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      if (doc.exists) {
        // console.log(doc.id, ' => ', doc.data());
        data.push({ key: doc.id, ...doc.data() });
      } else {
        dispatchError(dispatch, GET_TRANSACTION, 'data kosong');
      }
    });
    dispatchSuccess(dispatch, GET_TRANSACTION, data);
  }

  return getTransactions();
};

export const confirmTransaction = (order_id, transaction_status) => (dispatch) => {
  const status = transaction_status === 'settlement' || transaction_status === 'capture' ? 'paid' : transaction_status;
  const userId = order_id.split('-');
  // console.log(userId);

  async function updateTransaction() {
    const qtrx = query(collection(db, 'transactions'), where('orderId', '==', order_id), where('status', '!=', 'paid'));
    const querySnapshot = await getDocs(qtrx);

    if (querySnapshot.docs) {
      let amount = '';

      querySnapshot.forEach((docs) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(docs.id, ' => ', docs.data());
        amount = docs.data().amount;
        let today = new Date();
        async function updateStatus() {
          const trxDocRef = doc(db, 'transactions', docs.id);
          await updateDoc(trxDocRef, {
            status,
            paidDate: date(today),
          });
        }
        return updateStatus();
      });

      async function getUser() {
        const q = query(collection(db, 'users'), where('uid', '==', userId[1]));

        const Snap = await getDocs(q);
        Snap.forEach((docsSnap) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(docsSnap.id, ' => ', docsSnap.data());
          async function updateUser() {
            const userDocRef = doc(db, 'users', docsSnap.id);
            await updateDoc(userDocRef, {
              balance: parseInt(docsSnap.data().balance) + parseInt(amount),
            });
          }
          return updateUser();
        });
      }

      return getUser();
    }
  }
  return updateTransaction();
};
