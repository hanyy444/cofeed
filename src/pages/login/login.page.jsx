import './login.page.scss'

import { useEffect, useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import axiosInstance from '../../api/axios-instance'
import useAxiosFunction from '../../hooks/useAxiosFunction'

import { setLogin } from '../../redux/slices/auth.slice'

import Logo from '../../components/Logo/Logo.component'
import Login from './login.component'
import SignUp from './signup.component'
import HeadingFour from '../../components/heading/heading-4.component'

import validator from 'validator'
import Spinner from '../../components/spinner/spinner.component'
import { useErrorHandler } from 'react-error-boundary'


const signUpInitialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    location: '',
    occupation: '',
    pictureFile: null
}

const loginInitialState = {
    email: '',
    password: '',
    keepMeLoggedIn: false
}

const LoginPage = (props) => {
    
    const dispatch = useDispatch()
    const handleError = useErrorHandler()
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const [data, loading, error, submitAxios] = useAxiosFunction()

    const [isLogin, setIsLogin] = useState(pathname === '/login' ? true : false)
    const [loginState, setLoginState] = useState(loginInitialState)
    const [signUpState, setSignUpState] = useState(signUpInitialState)
    const [errors, setErrors] = useState({})

    const handleChange = useCallback((event) => {
        const { name, value } = event.target
        
        const setState = (prevState) => {
            return { ...prevState, [name]: value }
        }

        isLogin 
            ? setLoginState(setState) 
            : setSignUpState(setState)

        setErrors({})

    }, [isLogin])

    const handleCheckChange = useCallback(() => {
        setLoginState(prevState => {
            return {
                ...prevState,
                keepMeLoggedIn: !prevState.keepMeLoggedIn
            }
        })
    }, [])

    const handleFileChange = useCallback((event) => {
        const file = event.target.files[0]
        setSignUpState(prevState => {
            return {
                ...prevState,
                pictureFile: {
                    url: URL.createObjectURL(file),
                    name: file.name,
                    file
                }
            }
        })      
        setErrors({})
    }, [])

    const validateLogin = useCallback(()=>{
        let errors = {}

        const { email, password } = loginState
        
        if (!validator.isEmail(email)) errors.email = 'Invalid email'

        if (!(password.length > 8)) errors.password = 'Password is too short.'

        return errors;
    }, [loginState])

    const validateSignUp = useCallback(() => {

        let errors = {}

        const { email, password, firstName, lastName, location, occupation, pictureFile } = signUpState

        if (!validator.isEmail(email)) errors.email = 'Invalid email'
        if (password.length < 8) errors.password = 'Password is too short.'
        if (firstName.length < 3) errors.firstName = 'First Name is too short'
        if (lastName.length < 3) errors.lastName = 'Last Name is too short'
        if (location.length < 3) errors.location = 'Location is too short'
        if (occupation.length < 3) errors.occupation = 'Occupation is too short'
        if (!pictureFile) errors.pictureFile = 'Picture is required'

        return errors

    }, [signUpState])

    const submitLogin = async event => { 
        event.preventDefault()

        const { email, password, keepMeLoggedIn } = loginState

        // VALIDATE
        const errors = validateLogin()
        const valid = Object.keys(errors).length === 0

        if (!valid) {
            setErrors(errors)
            return;
        }

        // SUBMIT
        setErrors({})
        submitAxios({
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

    const submitSignUp = async event => {
        event.preventDefault()

        const { email, 
            password, 
            firstName, 
            lastName,
            location,
            occupation,
            pictureFile } = signUpState

        // VALIDATE
        const errors = validateSignUp()
        const valid = Object.keys(errors).length === 0

        if (!valid) {
            setErrors(errors)
            return;
        }

        // SUBMIT
        setErrors({})
        submitAxios({
            axiosInstance,
            method: 'post',
            url: 'http://localhost:3000/api/v1/users/signup',
            requestConfig: {
                data: {
                    email,
                    password,
                    firstName,
                    lastName,
                    location,
                    occupation,
                    picturePath: pictureFile.name
                }
            }
        })
    }
    
    const handleForgotPassword = () => {
        console.log('Forgot Password!')

        // submitAxios({
        //     axiosInstance,
        //     method: 'post',
        //     url: 'http://localhost:3000/api/v1/users/forgotPassword',
        //     requestConfig: {
        //         data: {
        //             email
        //         }
        //     }
        // })
    }

    const handleResetPassword = (url) => {
        console.log('Reset Password')

        const data = { password, confirmPassword }

        // submitAxios({
        //     axiosInstance,
        //     method: 'patch',
        //     url,
        //     requestConfig: {
        //         data 
        //     }
        // })
    }

    useEffect(()=>{
        if (error) handleError(error)
        if (data?.status === 'success'){
            const { user, token } = data 
            
            //// SET GLOBAL AUTH
            dispatch(setLogin({ user, token }))
            
            //// NAVIGATE HOME
            navigate('/home')
        }
    }, [data])


    if (loading) return <Spinner/>

    return ( 
        <div className="login" id="login" data-testid="login">
            <div className="form-box">
                <Logo />
                <HeadingFour>Welcome</HeadingFour>
                {isLogin ? ( 
                    <Login 
                        loginState={loginState}
                        handleChange={handleChange}
                        handleCheckChange={handleCheckChange}
                        handleForgotPassword={handleForgotPassword}
                        errors={errors}
                        setIsLogin={setIsLogin}
                        submitLogin={submitLogin}
                    />
                ) : (
                    <SignUp 
                        signUpState={signUpState}
                        handleChange={handleChange}
                        handleFileChange={handleFileChange}
                        errors={errors}
                        setIsLogin={setIsLogin}
                        submitSignUp={submitSignUp}
                    />
                )}
            </div>
        </div>
    )
}

export default LoginPage;

