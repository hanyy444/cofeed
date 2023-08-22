import * as router from 'react-router'
import { MemoryRouter } from 'react-router-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'

import Account from '../components/account/account.component'
import User from '../components/display/user/user.component'

beforeEach(()=>{
    vi  
        .spyOn(router, 'useNavigate')
        .mockImplementationOnce(()=>vi.fn())
})

// CASES:
// ARGS: open, setOpen, user
describe('Test account component', () => { 
    it('Should render displaying the user', () => {
        expect.assertions(4)
        render(
            <MemoryRouter>
                <Account 
                    open="true" 
                    setOpen={()=>vi.fn()}
                    user={{_id: 'fake-id', firstName: 'fake-name'}} />
            </MemoryRouter>
        )
        const account = screen.getByTestId('account')

        expect(account).toBeInTheDocument()
        expect(account).toMatchSnapshot()
        expect(account).toContain(User)
        expect(account).toHaveTextContent('fake-name')
    })
    it('Should render hiding the user', () => {
        expect.assertions(5)
        render(
            <MemoryRouter>
                <Account 
                    open="false" 
                    setOpen={()=>vi.fn()}
                    user={{_id: 'fake-id', firstName: 'fake-name'}} />
            </MemoryRouter>
        )
        const account = screen.getByTestId('account')

        expect(account).toBeInTheDocument()
        expect(account).toMatchSnapshot()
        expect(account).toContain(User)
        expect(account).toHaveTextContent('fake-name')
        expect(document).not.toContain(User)
    })
})