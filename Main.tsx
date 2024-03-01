import { StatusBar } from 'expo-status-bar';
import { useContext, useState } from 'react';
import { ImageSourcePropType, StyleSheet, Text, TextInput, View } from 'react-native';
import ImageViewer from './components/ImageViewer';
import Button from './components/Button';
import { ThemeContext, ThemeContextType } from './ThemeContext';
import { launchImageLibraryAsync } from 'expo-image-picker';
import IconButton from './components/IconButton';
import Input from './components/Input';

export default function Main() {
    const theme = useContext<ThemeContextType>(ThemeContext).theme
    const [image, setImage] = useState<ImageSourcePropType>(null)
    const [showOptions, setShowOptions] = useState<boolean>(false)
    const [photoName, setPhotoName] = useState<string>(null)

    const pickImageAsync = async () => {
        let result = await launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        })

        if (!result.canceled) {
            const imageUri = result.assets[0].uri
            setImage({ uri: imageUri })
        }
    }

    const onReset = () => {
        setShowOptions(false)
    }

    const onSaveImageAsync = () => {
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.base }]}>
            <View style={styles.imagesContainer}>
                {image ? (
                    <ImageViewer source={image} />
                ) : (
                    <Text style={[styles.text, styles.image, { borderColor: theme.subtle, color: theme.text }]}>You do not have any images yet !</Text>
                )}
            </View>
            {showOptions ? (
                <View style={[styles.footerContainer, { gap: 20 }]}>
                    <View style={styles.formContainer}>
                        <Input label="Name" value={photoName} />
                    </View>
                    <View style={styles.optionsContainer}>
                        <IconButton
                            iconName="refresh"
                            label="reset"
                            onPress={onReset}
                        />
                        <IconButton
                            iconName="save-alt"
                            label="Save"
                            onPress={onSaveImageAsync}
                        />
                    </View>
                </View>
            ) : (
                <View style={styles.footerContainer}>
                    <Button label="Choose a picture" iconName="image-search" onPress={pickImageAsync} />
                    {image && <Button label="Use this picture" onPress={() => setShowOptions(true)} />}
                </View>
            )}
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imagesContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 320,
        height: 440,
        borderWidth: 1,
        borderRadius: 10,
    },
    text: {
        verticalAlign: 'middle',
        textAlign: 'center',
    },
    footerContainer: {
        flex: 1 / 3,
        alignItems: 'center',
    },
    optionsContainer: {
        flex: 1,
        flexDirection: 'row',
        gap: 24,
    },
    formContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 8,
        width: 240,
        marginBottom: 20,
        paddingHorizontal: 8,
    },
});
