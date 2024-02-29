import { createContext } from "react"
import { ColorType, moon } from "./base/colors"

export type ThemeContextType = {
    theme: ColorType
}

export const ThemeContext = createContext<ThemeContextType>({
    theme: moon
})


