import React, { memo } from 'react';
import { View, Text, ImageBackground } from 'react-native'
import Input from '../../../components/input';
import { RegisterStyle } from './style';
import Button from '../../../components/button';
import useRegister from './useRegister';

function Register({ navigation, route: { name } }:
    { navigation?: any, title?: string, route: { name: string } }) {
    const { formik } = useRegister(navigation);
    return (
        <View style={{ flex: 1 }}>
            <View
                style={{ flex: 1, justifyContent: 'center' }}>
                <View style={RegisterStyle.container}>
                    <Text style={[RegisterStyle.text, { "textAlign": "center" }]}>{name.charAt(0) + name.slice(1).toLowerCase()}</Text>
                    <Text style={RegisterStyle.text}>{"Email"}</Text>
                    <Input style={RegisterStyle.input} value={formik?.values?.email} onChangeText={(t: string) => formik?.setFieldValue("email", t)}
                        placeholder={`Please enter your email.`} />
                    <Text style={RegisterStyle.error}>{formik?.errors?.email ?? ""}</Text>
                    <Text style={RegisterStyle.text}>{"Name"}</Text>
                    <Input style={RegisterStyle.input} value={formik?.values?.name} onChangeText={(t: string) => formik?.setFieldValue("name", t)}
                        placeholder={`Please enter your name.`} />
                    <Text style={RegisterStyle.error}>{formik?.errors?.name ?? ""}</Text>
                    <Text style={RegisterStyle.text}>{"Password"}</Text>
                    <Input style={RegisterStyle.input} value={formik?.values?.password} onChangeText={(t: string) => formik?.setFieldValue("password", t)}
                        placeholder={`Please enter your password.`} />
                    <Text style={RegisterStyle.error}>{formik?.errors?.password ?? ""}</Text>
                    <Text style={RegisterStyle.text}>{"Confirm Password"}</Text>
                    <Input style={RegisterStyle.input} value={formik?.values?.CPassword} onChangeText={(t: string) => formik?.setFieldValue("CPassword", t)}
                        placeholder={`Please enter your Confirm Password.`} />
                    <Text style={RegisterStyle.error}>{formik?.errors?.CPassword ?? ""}</Text>
                    <View style={{ marginBottom: 15 }}></View>
                    <Button onPress={() => formik?.handleSubmit()} title='Continue' />
                </View>
            </View>
        </View>
    )
}

export default memo(Register);