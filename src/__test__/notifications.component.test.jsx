import { render, screen } from "@testing-library/react";
import Notifications from "./notifications.component";

describe('Test noftications component', () => { 
    it('Should render without crashing', () => {
        expect.assertions(2)
        render(<Notifications/>)
        const notifications = screen.getByTestId('notifications')
        expect(notifications).toBeInTheDocument()
        expect(notifications).toMatchSnapshot()
    })
 })