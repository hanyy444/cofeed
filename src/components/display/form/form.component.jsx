import './form.component.scss'

const Form = ({ children, classes, onSubmit }) => (
    <form 
        className={`form ${classes ?? ''}`} 
        encType="multipart/form-data"
        onSubmit={onSubmit}
        data-testid="form">
        {children}
    </form>
)

export default Form