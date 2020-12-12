import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type ClassicoParamList = {
    Classico: undefined,
    Ristorante: {
        name?: string,
        piatti?: [
            one?: string,
            two?: string,
            three?: string,
            four?: string
        ]
    },
    Ordine: undefined
}

export type ClassicoNavProps<T extends keyof ClassicoParamList> = { 
    navigation: StackNavigationProp<ClassicoParamList, T>;
    route: RouteProp<ClassicoParamList, T>
}