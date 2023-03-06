import React from "react";
import { render, screen } from '@testing-library/react';

import Messages from "../pages/messages/messages.page.jsx";

describe('Test messages page', () => {
    expect.assertions(1);
    test('renders without crashing', () => {
        render(<Messages />)
        expect(screen.getByTestId("messages")).toMatchSnapshot()
    })
})