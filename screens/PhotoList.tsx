import { ThemeContext } from "@contexts/ThemeContext"
import { useContext, useEffect, useState } from "react"
import { FlatList, StyleSheet, Text, View } from "react-native"
import * as FileSystem from "expo-file-system"
import { Constants } from "@global/constants"
import ImagePreviewer from "@components/ImagePreviewer"

export default function PhotoList() {
    const theme = useContext(ThemeContext).theme
    const [images, setImages] = useState<string[]>([])

    useEffect(() => {
        const getImages = async () => {
            const imagesDir = await FileSystem.getInfoAsync(Constants.IMAGE_FOLDER)

            if (!imagesDir.exists && !imagesDir.isDirectory) {
                return
            }

            const contents = await FileSystem.readDirectoryAsync(imagesDir.uri)

            if (!contents) {
                return
            }

            const imgs = contents.map((name) => imagesDir.uri + '/' + name)
            setImages(imgs)
        }

        getImages()
    }, [images])

    return (
        <View style={[styles.container, { backgroundColor: theme.base }]}>
            {images.length <= 0 && <Text>List</Text>}
            <View style={styles.imageContainer}>
                {
                    images.length > 0 &&
                    <FlatList
                        data={images}
                        bounces={true}
                        renderItem={({ item, index }) => <ImagePreviewer key={index} source={{ uri: item }} label={item.split('/').pop()} />}
                        numColumns={2}
                    />
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
});
