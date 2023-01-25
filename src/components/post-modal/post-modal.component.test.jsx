import {render, screen} from "@testing-library/react"
import PostModal from "./post-modal.component"

describe('Test post-modal component', () => { 
    it('Should render without crashing', () => {
        expect.assertions(2)
        render(<PostModal/>)
        const postModal = screen.getByTestId('post-modal')
        expect(postModal).toBeInTheDocument()
        expect(postModal).toMatchSnapshot()
    })
})