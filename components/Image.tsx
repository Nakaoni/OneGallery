import { ImageSourcePropType } from "react-native"
import { Image, StyleSheet, View } from "react-native"

export type ImageViewerPropType = {
    source: ImageSourcePropType
}

export default function ImageViewer({ source }: ImageViewerPropType) {
    console.log(source)
    return (
        <View style={styles.imageContainer}>
            <Image source={source} />
        </View>
    )
}

const styles = StyleSheet.create({
    imageContainer: {}
})
