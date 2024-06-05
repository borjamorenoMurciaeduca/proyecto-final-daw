import * as yup from 'yup';
const espRegExp = /^([+]?\d{1,2}[-\s]?|)[9|6|7][0-9]{8}$/;
const registerValidationSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, 'identifier must be at least 3 characters')
    .required('identifier is required'),
  password: yup
    .string()
    .min(4, 'password must be at least 4 characters')
    .required('password is required'),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'passwords must match')
    .required('password confirmation is required'),
  name: yup.string().min(3, 'name must be at least 3 characters'),
  surname: yup.string().min(3, 'surname must be at least 3 characters'),
  email: yup.string().email('email must be a valid email'),
  phone: yup.string().matches(espRegExp, 'Phone number is not valid'),
  birth_date: yup.date(),
});

export default registerValidationSchema;
