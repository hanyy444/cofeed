import { render, screen } from '@testing-library/react';

import MessagesList from "./messages-list.component";

describe('Test messages-list component', () => {
    it('renders without crashing', () => {
        expect.assertions(2);
        render(<MessagesList />)
        const messagesList = screen.getByTestId("messages-list")
        expect(messages-list).toBeInTheDocument()
        expect(messages-list).toMatchSnapshot()
    })
})