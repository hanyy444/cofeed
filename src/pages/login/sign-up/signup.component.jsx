import './signup.component.scss'
import { useCallback } from 'react'

import Form from 'components/display/form/form.component'
import FormGroup from 'components/display/form/form-group/form-group.component'
import UploadImageInput from 'components/display/form/upload-image-input/upload-image-input.component'
import FormButton from 'components/button/form-button/form-button.component'

import { Formik } from 'formik'
import * as yup from 'yup'

import axiosInstance from 'api/axios-instance'
import useLogin from '../useLogin'
import WithStateHandler from 'utils/withStateHandler'
import ErrorMessage from '../error-message'
import Button from 'components/button'


const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    location: '',
    occupation: '',
    image: null
}

const validationSchema = yup.object().shape({
    firstName: yup.string().min(2).required('required'),
    lastName: yup.string().min(2).required('required'),
    email: yup.string().email('Invalid Email').required('required'),
    password: yup.string().min(8).required('required'),
    confirmPassword: yup.string()
        .min(8)
        .required('required.')
        .test('passwords-match', 'Passwords must match', 
            function (value) {       
                return this.parent.password === value     
            }
        ),
    location: yup.string().required('required'),
    occupation: yup.string().required('required'),
    // image: yup.object(),
})

const SignUp = ({ setActive }) => {
    const { loading, error, submitAxios } = useLogin()
    
    const handleImageInput = (e, setFieldValue) => {
        setFieldValue('image', {
            url: URL.createObjectURL(e.target.files[0]),
            name: e.target.files[0].name,
            file: e.target.files[0]
        })
    }

    const signUpUser = useCallback(async (values) => {
        await submitAxios({
            axiosInstance,
            method: 'post',
            url: 'users/signup',
            headers: { "Content-Type": "multipart/form-data", "Accept": "application/json" },
            requestConfig: { data: { ...values, image: values.image?.file } }
        })
    }, [submitAxios])

    return (
        <WithStateHandler
            data={[initialState]}
            loading={loading?'pending':''}
            error={null}
        >
            <Formik 
                onSubmit={signUpUser}
                initialValues={initialState}
                validationSchema={validationSchema}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                    resetForm
                }) => (
                    <>
                        <Form onSubmit={handleSubmit} classes='sign-up-form'>
                            <FormGroup error={touched.email && (errors.email)}>
                                <input 
                                    type="email" 
                                    name="email" 
                                    value={values.email} 
                                    id="email" 
                                    onChange={handleChange} 
                                    placeholder="Email"
                                />                
                            </FormGroup>
                            <FormGroup error={touched.password && (errors.password)}>
                                <input 
                                    type="password" 
                                    name="password" 
                                    value={values.password} 
                                    id="password" 
                                    onChange={handleChange} 
                                    placeholder="Password"/>
                            </FormGroup>
                            <FormGroup error={touched.confirmPassword && (errors.confirmPassword)}>
                                <input 
                                    type="password" 
                                    name="confirmPassword" 
                                    value={values.confirmPassword} 
                                    id="confirmPassword" 
                                    onChange={handleChange} 
                                    placeholder="Confirm Password"/>
                            </FormGroup>
                            <FormGroup error={touched.firstName && (errors.firstName)}>
                                <input 
                                    type="text" 
                                    name="firstName" 
                                    value={values.firstName} 
                                    id="firstName" 
                                    onChange={handleChange} 
                                    placeholder="First Name"/>
                            </FormGroup>
                            <FormGroup error={touched.lastName && (errors.lastName)}>
                                <input 
                                    type="text" 
                                    name="lastName" 
                                    value={values.lastName} 
                                    id="lastName" 
                                    onChange={handleChange} 
                                    placeholder="Last Name"/>
                            </FormGroup>
                            <FormGroup error={touched.location && (errors.location)}>
                                <input 
                                    type="text" 
                                    name="location" 
                                    value={values.location} 
                                    id="location" 
                                    onChange={handleChange} 
                                    placeholder="Location"/>
                            </FormGroup>
                            <FormGroup error={touched.occupation && (errors.occupation)}>
                                <input 
                                    type="text" 
                                    name="occupation" 
                                    value={values.occupation} 
                                    id="occupation" 
                                    onChange={handleChange} 
                                    placeholder="Occupation"/>
                            </FormGroup>
                            <UploadImageInput
                                image={values.image}
                                imageError={touched.image && (errors.image)}
                                handleChange={(e) => handleImageInput(e, setFieldValue)}
                            />
                            <Button type="submit">Sign up</Button>
                        </Form>
                        <ErrorMessage error={error}/>
                        <p>Already have an account? <a onClick={() => setActive('login')}>Login</a></p>
                    </>
                )}
            </Formik>
        </WithStateHandler>
    )
}

export default SignUp