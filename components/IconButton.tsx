import { MaterialIcons } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { ThemeContext, ThemeContextType } from "@contexts/ThemeContext";

export type IconButtonPropType = {
    iconName: keyof typeof MaterialIcons.glyphMap,
    label?: string,
    onPress: () => void,
}

export default function IconButton({ iconName, label, onPress }: IconButtonPropType) {
    const theme = useContext<ThemeContextType>(ThemeContext).theme

    return (
        <Pressable style={styles.iconButton} onPress={onPress}>
            <MaterialIcons name={iconName} size={24} color={theme.text} />
            {label && <Text style={[styles.iconButtonLabel, { color: theme.text }]}>{label}</Text>}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    iconButton: {},
    iconButtonLabel: {},
})
