import { ThemeContext } from "@contexts/ThemeContext"
import { useContext, useEffect, useState } from "react"
import { FlatList, StyleSheet, View } from "react-native"
import * as FileSystem from "expo-file-system"
import { Constants } from "@global/constants"
import ImagePreviewer from "@components/ImagePreviewer"
import { RouterContext } from "@contexts/RouterContext"
import IconButton from "@components/IconButton"

export default function PhotoList() {
    const theme = useContext(ThemeContext).theme
    const { setRoute } = useContext(RouterContext)

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
            <View style={styles.imageContainer}>
                {images.length <= 0 && <IconButton iconName="add-a-photo" label="Add a photo" onPress={() => setRoute('photo-manager')} />}
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
