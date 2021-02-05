import { RouteProp } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { plate } from "../models/plate"

export type GenericStackParamList = {
    Classico: undefined,
    Vegetariano: undefined,
    Vegano: undefined,
    Ristorante: {
        name?: string,
        piatti?: plate[],
    },
    Ordine: {
        name?: string,
        allPiatti?: plate[],
    },
    Ricevuto: {
        amount?: number,
        allPiatti?: plate[]
    }

}

export type GenericNavProps<T extends keyof GenericStackParamList> = {
    navigation: StackNavigationProp<GenericStackParamList, T>;
    route: RouteProp<GenericStackParamList, T>
    restaurantName: string
    allPlates: []
}