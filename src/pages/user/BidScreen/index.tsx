import React, { memo } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import BidScreenStyle from './style';
import useBidScreen from './useBidScreen';

const BidScreen = ({ navigation }: any) => {
    const { bidList } = useBidScreen();
    const renderItem = ({ item }: any) => {
        return (
            <TouchableOpacity
                style={BidScreenStyle.itemContainer}
                onPress={() => navigation.navigate('Bid Detail', { item })}
            >
                <Image source={{ uri: item?.uri }} style={BidScreenStyle.itemImage} resizeMode='cover' />
                <Text style={BidScreenStyle.itemName}>{item.name}</Text>
                <Text style={BidScreenStyle.currentBid}>Current Bid: ${item.currentBid}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={BidScreenStyle.container}>
            <FlatList
                data={bidList}
                renderItem={renderItem}
                keyExtractor={(item:any) => item?.id}
            />
        </View>
    );
};


export default memo(BidScreen);