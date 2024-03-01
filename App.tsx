import { StatusBar } from 'expo-status-bar';
import { ColorType, dawn, moon } from './base/colors';
import { ThemeContext } from './ThemeContext';
import Main from './Main';
import { StyleSheet, View } from 'react-native';
import IconButton from './components/IconButton';
import { useState } from 'react';

type IconThemeType = "dark-mode" | "light-mode"

export default function App() {
    const [theme, setTheme] = useState<ColorType>(moon)
    const [themeIcon, setThemeIcon] = useState<IconThemeType>('dark-mode')

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
            <Main />
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
