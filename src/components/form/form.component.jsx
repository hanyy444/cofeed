import './form.component.scss'

const Form = ({ children, classes, onSubmit }) => {
    return <form 
        className={`form ${classes ?? ''}`} 
        onSubmit={onSubmit}
        data-testid="form">
        {children}
    </form>
}

export default Form