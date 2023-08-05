import React from 'react';
import { TextInput } from 'react-native';
import { InputStyle } from './style';

function Input({ value, onChangeText, keyboardType, placeholder, style, type }: {
    value?: string, onChangeText?: (t: string) => void,
    keyboardType?: string | any, placeholder?: string, style?: any, type?: string
}) {
    return (
        <TextInput
            value={value}
            secureTextEntry={type == "password" ? true : false}
            onChangeText={onChangeText}
            placeholder={placeholder}
            keyboardType={keyboardType}
            style={{ ...InputStyle.input, ...style }}
        />
    )
}

export default Input