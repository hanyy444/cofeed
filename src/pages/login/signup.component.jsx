import Form from '../../components/form/form.component'
import FormGroup from '../../components/form/form-group/form-group.component'
import UploadImageInput from '../../components/form/upload-image-input/upload-image-input.component'
import FormButton from '../../components/button/form-button/form-button.component'



const SignUp = ({
    signUpState,
    handleChange,
    handleFileChange,
    errors,
    setIsLogin,
    submitSignUp,
}) => {
    const { email, password, firstName, lastName, location, occupation, pictureFile } = signUpState

    const hasError = Object.keys(errors).length !== 0

    return (
        <>
            <Form onSubmit={ submitSignUp }>
                <FormGroup error={errors.email}>
                    <input 
                        type="email" 
                        name="email" 
                        value={email} 
                        id="email" 
                        onChange={handleChange} 
                        placeholder="Email"/>                
                </FormGroup>
                <FormGroup error={errors.password}>
                    <input 
                        type="password" 
                        name="password" 
                        value={password} 
                        id="password" 
                        onChange={handleChange} 
                        placeholder="Password"/>
                </FormGroup>
                <FormGroup error={errors.firstName}>
                    <input 
                        type="text" 
                        name="firstName" 
                        value={firstName} 
                        id="firstName" 
                        onChange={handleChange} 
                        placeholder="First Name"/>
                </FormGroup>
                <FormGroup error={errors.lastName}>
                    <input 
                        type="text" 
                        name="lastName" 
                        value={lastName} 
                        id="lastName" 
                        onChange={handleChange} 
                        placeholder="Last Name"/>
                </FormGroup>
                <FormGroup error={errors.location}>
                    <input 
                        type="text" 
                        name="location" 
                        value={location} 
                        id="location" 
                        onChange={handleChange} 
                        placeholder="Location"/>
                </FormGroup>
                <FormGroup error={errors.occupation}>
                    <input 
                        type="text" 
                        name="occupation" 
                        value={occupation} 
                        id="occupation" 
                        onChange={handleChange} 
                        placeholder="Occupation"/>
                </FormGroup>
                <UploadImageInput
                    pictureFile={pictureFile}
                    pictureError={errors.pictureFile}
                    handleChange={handleFileChange}
                />
                <FormButton type="submit" disabled={hasError}>Sign up</FormButton>
            </Form>
            <p>Already have an account? <a onClick={()=>setIsLogin(true)}>Login</a></p>
        </>
    )
}

export default SignUp