import { MaterialIcons } from "@expo/vector-icons";
import { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ThemeContext, ThemeContextType } from "@contexts/ThemeContext";

export type ButtonPropType = {
    label: string
    iconName?: keyof typeof MaterialIcons.glyphMap
    onPress: () => void,
    style?: {},
}

export default function Button({ label, iconName, style, onPress }: ButtonPropType) {
    const theme = useContext<ThemeContextType>(ThemeContext).theme

    const viewStyle = iconName ? {
        borderColor: theme.gold,
        borderRadius: 10,
        borderWidth: 1,
    } : null

    const buttonStyle = iconName ? { backgroundColor: theme.overlay } : null

    return (
        <View style={[styles.buttonContainer, viewStyle, style]}>
            <Pressable
                onPress={onPress}
                style={[styles.button, buttonStyle]}
            >
                {iconName &&
                    <MaterialIcons
                        name={iconName}
                        size={18}
                        style={[styles.buttonIcon, { color: theme.text }]}
                    />}
                <Text style={[styles.buttonLabel, { color: theme.text }]}>{label}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: 320,
        height: 64,
        marginHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
    },
    button: {
        borderRadius: 8,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    buttonIcon: {
        paddingRight: 8,
    },
    buttonLabel: {
        fontSize: 16,
    },
    icon: {},
})
