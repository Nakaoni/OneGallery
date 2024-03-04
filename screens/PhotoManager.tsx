import { StatusBar } from 'expo-status-bar';
import { useContext, useRef, useState } from 'react';
import { ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import ImageViewer from '@components/ImageViewer';
import Button from '@components/Button';
import { ThemeContext, ThemeContextType } from '@contexts/ThemeContext';
import { launchImageLibraryAsync } from 'expo-image-picker';
import IconButton from '@components/IconButton';
import Input from '@components/Input';
import { captureRef } from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';
import { RouterContext, RouterContextType } from '@contexts/RouterContext';
import { Constants } from '@global/constants';

export default function PhotoManager() {
    const theme = useContext<ThemeContextType>(ThemeContext).theme
    const router = useContext<RouterContextType>(RouterContext)
    const [image, setImage] = useState<ImageSourcePropType>(null)
    const [showOptions, setShowOptions] = useState<boolean>(false)
    const [photoName, setPhotoName] = useState<string>(null)
    const imageRef = useRef()

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

    /**
     * @todo create directory for images
     */
    const onSaveImageAsync = async () => {
        try {
            const localUri = await captureRef(imageRef, {
                height: 440,
                quality: 1,
                format: 'png',
            })

            await FileSystem.copyAsync({
                from: localUri,
                to: Constants.IMAGE_FOLDER + photoName,
            })

            router.setRoute("photo-list")
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.base }]}>
            <View style={styles.imagesContainer}>
                {image ? (
                    <View ref={imageRef} collapsable={false}>
                        <ImageViewer source={image} />
                    </View>
                ) : (
                    <Text
                        style={[
                            styles.text, styles.image,
                            { borderColor: theme.subtle, color: theme.text }
                        ]}
                    >
                        You do not choose any image yet !
                    </Text>
                )}
            </View>
            {showOptions ? (
                <View style={[styles.footerContainer, { gap: 20 }]}>
                    <View style={styles.formContainer}>
                        <Input label="Name" value={photoName} onChangeText={setPhotoName} />
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
        flex: 2 / 3,
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
