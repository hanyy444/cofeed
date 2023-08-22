import './forgot-password.component.scss'
import { useCallback, useEffect } from 'react'
import useAxiosFunction from "hooks/useAxiosFunction"
import axiosInstance from "api/axios-instance"
import WithStateHandler from "utils/withStateHandler"
import Button from 'components/button'
import ErrorMessage from '../error-message'
import toast, { Toaster } from 'react-hot-toast';

const ForgotPassword = ({ email, setActive }) => {

    const { data, loading, error, axiosFetch: submitAxios } = useAxiosFunction()
    
    const forgetPassword = useCallback(async () => {
        await submitAxios({
            axiosInstance,
            method: 'post',
            url: 'users/forgotPassword',
            requestConfig: { data: { email } }
        })
    }, [email])
    const cancel = () => setActive('login')
    const reset = () => setActive('reset')

    let content;
    if (!data) {
        content = (
            <>
                <p className='forgot-password__message'>
                    Are you sure you want to send reset token to this email?
                    <span>{email}</span>
                </p>
                <ErrorMessage error={error}/>
                <div className="forgot-password__options">
                    <Button type="button" onClick={cancel}>Cancel</Button>
                    <Button type="submit" onClick={forgetPassword}>Confirm</Button>
                </div>
            </>
        )
    } else { 
        content = (
            <>
                <p className='forgot-password__message'>
                    { data?.message }
                </p>
                <ErrorMessage error={error}/>
                <Button type="button" onClick={reset}>Reset</Button>
            </>
        )   
    }

    return (
        <div className="forgot-password">
            {content}
        </div>
    )
}

export default ForgotPassword