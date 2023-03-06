import { render, screen } from '@testing-library/react';

import Message from "./message.component";

describe('Test message component', () => {
    it('renders without crashing', () => {
        expect.assertions(2);
        render(<Message />)
        const message = screen.getByTestId("message")
        expect(message).toBeInTheDocument()
        expect(message).toMatchSnapshot()
    })
})