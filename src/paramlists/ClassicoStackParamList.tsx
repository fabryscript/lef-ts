import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { plate } from "../models";

export type ClassicoParamList = {
    Classico: undefined,
    Ristorante: {
        name?: string,
        piatti?: plate[],
    },
    Ordine: {
        name?: string,
        allPiatti?: plate[],
    },
    Ricevuto: undefined

}

export type ClassicoNavProps<T extends keyof ClassicoParamList> = {
    navigation: StackNavigationProp<ClassicoParamList, T>;
    route: RouteProp<ClassicoParamList, T>
    restaurantName: string
    allPlates: []
}