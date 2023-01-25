import useEventListener from './useEventListener'
import { useCallback } from 'react'

const useClickOutside = (ref, callback) => {

    const eventCallback = useCallback(e => {
        // NO CURRENT REFERENCE || CLICKED INSIDE
        if (ref.current == null || ref.current?.contains(e.target)) {
            console.log('NO REFERENCE!')
            return
        }
        console.log('CURRENT REF: ', ref)
        console.log('CALLBACK INSIDE USE OUTSIDE IS RUN!')
        console.log('MODAL IS SWITCHED OFF -----------------------')
        callback(e)
    }, [ref, callback])

    useEventListener(
        "click",
        eventCallback,
        document
    )
}

export default useClickOutside