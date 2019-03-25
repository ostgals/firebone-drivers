import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyDPEbDzKoZgAFPnZKUMBKeQS1LuZI8eBQQ',
  authDomain: 'firebone-d5fa4.firebaseapp.com',
  databaseURL: 'https://firebone-d5fa4.firebaseio.com',
  projectId: 'firebone-d5fa4',
  storageBucket: 'firebone-d5fa4.appspot.com',
  messagingSenderId: '99598855763',
};

const app = firebase.initializeApp(config);

export const auth = app.auth();
export const db = app.database();

export function runTask(op, params) {
  return new Promise((resolve, reject) => {
    let ref = db.ref('tasks').push();
    let listener = ref.on('value', snap => {
      let { result, error } = snap.val();
      if (result || error) {
        result ? resolve(result) : reject(error);
        ref.off('value', listener);
        ref.remove();
      }
    });
    ref.set({ op, params });
  });
}

export default app;
