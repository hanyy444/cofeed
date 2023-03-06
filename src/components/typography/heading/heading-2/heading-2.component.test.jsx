import { render, screen } from '@testing-library/react';

import Heading_2 from "./heading-2.component";

describe('Test heading-2 component', () => {
    it('renders without crashing', () => {
        expect.assertions(2);
        render(<Heading_2 />)
        const heading-2 = screen.getByTestId("heading-2")
        expect(heading-2).toBeInTheDocument()
        expect(heading-2).toMatchSnapshot()
    })
})