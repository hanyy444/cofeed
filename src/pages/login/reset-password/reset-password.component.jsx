import './reset-password.component.scss'
import { FaLock,} from 'react-icons/fa'
import Form from 'components/display/form/form.component'
import FormGroup from 'components/display/form/form-group/form-group.component'
import FormButton from 'components/button/form-button/form-button.component'
import { Formik } from 'formik'
import * as yup from 'yup'
import useAxiosFunction from 'hooks/useAxiosFunction'
import WithStateHandler from 'utils/withStateHandler'
import axiosInstance from 'api/axios-instance'
import { useEffect } from 'react'
import ErrorMessage from '../error-message'
import SuccessMessage from '../success-message'

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
                                    <FormButton type="button" onClick={()=>setActive('login')}>Cancel</FormButton>
                                    <FormButton type="submit" disabled={loading === 'pending'}>Change Password</FormButton>
                                </div>
                            </Form> : (
                                <div className='reset-password'>
                                    <SuccessMessage message={'Password has been changed successfully.'} />
                                    <FormButton type="button" onClick={()=>setActive('login')}>Please login</FormButton>
                                </div>
                            )
                        }
                    </WithStateHandler>
                )}
        </Formik>
    )
}

export default ResetPassword