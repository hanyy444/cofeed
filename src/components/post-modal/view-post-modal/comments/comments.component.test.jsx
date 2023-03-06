import { render, screen } from '@testing-library/react';

import Comments from "./comments.component";

describe('Test comments component', () => {
    it('renders without crashing', () => {
        expect.assertions(2);
        render(<Comments />)
        const comments = screen.getByTestId("comments")
        expect(comments).toBeInTheDocument()
        expect(comments).toMatchSnapshot()
    })
})