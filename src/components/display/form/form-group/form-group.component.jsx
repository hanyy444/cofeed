import './form-group.component.scss'
import { FaExclamationCircle } from "react-icons/fa"

const FormGroup = ({ children, error }) => {
    return (
        <div 
            className={`form-group ${error ? 'error' : ''}`}
            data-testid="form-group">
            {children}
            {error && <FaExclamationCircle className='error-icon' title={error}/>}
        </div>
    )
}

export default FormGroup