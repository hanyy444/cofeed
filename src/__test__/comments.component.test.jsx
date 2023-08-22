import { render, screen } from '@testing-library/react';

import Comments from "../components/post-modal/view-post-modal/comments/comments.component";

describe('Test comments component', () => {
    it('renders without crashing', () => {
        expect.assertions(2);
        render(<Comments />)
        const comments = screen.getByTestId("comments")
        expect(comments).toBeInTheDocument()
        expect(comments).toMatchSnapshot()
    })
})