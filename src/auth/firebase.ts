import firebase from "firebase";
import {
  REACT_APP_FIREBASE_API_KEY,
  REACT_APP_FIREBASE_AUTH_DOMAIN,
  REACT_APP_FIREBASE_APP_ID,
  REACT_APP_FIREBASE_MEASUREMENT_ID,
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  REACT_APP_FIREBASE_PROJECT_ID,
  REACT_APP_FIREBASE_STORAGE_BUCKET,
} from "@env";
import { plate } from "../models";

const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: REACT_APP_FIREBASE_APP_ID,
  measurementId: REACT_APP_FIREBASE_MEASUREMENT_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const executeRegistration = async (email: string, password: string) => {
  try {
    return new Promise<boolean | string>((resolve, reject) => {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          user.user?.sendEmailVerification().then(() => {
            resolve(true);
            if (user.additionalUserInfo?.isNewUser) resolve("Nuovo utente");
          });
        })
        .catch((_error) => {
          const error = JSON.stringify(_error);
          if (error.includes("email"))
            reject("Email già in uso in un altro account");
          else if (error.includes("password"))
            reject("La password deve contenere almeno 6 caratteri");
        });
    });
  } catch (error) {
    console.log(error);
  }
};

export let timestamp = firebase.firestore.FieldValue.serverTimestamp();

interface Order {
  restaurantName: string | undefined;
  amount: number | undefined;
  allPiatti: plate[] | undefined;
  user: string | null | undefined;
  paymentMethod: string | undefined;
  createdAt?: firebase.firestore.FieldValue;
}
export const addOrder = async (order: Order) => {
  const ordersCollectionRef = firebase.firestore().collection("/orders");
  return new Promise<boolean>((resolve, reject) => {
    try {
      ordersCollectionRef
        .add(order)
        .then((_data) => {
          resolve(true);
        })
        .catch((_error) => {
          resolve(false);
        });
    } catch (error) {
      resolve(false);
    }
  });
};
