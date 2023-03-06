import './login.page.scss'

import { useState } from 'react'
import { useLocation} from 'react-router-dom'

import Logo from 'components/Logo/Logo.component'
import HeadingFour from 'components/typography/heading/heading-4.component'
import Login from './login/login.component'
import SignUp from './sign-up/signup.component'
import ResetPassword from './reset-password/reset-password.component'
import ForgotPassword from './forgot-password/forgot-password.component'

const componentMapper = (active, props) => {
    if (active === 'login') return <Login {...props}/>
    if (active === 'signUp') return <SignUp {...props}/>
    if (active === 'reset') return <ResetPassword {...props}/>
    if (active === 'forgot') return <ForgotPassword {...props}/>
    return <></>
}

const LoginPage = () => {
    
    const { pathname } = useLocation()
    const [active, setActive] = useState(pathname.split('/')[1])
    const [email, setEmail] = useState('')

    return ( 
        <div className="login" data-testid="login">
            <div className="form-box">
                <Logo />
                <HeadingFour>Welcome</HeadingFour>
                {componentMapper(active, {
                    setActive,
                    email, 
                    setEmail
                })}
            </div>
        </div>
    )
}

export default LoginPage;

