import React from 'react'

import { FaUser, FaLock, FaFacebook, FaGoogle} from 'react-icons/fa'
import Form from '../../components/form/form.component'
import FormButton from '../../components/button/form-button/form-button.component'
import FormGroup from '../../components/form/form-group/form-group.component'

const Login = ({ 
    loginState,
    handleChange,
    handleCheckChange,
    handleForgotPassword,
    errors,
    setIsLogin,
    submitLogin
}) => {

    const { email, password, keepMeLoggedIn } = loginState

    const hasError = Object.keys(errors).length !== 0

    return (
        <>
            <Form onSubmit={ submitLogin } classes="login-form">
                <FormGroup error={errors.email}>
                    <FaUser/>
                    <input 
                        type="text" 
                        name="email" 
                        value={email} 
                        id="email" 
                        onChange={handleChange} 
                        placeholder="Email"
                        />
                </FormGroup>
                <FormGroup error={errors.password}>
                    <FaLock/>
                    <input 
                        type="password" 
                        name="password" 
                        value={password} 
                        id="password" 
                        onChange={handleChange} 
                        placeholder="Password"
                    />
                </FormGroup>
                <div className="extras">
                    <div className="keep-logged-in" onClick={handleCheckChange}>
                        <input 
                            type="checkbox" 
                            name="keepMeLoggedIn" 
                            checked={keepMeLoggedIn} 
                            onChange={handleCheckChange}/>
                        <span>Remember Me</span>
                    </div>
                    <span className="forgot-password" onClick={handleForgotPassword}>Forgot Password?</span>
                </div>
                <FormButton type="submit" disabled={hasError}>Login</FormButton>
            </Form>
            <span>OR</span>
            <div className="social-media">
                <FaFacebook onClick={()=>alert('Sign in with FACEBOOK')}/>
                <FaGoogle onClick={()=>alert('Sign in with GOOGLE')}/>
            </div>
            <p>Don't have an account? <a onClick={()=>setIsLogin(false)}>Sign up</a></p>
        </>
    )
}

export default Login