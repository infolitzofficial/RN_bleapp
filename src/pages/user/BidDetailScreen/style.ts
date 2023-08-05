import { StyleSheet } from 'react-native';

const BidDetailstyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    itemName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    currentBid: {
        fontSize: 18,
        marginBottom: 20,
    },
    input: {
        width: 200,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    PButton: {
        backgroundColor: "#0d6efd",
        paddingHorizontal: 20,
        paddingVertical: 7,
        borderRadius: 8,
        
    },
    PBColor: {
        color: "#fff",
        fontWeight: "800",
        fontSize: 20
    }
});

export default BidDetailstyles;