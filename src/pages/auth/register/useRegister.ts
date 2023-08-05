import React from 'react';
import service from '../../../utils/service';
import * as Yup from 'yup';
import { useFormik, FormikHelpers } from 'formik';
import showToast from '../../../utils/showToast';
import ROUTES from '../../../route';

interface registerIF {
    email: string;
    name: string;
    password: string;
    CPassword: string;
}
const validationSchema = Yup.object().shape({
    email: Yup.string().trim().email().required("Email is required."),
    name: Yup.string().trim().required("Name is required."),
    password: Yup.string().trim().required("Password is required."),
    CPassword: Yup.string().trim().oneOf([Yup.ref("password")], "Password must match").required("Confirm Password is required."),
})
function useRegister(navigation:any) {
    const initialValues = {
        email: "",
        name: "",
        password: "",
        CPassword: "",
    }

    const onSubmit = async (values: registerIF, { setSubmitting, resetForm }: FormikHelpers<any>) => {
        try {
            const res = await service.post("/register", values);
            console.log(JSON.stringify(res));
            showToast(res?.data?.message || "Register successfully.");
            setSubmitting(false);
            resetForm();
            navigation?.navigate(ROUTES.LOGIN);
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

export default useRegister;