import { vi } from 'vitest'
import { useSelector, Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store'
import { render, screen } from '@testing-library/react'
import Stories from '../components/stories/stories.component'

describe('Test stories component', () => { 

    const mockStore = configureMockStore()
    const Redux = { useSelector }
    const mockedState = {
        auth: {
            user: {
                _id: 'fake-id',
                firstName: 'fake-0'
            }
        }
    }
    const mockedStore = mockStore(mockedState)


    const useSelectorMock = vi.spyOn(Redux, 'useSelector')
                .mockImplementationOnce(() => (mockedState))

    it('Should render without crashing', () => {
        expect.assertions(5)
        expect(useSelectorMock.getMockName()).toBe('useSelector')

        // ARRANGE
        render (
            <Provider store={mockedStore}>
                <Stories users={[{_id:'fake-id1', firstName: 'fake-1'}]}/>
            </Provider>
        )
        const stories = screen.getByTestId('stories')
        
        useSelectorMock.mockReturnValue(mockedState)

        // EXPECT
        expect(stories).toBeInTheDocument()
        expect(stories).toMatchSnapshot()
        expect(stories).toHaveTextContent('You')
        expect(stories).toHaveTextContent('fake-1')
    })
})