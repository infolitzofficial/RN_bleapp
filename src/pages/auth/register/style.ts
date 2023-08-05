import { StyleSheet } from 'react-native';
import { s } from '../../../config/scale';

export const RegisterStyle = StyleSheet.create({
    center: { flex: 1, justifyContent: "center" },
    container: { flex: 1, justifyContent: "center", marginHorizontal: s(12) },
    text: { fontSize: s(25), fontWeight: "bold", color: "#000", marginBottom: s(5), },
    input: {  },
    error: { fontSize: 15, color: "#ff0000", fontWeight: "bold", marginBottom: 10 },
});