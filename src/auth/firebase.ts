import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import {
  REACT_APP_FIREBASE_API_KEY,
  REACT_APP_FIREBASE_AUTH_DOMAIN,
  REACT_APP_FIREBASE_APP_ID,
  REACT_APP_FIREBASE_MEASUREMENT_ID,
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  REACT_APP_FIREBASE_PROJECT_ID,
  REACT_APP_FIREBASE_STORAGE_BUCKET,
} from "@env";
import Toast from "react-native-toast-message";

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

export const executeRegistration = async (
  email: string,
  password: string
): Promise<string> => {
  return new Promise<string>(async (resolve, reject) => {
    try {
      await auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCrediential) => {
          resolve(userCrediential.user?.email!);
          Toast.show({
            type: "success",
            text1: "Fatto! Account creato con successo!",
            text2: "Controlla l'email di verifica!",
            autoHide: true,
          });
        })
        .catch((error) => {
          console.log(error.code);
          if (error.code === "auth/email-already-in-use") {
            Toast.show({
              type: "error",
              text1: "Questa email è già in uso",
              text2: "Account non creato.",
              autoHide: true,
            });
            return;
          }
          reject(error);
        });
    } catch (error) {
      reject(error);
    }
  });
};

export let timestamp = firebase.firestore.FieldValue.serverTimestamp();

interface OrderPlate {
  name: string;
  price: number;
  quantity?: string;
}

interface Order {
  restaurantName?: string | undefined;
  totale?: number | undefined;
  allIngredients?: OrderPlate[] | undefined;
  user?: string | null | undefined;
  paymentMethod?: string | undefined;
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
          reject(false);
        });
    } catch (error) {
      reject(false);
    }
  });
};

export const logIn = async (email: string, password: string) => {
  if (email.trim() === "" || password.trim() === "") {
    Toast.show({
      type: "error",
      text1: "I campi non possono essere vuoti",
    });
    return;
  }
  await auth.signInWithEmailAndPassword(email!, password!).catch((_error) => {
    Toast.show({
      type: "error",
      position: "top",
      text1: "Non abbiamo trovato un account!",
      text2: "Ti spiace riprovare?",
    });
  });
};

export const passwordReset = async (email: string) => {
  if (email.trim() === "") {
    Toast.show({
      type: "error",
      text1: "Il campo non può essere vuoto! ❌",
    });
  }
  await auth
    .sendPasswordResetEmail(email)
    .then(() => {
      Toast.show({
        type: "success",
        text1: "Email inviata con successo! ✅",
        text2: "...controlla anche lo spam!",
        autoHide: true,
      });
    })
    .catch((error) => {
      if (error.code === "auth/invalid-email") {
        Toast.show({
          type: "error",
          text1: "L'email non è in formato corretto! 💢",
          autoHide: true,
        });
      } else if (error.code === "auth/user-not-found") {
        Toast.show({
          type: "error",
          text1: "Utente non trovato!",
          text2: "(╯°□°）╯︵ ┻━┻",
          autoHide: true,
        });
      }
    });
};
