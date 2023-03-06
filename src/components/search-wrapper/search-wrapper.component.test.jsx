import { MemoryRouter } from "react-router-dom";
import * as router from 'react-router'
import { render, screen } from "@testing-library/react";
import SearchWrapper from "./search-wrapper.component";
import User from "../display/user/user.component";
import Spinner from "../display/spinner/spinner.component";

// beforeEach(()=>{
//     vi
//         .spyOn(router, 'useNavigate')
//         .mockImplementationOnce(()=>vi.fn())
// })

describe('Test search-wrapper component', () => {     

    afterEach(() => {
        vi.clearAllMocks()
    })

    it('Should render without crashing', () => {
        expect.assertions(2)
        render(
            <MemoryRouter>
                <SearchWrapper />
            </MemoryRouter>
        )
        const searchWrapper = screen.getByTestId('search-wrapper')
        expect(searchWrapper).toBeInTheDocument()
        expect(searchWrapper).toMatchSnapshot()
    })

    it('Should render 1 result', () => {
        expect.assertions(2)
        render(
            <MemoryRouter>
                <SearchWrapper data={[{ _id: 'fake-id', firstName: 'test' }]} loading="success"/>
            </MemoryRouter>
        )
        const searchWrapper = screen.getByTestId('search-wrapper')
        expect(searchWrapper).toContainElement(screen.getByTestId('user'))
        expect(searchWrapper).toHaveTextContent('test')
    })

    it('Should render 0 results', () => {
        expect.assertions(1)
        render(
            <MemoryRouter>
                <SearchWrapper data={[]} loading="success" count={0}/>
            </MemoryRouter>
        )
        const searchWrapper = screen.getByTestId('search-wrapper')
        expect(searchWrapper).toHaveTextContent('0 results found')
    })

    it('Should return spinner on loading', () => {
        expect.assertions(1)
        render(
            <MemoryRouter>
                <SearchWrapper count={0} loading='pending'/>
            </MemoryRouter>
        )
        const searchWrapper = screen.getByTestId('search-wrapper')
        expect(searchWrapper).toContainElement(screen.getByTestId('spinner'))
    })
 })