import { render, screen } from '@testing-library/react';

import AddCommentForm from "./add-comment-form.component";

describe('Test add-comment-form component', () => {
    it('renders without crashing', () => {
        expect.assertions(2);
        render(<AddCommentForm />)
        const add-comment-form = screen.getByTestId("add-comment-form")
        expect(add-comment-form).toBeInTheDocument()
        expect(add-comment-form).toMatchSnapshot()
    })
})