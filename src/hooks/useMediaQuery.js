import { useEffect, useState } from "react";
import useEventListener from "./useEventListener";

function useMediaQuery(mediaQuery) {
    const [isMatch, setIsMatch] = useState(window.matchMedia(mediaQuery).matches)
    const [mediaQueryList] = useState(window.matchMedia(mediaQuery))
    useEventListener('change', e => setIsMatch(e.matches), mediaQueryList)
    return isMatch
}

export default useMediaQuery