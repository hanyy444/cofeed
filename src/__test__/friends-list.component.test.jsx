import { render, screen } from '@testing-library/react';

import FriendsList from "./friends-list.component";

describe('Test friends-list component', () => {
    it('renders without crashing', () => {
        expect.assertions(2);
        render(<FriendsList />)
        const friendsList = screen.getByTestId("friends-list")
        expect(friends-list).toBeInTheDocument()
        expect(friends-list).toMatchSnapshot()
    })
})