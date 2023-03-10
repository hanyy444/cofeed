import './reset-password.component.scss'
import { FaLock,} from 'react-icons/fa'
import Form from 'components/display/form/form.component'
import FormGroup from 'components/display/form/form-group/form-group.component'
import FormButton from 'components/button/form-button/form-button.component'
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
    confirmPassword: yup.string().min(8).required('required.')
})

const ResetPassword = ({ setActive }) => {

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
                        <div className="controls">
                            <FormButton type="button" onClick={()=>setActive('login')}>Cancel</FormButton>
                            <FormButton type="submit">Change Password</FormButton>
                        </div>
                    </Form>
                )}
        </Formik>
    )
}

export default ResetPassword