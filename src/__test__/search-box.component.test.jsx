import { render, screen } from "@testing-library/react";
import SearchBox from "./search-box.component";

describe('Test search-box component', () => { 
    it('Should render without crashing', () => {
        expect.assertions(2)
        render(<SearchBox/>)
        const searchBox = screen.getByTestId('search-box')
        expect(searchBox).toBeInTheDocument()
        expect(searchBox).toMatchSnapshot()
    })
 })