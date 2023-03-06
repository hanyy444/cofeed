import { render, screen } from "@testing-library/react";
import Divider from "./divider.component";

describe('Test divider component', () => { 
    it('Should render without crashing', () => {
        expect.assertions(2)
        render(<Divider/>)
        const divider = screen.getByTestId('divider')
        expect(divider).toBeInTheDocument()
        expect(divider).toMatchSnapshot()
    })
 })