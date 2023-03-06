import './upload-image-input.component.scss'
import FormGroup from "../form-group/form-group.component"
import { FaUpload } from 'react-icons/fa'

const UploadImageInput = ({ image, imageError, handleChange}) => (
    <FormGroup error={imageError}>
        <label htmlFor="image" className='upload-image-label'>
            <FaUpload/> { image ? image.name : 'Upload Image' }
        </label>
        { image && <img src={image.url} className='upload-img'/> }
        <input 
            id="image" 
            data-testid="image-input"
            type="file" 
            name="image"
            onChange={handleChange} 
            style={{ display: 'none' }}    
        />
    </FormGroup>
)


export default UploadImageInput