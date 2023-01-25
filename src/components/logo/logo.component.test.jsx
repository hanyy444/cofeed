import { render, screen } from "@testing-library/react";
import Logo from "./Logo.component";

describe('Test Logo component', () => { 
    it('Should render without crashing', () => {
        expect.assertions(2)
        render(<Logo/>)
        const logo = screen.getByTestId('logo')
        expect(logo).toBeInTheDocument()
        expect(logo).toMatchSnapshot()
    })
 })