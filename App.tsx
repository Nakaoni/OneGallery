import { StatusBar } from 'expo-status-bar';
import { ThemeContext } from '@contexts/ThemeContext';
import PhotoManager from '@screens/PhotoManager';
import { StyleSheet, View } from 'react-native';
import IconButton from '@components/IconButton';
import { useState } from 'react';
import { RouterContext } from '@contexts/RouterContext';
import PhotoList from '@screens/PhotoList';
import { ThemeType, dawn, moon } from 'global/themes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

type IconThemeType = "dark-mode" | "light-mode"
export type ScreenType = "photo-list" | "photo-manager"

export default function App() {
    const [theme, setTheme] = useState<ThemeType>(moon)
    const [themeIcon, setThemeIcon] = useState<IconThemeType>('dark-mode')
    const [screen, setScreen] = useState<ScreenType>('photo-list')

    const switchTheme = () => {
        setTheme(theme.name === 'moon' ? dawn : moon)
        setThemeIcon(theme.name === 'moon' ? 'dark-mode' : 'light-mode')
    }

    return (
        <ThemeContext.Provider value={{ theme: theme }}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <View style={[styles.menuContainer, { backgroundColor: theme.base }]}>
                    <View>
                        <IconButton
                            iconName={themeIcon}
                            onPress={switchTheme}
                        />
                    </View>
                    <View style={styles.menuPhoto}>
                        <IconButton
                            iconName={"photo-library"}
                            onPress={async () => {
                                await AsyncStorage.removeItem('image')
                                setScreen('photo-list')
                            }}
                        />
                        <IconButton
                            iconName={"add-photo-alternate"}
                            onPress={async () => {
                                await AsyncStorage.removeItem('image')
                                setScreen('photo-manager')
                            }}
                        />
                    </View>
                </View>
                <RouterContext.Provider value={{ route: screen, setRoute: setScreen }}>
                    {screen === "photo-list" && <PhotoList />}
                    {screen === "photo-manager" && <PhotoManager />}
                </RouterContext.Provider>
                <StatusBar style="auto" />
            </GestureHandlerRootView>
        </ThemeContext.Provider >
    )
}

const styles = StyleSheet.create({
    menuContainer: {
        width: '100%',
        paddingTop: 50,
        paddingBottom: 25,
        paddingHorizontal: 25,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        gap: 8,
    },
    menuPhoto: {
        flexDirection: 'row',
        gap: 16,
    }
});
