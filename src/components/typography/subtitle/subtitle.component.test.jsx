import {render, screen} from '@testing-library/react'
import Subtitle from './subtitle.component';

describe('Test subtitle component', () => {
    it('Should render without crashing', ()=>{
        expect.assertions(3);
        render(<Subtitle>
            text
        </Subtitle>)
        const subtitle = screen.getByTestId('subtitle')
        expect(subtitle).toBeInTheDocument();
        expect(subtitle).toMatchSnapshot();
        expect(subtitle).toHaveTextContent('text')
    })
})