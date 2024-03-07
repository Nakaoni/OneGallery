import { StatusBar } from 'expo-status-bar';
import { useContext, useEffect, useRef, useState } from 'react';
import { Image, ImageSourcePropType, ImageURISource, StyleSheet, Text, View } from 'react-native';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { faker } from '@faker-js/faker'

export type EditModeType = {
    enabled: boolean
    imageSource?: ImageURISource
}

export default function PhotoManager() {
    const theme = useContext<ThemeContextType>(ThemeContext).theme
    const router = useContext<RouterContextType>(RouterContext)
    const [image, setImage] = useState<ImageSourcePropType>(null)
    const [showOptions, setShowOptions] = useState<boolean>(false)
    const [photoName, setPhotoName] = useState<string>(null)
    const [editMode, setEditMode] = useState<EditModeType>({ enabled: false })
    const [showModal, setShowModal] = useState<boolean>(false)
    const imageRef = useRef()

    useEffect(() => {
        const getImage = async () => {
            const image = await AsyncStorage.getItem('image')

            if (image !== null) {
                const imageSource = JSON.parse(image)
                setPhotoName(imageSource.uri.split('/').pop())
                setImage(imageSource)
                setEditMode({
                    enabled: true,
                    imageSource: imageSource,
                })
                setShowOptions(true)
            }
        }

        getImage()
    }, [])

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
        setPhotoName(null)
        setEditMode({ enabled: false, })
        setImage(null)
    }

    const deleteImageAsync = async (source: ImageURISource) => {
        await FileSystem.deleteAsync(source?.uri, { idempotent: true })
        await AsyncStorage.removeItem('image')
    }

    const onSaveImageAsync = async () => {
        try {
            if (editMode.enabled) {
                await deleteImageAsync(editMode.imageSource)
            }

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
                        You did not choose any image yet !
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
                    <View style={styles.optionsContainer}>
                        {editMode.enabled && (
                            <IconButton
                                iconName="delete"
                                label="Delete"
                                onPress={() => setShowModal(true)}
                            />
                        )}
                    </View>
                </View>
            ) : (
                <View style={styles.footerContainer}>
                    <Button label="Choose a picture" iconName="image-search" onPress={pickImageAsync} />
                    {image && <Button label="Use this picture" onPress={() => {
                        setShowOptions(true)
                        setPhotoName(faker.internet.domainWord())
                    }}
                    />}
                </View>
            )}
            {showModal && (
                <View style={styles.modalContainer}>
                    <View style={[styles.alertContainer, { backgroundColor: theme.overlay }]}>
                        <View>
                            <Text style={{ color: theme.text }}>Are you sure you want to delete this image ?</Text>
                        </View>
                        <View style={styles.alertButtonContainer}>
                            <Button
                                label="Cancel"
                                onPress={() => setShowModal(false)}
                                style={styles.alertButton}
                            />
                            <Button
                                label="Confirm"
                                onPress={async () => {
                                    await deleteImageAsync(image as ImageURISource)
                                    router.setRoute('photo-list')
                                }}
                                style={styles.alertButton}
                            />
                        </View>
                    </View>
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
    modalContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: '#000000AA',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    alertContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 40,
        maxWidth: '90%',
        borderRadius: 8,
    },
    alertButtonContainer: {
        flexDirection: 'row',
        paddingVertical: 10,
    },
    alertButton: {
        width: 80,
    }
});
