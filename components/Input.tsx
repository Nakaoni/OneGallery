import { useContext } from "react";
import { StyleSheet, Text, TextInput } from "react-native";
import { ThemeContext, ThemeContextType } from "../ThemeContext";
import { View } from "react-native";

export type InputPropsType = {
    label: string,
    value?: string,
}

export default function Input({ value, label }: InputPropsType) {
    const theme = useContext<ThemeContextType>(ThemeContext).theme

    return (
        <View style={styles.formContainer}>
            <Text style={[styles.label, { color: theme.text }]}>{label}</Text>
            <TextInput value={value} style={[styles.textInput, { borderColor: theme.foam }]} />
        </View>
    )
}

const styles = StyleSheet.create({
    formContainer: {
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 8,
        width: 160,
        paddingHorizontal: 5,
    },
    label: {
        verticalAlign: 'middle',
    }
});
