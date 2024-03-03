import { ThemeContext } from "@contexts/ThemeContext"
import { useContext, useEffect, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import * as FileSystem from "expo-file-system"

export default function PhotoList() {
    const theme = useContext(ThemeContext).theme
    const [images, setImages] = useState([])

    useEffect(() => {
        const getImages = async () => {
            const imagesDir = await FileSystem.getInfoAsync(FileSystem.documentDirectory)

            if (!imagesDir.exists && !imagesDir.isDirectory) {
                return
            }

            const contents = await FileSystem.readDirectoryAsync(imagesDir.uri)

            console.log(contents)
        }

        getImages()
    })

    return (
        <View style={[styles.container, { backgroundColor: theme.base }]}>
            <Text>List</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
