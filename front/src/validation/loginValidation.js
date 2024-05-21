import * as yup from 'yup';

const loginValidationSchema = yup.object().shape({
  identifier: yup
    .string()
    .min(3, 'identifier must be at least 3 characters')
    .required('identifier is required'),
  password: yup
    .string()
    .min(4, 'password must be at least 4 characters')
    .required('password is required'),
});

export default loginValidationSchema;
