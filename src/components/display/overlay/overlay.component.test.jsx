import { render, screen } from '@testing-library/react';

import Overlay from "./overlay.component";

describe('Test overlay component', () => {
    it('renders without crashing', () => {
        expect.assertions(2);
        render(<Overlay />)
        const overlay = screen.getByTestId("overlay")
        expect(overlay).toBeInTheDocument()
        expect(overlay).toMatchSnapshot()
    })
})