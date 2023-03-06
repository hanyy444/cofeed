import { render, screen } from '@testing-library/react';

import MenuItem from "./menu-item.component.jsx";

describe('Test menu-item component', () => {
    it('renders without crashing', () => {
        expect.assertions(2);
        render(<MenuItem />)
        const menuItem = screen.getByTestId("menu-item")
        expect(menuItem).toBeInTheDocument()
        expect(menuItem).toMatchSnapshot()
    })
})