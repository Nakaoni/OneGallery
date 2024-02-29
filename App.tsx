import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { FlatList, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import ImageViewer from './components/Image';
import Button from './components/Button';
import { moon } from './base/colors';
import { ThemeContext } from './ThemeContext';
import { launchImageLibraryAsync } from 'expo-image-picker';

export default function App() {
    const [images, setImages] = useState<ImageSourcePropType[]>([])

    const pickImageAsync = async () => {
        let result = await launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        })

        if (!result.canceled) {
            const uri = result.assets[0].uri
            const newImages = images

            newImages.push({ uri })

            setImages(newImages)
        }
    }

    if (images.length <= 0) {
        return (
            <ThemeContext.Provider value={{ theme: moon }}>
                <View style={styles.container}>
                    <View style={styles.imagesContainer}>
                        <Text style={[styles.text, styles.image]}>You do not have any images yet !</Text>
                    </View>
                    <View style={styles.footerContainer}>
                        <Button label="Choose a picture" iconName="image-search" onPress={pickImageAsync} />
                    </View>
                    <StatusBar style="auto" />
                </View>
            </ThemeContext.Provider >
        )
    }

    return (
        <ThemeContext.Provider value={{ theme: moon }}>
            <View style={styles.container}>
                <View style={styles.imagesContainer}>
                    <FlatList
                        data={images}
                        renderItem={({ item: image }) => <ImageViewer source={image} />}
                    />
                </View>
                <View style={styles.footerContainer}>
                    <Button label="Choose a picture" iconName="image-search" onPress={pickImageAsync} />
                </View>
                <StatusBar style="auto" />
            </View>
        </ThemeContext.Provider>
    );
}

const theme = moon
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.base,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imagesContainer: {
        flex: 1,
        paddingTop: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 320,
        height: 440,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: theme.subtle,
    },
    text: {
        color: theme.text,
        verticalAlign: 'middle',
        textAlign: 'center',
    },
    footerContainer: {
        flex: 1 / 3,
        alignItems: 'center'
    },
});
