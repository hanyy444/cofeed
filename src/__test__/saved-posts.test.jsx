import React from "react";
import { render, screen } from '@testing-library/react';

import SavedPosts from "../pages/saved-posts/saved-posts.page.jsx";

describe('Test saved-posts page', () => {
    expect.assertions(1);
    test('renders without crashing', () => {
        render(<SavedPosts />)
        expect(screen.getByTestId("saved-posts")).toMatchSnapshot()
    })
})