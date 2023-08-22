import './reset-password.component.scss'
import axiosInstance from 'api/axios-instance'
import Form from 'components/display/form/form.component'
import FormGroup from 'components/display/form/form-group/form-group.component'
import useAxiosFunction from 'hooks/useAxiosFunction'
import WithStateHandler from 'utils/withStateHandler'
import ErrorMessage from '../error-message'
import SuccessMessage from '../success-message'
import Button from 'components/button'
import { FaLock} from 'react-icons/fa'
import { Formik } from 'formik'
import * as yup from 'yup'

const initialState = {
    resetToken: '',
    password: '',
    confirmPassword:''
}

const validationSchema = yup.object().shape({
    resetToken: yup.string().required('required.'),
    password: yup.string().min(8).required('required.'),
    confirmPassword: yup
    .string()
    .min(8)
    .required('required.')
    .test('passwords-match', 'Passwords must match', 
        function (value) {       
            return this.parent.password === value     
        }
    ) 
})

const ResetPassword = ({ setActive }) => {

    const [data, loading, error, submitAxios] = useAxiosFunction() 
    

    const onSubmit = async ({ resetToken, password, confirmPassword }) => {
        await submitAxios({
            axiosInstance,
            method: 'patch',
            url: `users/resetPassword/${resetToken}`,
            requestConfig: {
                data: {
                    password, 
                    confirmPassword
                }
            }
        })
    }
    
    
    return ( 
        <Formik 
                onSubmit={onSubmit}
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
                    <WithStateHandler 
                        data={initialState}
                        loading={loading?'pending':'success'}
                    > 
                        {data?.status !== 'success' ?
                            <Form onSubmit={handleSubmit} classes="reset-form">
                                <FormGroup error={ touched.resetToken && (errors.resetToken)}>
                                    <FaLock/>
                                    <input 
                                        type="text" 
                                        name="resetToken" 
                                        value={values.resetToken} 
                                        onChange={handleChange} 
                                        placeholder="Reset Token"
                                    />
                                </FormGroup>
                                <FormGroup error={ touched.password && (errors.password)}>
                                    <FaLock/>
                                    <input 
                                        type="password" 
                                        name="password" 
                                        value={values.password} 
                                        onChange={handleChange} 
                                        placeholder="New Password"
                                    />
                                </FormGroup>
                                <FormGroup error={touched.confirmPassword && (errors.confirmPassword)}>
                                    <FaLock/>
                                    <input 
                                        type="password" 
                                        name="confirmPassword" 
                                        value={values.confirmPassword} 
                                        onChange={handleChange} 
                                        placeholder="Confirm New Password"
                                    />
                                </FormGroup>
                                <ErrorMessage error={error}/>
                                <div className="controls">
                                    <Button type="button" onClick={() => setActive('login')}>Cancel</Button>
                                    <Button type="submit" disabled={loading === 'pending'}>Change Password</Button>
                                </div>
                            </Form> : (
                                <div className='reset-password'>
                                    <SuccessMessage message={'Password has been changed successfully.'} />
                                    <Button type="button" onClick={() => setActive('login')}>Please login</Button>
                                </div>
                            )
                        }
                    </WithStateHandler>
                )}
        </Formik>
    )
}

export default ResetPassword