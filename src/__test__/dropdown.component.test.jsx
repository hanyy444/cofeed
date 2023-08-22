import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Dropdown from "../components/explore/ui/dropdown/dropdown.component";

describe('Test dropdown component', () => { 
    it('Should render without crashing', () => {
        expect.assertions(3)
        render(<Dropdown 
            showDropDown={true} 
            toggleDropdown={()=>vi.fn()}
            navItems={[{ text: 'test', handler: vi.fn() }]}/>)
        const dropdown = screen.getByTestId('dropdown')
        expect(dropdown).toBeInTheDocument()
        expect(dropdown).toMatchSnapshot()
        expect(dropdown).toHaveTextContent('test')
    })
 })