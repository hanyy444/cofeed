import { render, screen } from "@testing-library/react";
import UploadImageInput from "./upload-image-input.component";

describe('Test upload-image-input component', () => { 
    it('Should render without crashing', () => {
        expect.assertions(6)
        
        
        render(<UploadImageInput pictureFile={{url: '/', name: 'picture.jpeg'}} pictureError={'invalid picture file'}/>)
        const uploadImageInput = screen.getByTestId('form-group')

        expect(uploadImageInput).toBeInTheDocument()
        expect(uploadImageInput).toMatchSnapshot()

        expect(uploadImageInput).toContainElement(screen.getByTestId('image-input'))
        expect(uploadImageInput).toHaveTextContent('picture.jpeg')
        expect(uploadImageInput).toContainHTML('<img className="upload-image"')

        expect(uploadImageInput).toHaveClass('error')
    })
 })