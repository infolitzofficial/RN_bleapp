import { StyleSheet } from 'react-native';
import { s } from '../../config/scale';

export const ButtonStyle = StyleSheet.create({
    button: { backgroundColor: "#4994ec", padding: s(10), borderRadius: s(8) },
    title: { textAlign: "center", color: "#fff", fontWeight: "bold", fontSize: s(20) },
});