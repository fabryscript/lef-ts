import React from "react";
import { View } from "react-native";
import { ImpostazioniNavProps } from "../paramlists/ImpostazioniStackParamList";
import firebase from "firebase";
import { auth, firestore } from "../auth/firebase";

const PersonalData = ({ navigation }: ImpostazioniNavProps<"Preferenze">) => {
  const preferencesRef = firestore
    .collection("users")
    .doc(`/${auth.currentUser?.uid}`);

  preferencesRef.get().then((data) => {
    console.log(data);
  });
  return <View></View>;
};

export default PersonalData;
