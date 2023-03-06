import './forgot-password.component.scss'
import useAxiosFunction from "hooks/useAxiosFunction"
import axiosInstance from "api/axios-instance"
import WithStateHandler from "utils/withStateHandler"
import FormButton from "components/button/form-button/form-button.component"

const ForgotPassword = ({ email, setActive }) => {

    const [data, loading, error, submitAxios] = useAxiosFunction()
    
    const submit = async () => {
        await submitAxios({
            axiosInstance,
            method: 'post',
            url: 'http://localhost:3000/api/v1/users/forgotPassword',
            requestConfig: {
                data: {
                    email
                }
            }
        })
    }
    const cancel = () => setActive('login')
    const reset = () => setActive('reset')

    return (
        <div className="forgot-password">
            <WithStateHandler 
                data={data} 
                loading={loading ? 'pending' : 'success'} 
                error={error}
                fallback={
                    <>
                        <p className='forgot-password__message'>
                            Are you sure you want to send reset token to this email?
                            <span>{email}</span>
                        </p>
                        <div className="forgot-password__options">
                            <FormButton type="button" onClick={cancel}>Cancel</FormButton>
                            <FormButton type="submit" onClick={submit}>Confirm</FormButton>
                        </div>
                    </>
                }
            >
                <p className='forgot-password__message'>
                    { data?.message }
                </p>
                <FormButton type="button" onClick={reset}>Reset</FormButton>
            </WithStateHandler>
        </div>
    )
}

export default ForgotPassword