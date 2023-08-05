import { StyleSheet } from "react-native";

const BidScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
      },
      itemContainer: {
        backgroundColor: '#f0f0f0',
        marginBottom: 10,
        borderRadius: 8,
        borderWidth: 1,
      },
      itemImage: { width: "100%", height: 200, borderTopLeftRadius: 8, borderTopRightRadius: 8},
      itemName: {
        fontSize: 18,
        paddingLeft: 16,
        fontWeight: 'bold',
      },
      currentBid: {
        fontSize: 16,
        paddingLeft: 16,
        marginTop: 5,
      },
});

export default BidScreenStyle;