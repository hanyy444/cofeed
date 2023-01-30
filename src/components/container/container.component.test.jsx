import { render, screen } from '@testing-library/react';

import Container from "./container.component";

describe('Test container component', () => {
    it('renders without crashing', () => {
        expect.assertions(2);
        render(<Container />)
        const container = screen.getByTestId("container")
        expect(container).toBeInTheDocument()
        expect(container).toMatchSnapshot()
    })
})