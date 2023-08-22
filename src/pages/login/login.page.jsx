import './login.page.scss'

import { useState, lazy } from 'react'
import { useLocation } from 'react-router-dom'

import Logo from 'components/Logo/Logo.component'
import HeadingFour from 'components/typography/heading/heading-4/heading-4.component'

import Login from './login/login.component'

const SignUp = lazy(() => import('./sign-up/signup.component'))
const ResetPassword = lazy(() => import('./reset-password/reset-password.component'))
const ForgotPassword = lazy(() => import('./forgot-password/forgot-password.component'))

const ComponentMapper = {
    login: Login,
    signUp: SignUp,
    reset: ResetPassword,
    forgot: ForgotPassword,
}

const LoginPage = () => {
    
    const { pathname } = useLocation()
    const [active, setActive] = useState(pathname.split('/')[1])
    const [email, setEmail] = useState('')

    
    const componentProps = {
        setActive,
        email, 
        setEmail
    }

    const Component = ComponentMapper[active]

    return ( 
        <div className="login" data-testid="login">
            <div className="form-box">
                <Logo />
                <HeadingFour>Welcome</HeadingFour>
                <Component {...componentProps} />
            </div>
        </div>
    )
}

export default LoginPage;

