import * as Yup from 'yup';

export const signUpSchema = Yup.object().shape({
  userName: Yup.string().min(2).required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
  mobileNumber: Yup.string().required('Mobile number is required'),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});
