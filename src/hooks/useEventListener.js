import { useEffect, useRef, useCallback } from "react"

const useEventListener = (
    eventType,
    callback,
    element = window
) => {
    const callbackRef = useRef(callback)

    useEffect(() => {
        callbackRef.current = callback
    }, [callback])

    const handler = useCallback(
        (event) => {
            console.log('HANDLER RUN!')
            callbackRef.current(event)
        },
        [event]
    )

    useEffect(() => {
        console.log('EVENT LISTENER ATTACHED!')
        element?.addEventListener(eventType, handler, false)
        return () => {
            // callback.current = undefined 
            console.log('EVENT LISTENER REMOVED!')
            element?.removeEventListener(eventType, handler)
        }
    }, [eventType, element])

}

export default useEventListener