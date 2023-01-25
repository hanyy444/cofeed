import { render, screen } from '@testing-library/react'
import HeadingFour from './heading-4.component'

describe('Test heading-4 component', () => { 
    it('Should render without crashing', () => {
        expect.assertions(2)
        render(<HeadingFour>test</HeadingFour>)
        const headingFour = screen.getByTestId('heading-4')
        expect(headingFour).toBeInTheDocument()
        expect(headingFour).toMatchSnapshot()
    })
})