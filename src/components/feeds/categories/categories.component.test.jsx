import { render, screen } from "@testing-library/react";
import Categories from "./categories.component";

describe('Test categories component', () => { 
    expect.assertions(2)
    it('Should render without crashing', () => {
        render(<Categories/>)
        const categories = screen.getByTestId('categories')
        expect(categories).toBeInTheDocument()
        expect(categories).toMatchSnapshot()
    })
 })