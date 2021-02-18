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
    Fasi: any,
    FaseCarboidrati: {
        restaurantName?: string,
        allIngredients?: plate[]
    }
    FaseGrassi: any,
    FaseProteine: any,
    Riepilogo: {
        restaurantName?: string,
        amount?: number,
        allIngredients?: plate[]
    },
    OrderDetails: {
        restaurantName?: string,
        amount?: number,
        allIngredients?: plate[],
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