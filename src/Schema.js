import * as Yup from 'yup'

export const Schema=Yup.object({
    firstname:Yup.string().min(3).max(20).required('Please enter First Name'),
    lastname:Yup.string().min(1).max(20).required('Please enter Last Name'),
    email:Yup.string().email().required('Please enter email Address'),
    password:Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,'Password must be strong').required('Please enter Password'),
    confirmpassword:Yup.string().oneOf([Yup.ref('password'),null],'Password and Repeat Password must be same').required('Please enter Confirm Password')
})



export const LoginSchema=Yup.object({
    email:Yup.string().required('Please enter email Address'),
    password:Yup.string().required('Please enter Password'),
})
export const PostSchema=Yup.object({
    title:Yup.string().required('Please enter Title'),
    description:Yup.string().required('Please enter description'),
})