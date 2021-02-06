import { RouteProp } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { plate } from "../models/plate"

export type GenericStackParamList = {
    Classico: undefined,
    Vegetariano: undefined,
    Vegano: undefined,
    OrdiniRecenti: undefined,
    Ristorante: {
        restaurantName?: string,
        piatti?: plate[],
    },
    Ordine: {
        restaurantName?: string,
        allPiatti?: plate[],
    },
    Ricevuto: {
        restaurantName?: string,
        amount?: number,
        allPiatti?: plate[]
    },
    OrderDetails: {
        restaurantName?: string,
        amount?: number,
        allPiatti?: plate[],
        method?: string,
        orderID?: string
    },
}

export type GenericNavProps<T extends keyof GenericStackParamList> = {
    navigation: StackNavigationProp<GenericStackParamList, T>;
    route: RouteProp<GenericStackParamList, T>
    restaurantName: string
    allPlates: []
}