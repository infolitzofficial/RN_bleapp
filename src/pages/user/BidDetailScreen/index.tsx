import React, { memo, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import BidDetailstyles from './style';

const BidDetail = ({ route: { params: { item } } }: any) => {
    // console.log(props);
    const [currentBid, setCurrentBid] = useState(100); // Replace with your initial bid value
    const [userBid, setUserBid] = useState('');

    const handleBidChange = (text: string) => {
        setUserBid(text);
    };

    const handlePlaceBid = () => {
        const newBid = parseFloat(userBid);
        if (newBid > currentBid && !isNaN(newBid)) {
            setCurrentBid(newBid);
            // Call API to update the server with the new bid if needed
            setUserBid('');
        } else {
            // Show an error message or perform other validation as needed
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <View>
                <Image source={{ uri: item?.uri }} style={{ height: 200, width: "100%" }} />
            </View>
            <View style={{paddingHorizontal: 16}}>
                <Text style={BidDetailstyles.itemName}>{`Item Name: ${item?.name}`}</Text>
                <Text style={BidDetailstyles.currentBid}>{`Current Bid: ${item?.currentBid}`}</Text>
            </View>
            <View style={BidDetailstyles.container}>
                <TextInput
                    style={BidDetailstyles.input}
                    placeholder="Your Bid"
                    onChangeText={handleBidChange}
                    value={userBid}
                    keyboardType="numeric"
                />
                <TouchableOpacity style={BidDetailstyles.PButton} onPress={handlePlaceBid}>
                    <Text style={BidDetailstyles.PBColor}>{"Place Bid"}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default memo(BidDetail);
