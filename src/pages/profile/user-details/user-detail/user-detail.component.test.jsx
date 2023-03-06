import {render, screen} from '@testing-library/react'
import UserDetail from './user-detail.component'

describe('Test user-detail component', () => {
    it('Should render without crashing', () => {
        expect.assertions(2)
        render(<UserDetail icon={'test'} text={'test'} />)
        const userDetails = screen.getByTestId('user-detail')
        expect(userDetails).toBeInTheDocument()
        expect(userDetails).toMatchSnapshot()
    })
})