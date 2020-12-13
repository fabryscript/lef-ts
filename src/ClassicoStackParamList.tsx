import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type ClassicoParamList = {
    Classico: undefined,
    Ristorante: {
        name?: string,
        piatti?: [
            one?: string,
            two?: string,
            three?: string
        ]
    }
    Ordine: {
        name?: string,
        allPiatti?: [
            one?: string,
            two?: string,
            three?: string
        ]
    }
}

export type ClassicoNavProps<T extends keyof ClassicoParamList> = { 
    navigation: StackNavigationProp<ClassicoParamList, T>;
    route: RouteProp<ClassicoParamList, T>
    restaurantName: string
    allPlates: []
}