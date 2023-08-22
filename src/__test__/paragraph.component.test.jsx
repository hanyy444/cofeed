import { render, screen } from '@testing-library/react';

import Paragraph from "../components/typography/paragraph/paragraph.component";

describe('Test paragraph component', () => {
    it('renders without crashing', () => {
        expect.assertions(2);
        render(<Paragraph />)
        expect(screen.getByTestId('paragraph')).toBeInTheDocument();
        expect(screen.getByTestId('paragraph')).toMatchSnapshot();
    })
})