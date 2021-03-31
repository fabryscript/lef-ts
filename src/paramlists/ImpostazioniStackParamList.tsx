import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type ImpostazioniStackParamList = {
  Impostazioni: undefined;
  Profilo: undefined;
  Info: undefined;
  Preferenze: undefined;
  TOS: undefined;
  InsertProcess: undefined;
};

export type ImpostazioniNavProps<T extends keyof ImpostazioniStackParamList> = {
  navigation: StackNavigationProp<ImpostazioniStackParamList, T>;
  route: RouteProp<ImpostazioniStackParamList, T>;
};
