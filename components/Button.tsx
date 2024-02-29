import { MaterialIcons } from "@expo/vector-icons";
import { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ThemeContext, ThemeContextType } from "../ThemeContext";
import { ColorType } from "../base/colors";

export type ButtonPropType = {
    label: string
    iconName?: keyof typeof MaterialIcons.glyphMap
    onPress: () => void
}

export default function Button({ label, iconName, onPress }: ButtonPropType) {
    const theme = useContext<ThemeContextType>(ThemeContext).theme

    return (
        <View style={[styles.buttonContainer, {
            borderColor: theme.gold,
            borderRadius: 10,
            borderWidth: 1,
        }]}>
            <Pressable
                onPress={onPress}
                style={[styles.button, { backgroundColor: theme.overlay }]}
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
