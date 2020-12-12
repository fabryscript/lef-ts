import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type ClassicoParamList = {
    Classico: undefined,
    Ristorante: {
        name?: string,
        piatti?: {
            one?: {
                nameP?:string,
                price: number
            },
            two?: {
                nameP?:string,
                price: number
            },
            three?: {
                nameP?:string,
                price: number
            },
            four?: {
                nameP?:string,
                price: number
            },
        }
    },
    Ordine: {
        allPiatti?: string,

    }
}

export type ClassicoNavProps<T extends keyof ClassicoParamList> = { 
    navigation: StackNavigationProp<ClassicoParamList, T>;
    route: RouteProp<ClassicoParamList, T>
}