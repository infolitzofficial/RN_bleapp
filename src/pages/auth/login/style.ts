import { StyleSheet } from 'react-native';
import { s } from '../../../config/scale';

export const EmailStyle = StyleSheet.create({
    center: { flex: 1, justifyContent: "center" },
    container: { flex: 1, justifyContent: "center", marginHorizontal: s(12) },
    text: { fontSize: s(25), fontWeight: "bold", color: "#000", marginBottom: s(5), },
    input: { marginBottom: s(20) },
});