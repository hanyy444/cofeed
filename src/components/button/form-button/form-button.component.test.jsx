import { render, screen } from "@testing-library/react";
import FormButton from "./form-button.component";

describe('Test form-button component', () => { 
    it('Should render without crashing', () => {
        expect.assertions(2)
        render(<FormButton/>)
        const formButton = screen.getByTestId('form-button')
        expect(formButton).toBeInTheDocument()
        expect(formButton).toMatchSnapshot()
    })
 })