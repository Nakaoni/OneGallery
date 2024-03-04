import { ScreenType } from "App"
import { SetStateAction, createContext } from "react"

export type RouterContextType = {
    route: string,
    setRoute: (route: SetStateAction<ScreenType>) => void,
}

export const RouterContext = createContext<RouterContextType>({
    route: '',
    setRoute: (route: SetStateAction<ScreenType>) => { },
})

