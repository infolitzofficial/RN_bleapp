import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { ButtonStyle } from './style';

function Button({ title, onPress }:
    { title?: string, onPress?: () => void }) {
    return (
        <TouchableOpacity onPress={onPress} style={ButtonStyle.button}>
            <Text style={ButtonStyle.title}>{title}</Text>
        </TouchableOpacity>
    )
}

export default Button;