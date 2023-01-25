import './upload-image-input.component.scss'
import FormGroup from "../form-group/form-group.component"

const UploadImageInput = ({ pictureFile, pictureError, handleChange}) => {

    return (
        <FormGroup error={pictureError}>
            <label htmlFor="pictureFile" className='upload-image-label'>
                { pictureFile ? pictureFile.name : 'Upload Image' }
            </label>
            { pictureFile && <img src={pictureFile.url} className='upload-img'/> }
            <input 
                data-testid="image-input"
                type="file" 
                name="pictureFile"
                id="pictureFile" 
                onChange={handleChange} 
                style={{ display: 'none' }}    
                />
        </FormGroup>
    )
}

export default UploadImageInput