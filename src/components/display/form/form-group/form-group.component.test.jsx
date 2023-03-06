import { render, screen } from "@testing-library/react";
import FormGroup from "./form-group.component";

describe('Test form-group component', () => { 
    it('Should render without crashing', () => {
        expect.assertions(4)
        render(<FormGroup error={'invalid state property'}>
            <input type="text"/>
        </FormGroup>)
        const formGroup = screen.getByTestId('form-group')
        expect(formGroup).toBeInTheDocument()
        expect(formGroup).toMatchSnapshot()
        expect(formGroup).toContainHTML('<input type="text"/>')
        expect(formGroup).toHaveClass('error')
    })
 })