import { useContext } from "react"
import { ImageSourcePropType } from "react-native"
import { Image, StyleSheet } from "react-native"
import { ThemeContext, ThemeContextType } from "@contexts/ThemeContext"

export type ImageViewerPropType = {
    source: ImageSourcePropType
}

export default function ImageViewer({ source }: ImageViewerPropType) {
    const theme = useContext<ThemeContextType>(ThemeContext).theme

    return (
        <Image source={source} style={[styles.image, { borderColor: theme.subtle, }]} />
    )
}

const styles = StyleSheet.create({
    image: {
        width: 320,
        height: 440,
        borderWidth: 1,
        borderRadius: 10,
        resizeMode: 'contain'
    },
})
