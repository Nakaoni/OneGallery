import { useContext } from "react"
import { ImageSourcePropType, Text, View } from "react-native"
import { Image, StyleSheet } from "react-native"
import { ThemeContext, ThemeContextType } from "@contexts/ThemeContext"
import { Gesture, GestureDetector } from "react-native-gesture-handler"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { RouterContext, RouterContextType } from "@contexts/RouterContext"

export type ImagePreviewerPropType = {
    source: ImageSourcePropType,
    label?: string,
}

export default function ImagePreviewer({ source, label }: ImagePreviewerPropType) {
    const router = useContext<RouterContextType>(RouterContext)
    const theme = useContext<ThemeContextType>(ThemeContext).theme
    const tap = Gesture.Tap()
        .onEnd(async () => {
            await AsyncStorage.setItem('image', JSON.stringify(source))
            router.setRoute('photo-manager')
        })

    return (
        <GestureDetector gesture={tap}>
            <View style={[styles.imageContainer]}>
                <Image source={source} style={[styles.image, { borderColor: theme.subtle, }]} />
                <View style={styles.imageLabelContainer}>
                    <Text style={[styles.imageLabel, { color: theme.text, backgroundColor: theme.overlay + 'AA' }]}>{label}</Text>
                </View>
            </View>
        </GestureDetector>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        position: 'relative',
        marginVertical: 8,
        marginHorizontal: 8,
    },
    image: {
        width: 160,
        height: 220,
        borderWidth: 1,
        borderRadius: 10,
        resizeMode: 'contain',
    },
    imageLabelContainer: {
        position: 'absolute',
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        paddingBottom: 8,
    },
    imageLabel: {
        borderRadius: 4,
        padding: 8,
    },
})
