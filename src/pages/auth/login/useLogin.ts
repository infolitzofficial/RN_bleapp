import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { useFormik, FormikHelpers } from 'formik';
import showToast from '../../../utils/showToast';
import EncryptedStorage from 'react-native-encrypted-storage';
import { useAppDispatch } from '../../../store/hooks';
import { login } from '../../../store/slices/user';
import ROUTE from '../../../route';

interface registerIF {
    email: string;
    password: string;
}
const validationSchema = Yup.object().shape({
    email: Yup.string().trim().email().required("Email is required."),
    password: Yup.string().trim().required("Password is required."),
})
function useLogin(navigation: any) {
    const validate = async () => {
        const user = await EncryptedStorage.getItem('user');
        if (user) navigation?.navigate(ROUTE.BID)
    }

    useEffect(() => {
        validate();
    }, []);

    const initialValues = {
        email: "",
        password: "",
    }
    const dispatch = useAppDispatch();

    const onSubmit = async (values: registerIF, { setSubmitting, resetForm }: FormikHelpers<any>) => {
        try {
            dispatch(login(values));
            resetForm();
        } catch (error: any) {
            showToast(error?.message || error, "long")
            console.log(JSON.stringify(error));
        }
    }

    const formik = useFormik({
        validationSchema,
        initialValues,
        onSubmit,
    })

    return {
        formik,
    }
}

export default useLogin;