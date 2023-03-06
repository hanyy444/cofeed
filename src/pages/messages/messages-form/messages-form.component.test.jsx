import { render, screen } from '@testing-library/react';

import MessagesForm from "./messages-form.component";

describe('Test messages-form component', () => {
    it('renders without crashing', () => {
        expect.assertions(2);
        render(<MessagesForm />)
        const messages-form = screen.getByTestId("messages-form")
        expect(messages-form).toBeInTheDocument()
        expect(messages-form).toMatchSnapshot()
    })
})