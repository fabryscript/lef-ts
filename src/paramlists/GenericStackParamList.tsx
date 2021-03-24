import { RouteProp } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"

export type GenericStackParamList = {
    Classico: undefined,
    Vegetariano: undefined,
    Vegano: undefined,
    OrdiniRecenti: undefined,
    Ristorante: {
        restaurantName?: string,
        piatti?: any[],
    },
    Fasi: {
        restaurantName?: string
    },
    FaseGrassi: {
        restaurantName?: string
    },
    FaseProteine: {
        restaurantName?: string
    },
    Riepilogo: {
        restaurantName?: string,
        price?: number,
        allIngredients?: any[]
    },
    OrderDetails: {
        restaurantName?: string,
        price?: number,
        allIngredients?: any[],
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