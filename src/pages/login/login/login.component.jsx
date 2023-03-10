import './login.component.scss'
import React from 'react'
import Form from 'components/display/form/form.component'
import FormButton from 'components/button/form-button/form-button.component'
import FormGroup from 'components/display/form/form-group/form-group.component'
import { FaUser, FaLock, FaFacebook, FaGoogle} from 'react-icons/fa'
import axiosInstance from 'api/axios-instance'
import userApi from 'api/user/user-api'
import { Field, Formik } from 'formik'
import * as yup from 'yup'
import WithStateHandler from 'utils/withStateHandler'
import useLogin from '../useLogin'

const initialState = {
    email: '',
    password: '',
    keepMeLoggedIn: false
}

const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid Email').required('required'),
    password: yup.string().min(8).required('required.')
})

const Login = ({ setActive, setEmail }) => {

    const {loading, error, submitAxios} = useLogin()

    const signInWithGoogle = React.useCallback(async ()=>{
        try {
            const user = await userApi.signInWithGoogle()
            await submitAxios({
                axiosInstance,
                method: 'post',
                url: 'http://localhost:3000/api/v1/users/signInWithGoogle',
                requestConfig: {
                    data: {
                        accessToken: user.accessToken
                    }
                }
            })
        } catch (error) {
            handleError(error)
        }
    },[])

    const submit = async ({ email, password, keepMeLoggedIn }) => {         
        await submitAxios({
            axiosInstance,
            method: 'post',
            url: 'http://localhost:3000/api/v1/users/login',
            requestConfig: {
                data: {
                    email,
                    password,
                    keepMeLoggedIn
                }
            }
        })

    }

    return (
        <WithStateHandler
            data={[initialState]}
            loading={loading?'pending':''}
        >
            <Formik 
                onSubmit={submit}
                initialValues={initialState}
                validationSchema={validationSchema}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleSubmit
                }) => (
                    <>
                        <Form onSubmit={ handleSubmit } classes="login-form">
                            <span style={{ color: 'red' }}>{error?.response?.data?.message}</span>
                            <FormGroup error={touched.email && (errors.email)}>
                                <FaUser/>
                                <input 
                                    type="text" 
                                    name="email" 
                                    value={values.email} 
                                    onChange={handleChange} 
                                    placeholder="Email"
                                    />
                            </FormGroup>
                            <FormGroup error={touched.password && (errors.password)}>
                                <FaLock/>
                                <input 
                                    type="password" 
                                    name="password" 
                                    value={values.password} 
                                    onChange={handleChange} 
                                    placeholder="Password"
                                />
                            </FormGroup>
                            <div className="extras">
                                <div className="keep-logged-in">
                                    <Field 
                                        type="checkbox" 
                                        name="keepMeLoggedIn" 
                                    />
                                    <span>Remember Me</span>
                                </div>
                                <button 
                                    type='button' 
                                    className="forgot-password__switcher" 
                                    onClick={() => {
                                        setActive('forgot')
                                        setEmail(values.email)
                                    }}
                                >
                                    Forgot Password?
                                </button>
                            </div>
                            <FormButton type="submit">Login</FormButton>
                        </Form>
                        {/* <span>OR</span>
                        <div className="social-media">
                            <FaFacebook onClick={()=>alert('Sign in with facebook')}/>
                            <FaGoogle onClick={signInWithGoogle}/>
                        </div> */}
                        <p>Don't have an account? <a onClick={()=>setActive('signUp')}>Sign up</a></p>
                    </>
                )}
            </Formik>
        </WithStateHandler>
    )
}

export default Login