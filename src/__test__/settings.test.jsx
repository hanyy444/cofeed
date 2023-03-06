import React from "react";
import { render, screen } from '@testing-library/react';

import Settings from "../pages/settings/settings.page.jsx";

describe('Test settings page', () => {
    expect.assertions(1);
    test('renders without crashing', () => {
        render(<Settings />)
        expect(screen.getByTestId("settings")).toMatchSnapshot()
    })
})