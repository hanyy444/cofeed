import { render, screen } from "@testing-library/react";
import Form from "./form.component";

describe('Test form component', () => { 
    it('Should render without crashing', () => {
        expect.assertions(2)
        render(<Form/>)
        const form = screen.getByTestId('form')
        expect(form).toBeInTheDocument()
        expect(form).toMatchSnapshot()
    })
 })