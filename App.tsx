import { StatusBar } from 'expo-status-bar';
import { ColorType, dawn, moon } from '@base/colors';
import { ThemeContext } from '@contexts/ThemeContext';
import PhotoManager from '@screens/PhotoManager';
import { StyleSheet, View } from 'react-native';
import IconButton from '@components/IconButton';
import { useState } from 'react';
import { RouterContext } from '@contexts/RouterContext';
import PhotoList from '@screens/PhotoList';

type IconThemeType = "dark-mode" | "light-mode"
export type ScreenType = "photo-list" | "photo-manager"

export default function App() {
    const [theme, setTheme] = useState<ColorType>(moon)
    const [themeIcon, setThemeIcon] = useState<IconThemeType>('dark-mode')
    const [screen, setScreen] = useState<ScreenType>('photo-manager')

    const switchTheme = () => {
        setTheme(theme.name === 'moon' ? dawn : moon)
        setThemeIcon(theme.name === 'moon' ? 'dark-mode' : 'light-mode')
    }

    return (
        <ThemeContext.Provider value={{ theme: theme }}>
            <View style={[styles.menuContainer, { backgroundColor: theme.base }]}>
                <IconButton
                    iconName={themeIcon}
                    onPress={switchTheme}
                />
            </View>
            <RouterContext.Provider value={{ route: screen, setRoute: setScreen }}>
                {screen === "photo-list" && <PhotoList />}
                {screen === "photo-manager" && <PhotoManager />}
            </RouterContext.Provider>
            <StatusBar style="auto" />
        </ThemeContext.Provider >
    )
}

const styles = StyleSheet.create({
    menuContainer: {
        width: '100%',
        paddingTop: 50,
        paddingRight: 50,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
});
