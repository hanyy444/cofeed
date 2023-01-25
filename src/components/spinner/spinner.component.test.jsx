import { render, screen } from '@testing-library/react'
import Spinner from './spinner.component'

describe('Test Spinner component', () => { 
    it('Should render without crashing', () => {
        expect.assertions(2)
        render(<Spinner/>)
        const spinner = screen.getByTestId('spinner')
        expect(spinner).toBeInTheDocument()
        expect(spinner).toMatchSnapshot()
    })
})