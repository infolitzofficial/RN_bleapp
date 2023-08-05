import React, { memo } from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import Input from '../../../components/input';
import { EmailStyle } from './style';
import Button from '../../../components/button';
import useLogin from './useLogin';
import Colors from '../../../config/colors';
import ROUTE from '../../../route';

function Login({ navigation, route: { name } }:
    { navigation?: any, title?: string, route: { name: string } }) {
    const { formik } = useLogin(navigation);
    return (
        <View style={{ flex: 1 }}>
            <View
                style={{ flex: 1, justifyContent: 'center' }}>
                <View style={EmailStyle.container}>
                    <Text style={EmailStyle.text}>{name.charAt(0) + name.slice(1).toLowerCase()}</Text>
                    <Input style={EmailStyle.input} value={formik?.values?.email} onChangeText={(t: string) => formik?.setFieldValue("email", t)}
                        placeholder={`Please enter your ${name.toLowerCase()}.`} />
                    <Text style={EmailStyle.text}>{"Password"}</Text>
                    <Input style={EmailStyle.input} type='password' value={formik?.values?.password} onChangeText={(t: string) => formik?.setFieldValue("password", t)}
                        placeholder={`Please enter your password.`} />
                    <Button onPress={() => formik?.handleSubmit()} title={formik?.isSubmitting ? "Loading... " : 'Login'} />
                    <View style={{ display: "flex", flexDirection: "row", padding: 10 }}>
                        <Text>Already registered please </Text>
                        <TouchableOpacity onPress={() => navigation.navigate(ROUTE.REGISTER)}>
                            <Text style={{ color: Colors.PRIMARY }}>Sign in.</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default memo(Login);