import React from "react";
import {render, screen, fireEvent} from '@testing-library/react'
import Story from "../components/stories/story/story.component";
import { vi } from "vitest";

describe('Test story component', () => {
    const setStateMock = vi.fn()

    const useStateMock = (useState) => [useState, setStateMock]

    const spy = vi.spyOn(React, 'useState').mockImplementationOnce(useStateMock)
    
    it('Should render without crashing', () => {
        expect.assertions(3)
        render(<Story userName={'test'} userPicture={'test'}/>)
        const story = screen.getByTestId('story')
        fireEvent.click(story)

        expect(story).toBeInTheDocument()
        expect(story).toMatchSnapshot()
        expect(spy).toHaveBeenCalledTimes(1)
    })

    it('Should be seen', () => {
        expect.assertions(1)
             render(<Story userName={'test'} userPicture={'test'}/>)
        const story = screen.getByTestId('story')
        fireEvent.click(story)
        expect(story).toHaveClass('seen')
    })

})
