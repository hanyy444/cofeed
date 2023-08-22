import './login.component.scss'
import { useCallback, useState } from 'react'

import axiosInstance from 'api/axios-instance'
import userApi from 'api/user/user-api'

import Form from 'components/display/form/form.component'
import Button from 'components/button'
import FormGroup from 'components/display/form/form-group/form-group.component'

import { FaUser, FaLock, FaFacebook, FaGoogle} from 'react-icons/fa'

import useLogin from '../useLogin'
import ErrorMessage from '../error-message'
import WithStateHandler from 'utils/withStateHandler'

import { Field, Formik } from 'formik'
import * as yup from 'yup'

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

    const { loading, error: loginError, submitAxios, controller } = useLogin()

    const [error, setError] = useState(loginError)

    const signInWithGoogle = useCallback(async ()=>{
        try {
            const user = await userApi.signInWithGoogle()
            await submitAxios({
                axiosInstance,
                method: 'post',
                url: 'users/signInWithGoogle',
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

    const loginUser = useCallback(async ({ email, password, keepMeLoggedIn }) => {         
        await submitAxios({
            axiosInstance,
            method: 'post',
            url: 'users/login',
            requestConfig: { data: { email, password, keepMeLoggedIn } }
        })
    }, [submitAxios]);

    // console.log(error)
    const forgetPassword = useCallback((email) => {
        if (!email) { 
            setError('Please provide email address.')
            return;
        } else {
            setActive('forgot');
            setEmail(email);
        }
    })

    return (
        <WithStateHandler
            data={[initialState]}
            loading={loading?'pending':''}
        >   
            <Formik 
                onSubmit={loginUser}
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
                        <Form onSubmit={handleSubmit} classes="login-form">
                            <FormGroup error={touched.email && errors.email}>
                                <FaUser/>
                                <input 
                                    type="text" 
                                    name="email" 
                                    value={values.email} 
                                    onChange={handleChange} 
                                    placeholder="Email"
                                    />
                            </FormGroup>
                            <FormGroup error={touched.password && errors.password}>
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
                                    <Field type="checkbox" name="keepMeLoggedIn" />
                                    <span>Remember Me</span>
                                </div>
                                <button 
                                    type='button' 
                                    className="forgot-password__switcher" 
                                    onClick={() => forgetPassword(values.email)}
                                >
                                    Forgot Password?
                                </button>
                            </div>
                            <ErrorMessage errorMessage={loginError?.message || error} />
                            <Button type="submit">Login</Button>
                        </Form>
                        {/* <span>OR</span>
                        <div className="social-media">
                            <FaFacebook onClick={()=>alert('Sign in with facebook')}/>
                            <FaGoogle onClick={signInWithGoogle}/>
                        </div> */}
                        <p>Don't have an account? <a onClick={() => setActive('signUp')}>Sign up</a></p>
                    </>
                )}
            </Formik>
        </WithStateHandler>
    )
}

export default Login