// import * as router from 'react-router'
import { render, screen, fireEvent } from '@testing-library/react'
import User from '../components/display/user/user.component'
import { MemoryRouter, useNavigate }from 'react-router-dom'
import { vi } from 'vitest'

const navigate = vi.fn();
vi.mock('react-router-dom', async () => ({
    ...(await vi.importActual('react-router-dom')),
    useNavigate: () => navigate
}))

describe('Test user component with useNavigate hook', () => { 

    afterEach(() => {
        vi.clearAllMocks()
    })

    it('Should renders without crashing and navigate to user profile given an userId', async () => {
        expect.assertions(4)

        const userId = 'fake-id'

        // ARRANGE
        render(
            <MemoryRouter initialEntries={['/']}>
                <User userId={userId}/>
            </MemoryRouter>
        )
        const user = screen.getByTestId('user')

        // ACT

        // await userEvent.click(user)
        fireEvent.click(user)

        // EXPECT
        expect(user).toBeInTheDocument()
        expect(user).toMatchSnapshot()
        expect(navigate).toHaveBeenCalledTimes(1)
        expect(navigate).toHaveBeenCalledWith(`/profile/${userId}`)
        
    })
 })