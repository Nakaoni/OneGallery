import { createContext } from "react"
import { ThemeType, moon } from "global/themes"

export type ThemeContextType = {
    theme: ThemeType
}

export const ThemeContext = createContext<ThemeContextType>({
    theme: moon
})


