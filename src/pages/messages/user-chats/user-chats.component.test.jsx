import { render, screen } from '@testing-library/react';

import UserChats from "./user-chats.component";

describe('Test user-chats component', () => {
    it('renders without crashing', () => {
        expect.assertions(2);
        render(<UserChats />)
        const user-chats = screen.getByTestId("user-chats")
        expect(user-chats).toBeInTheDocument()
        expect(user-chats).toMatchSnapshot()
    })
})