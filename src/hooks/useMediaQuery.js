import { useEffect, useState } from "react";
import useEventListener from "./useEventListener";

function useMediaQuery(mediaQuery) {
    const [isMatch, setIsMatch] = useState(window.matchMedia(mediaQuery).matches)
    useEventListener('change', e => setIsMatch(e.matches), window.matchMedia(mediaQuery))
    return isMatch
}

export default useMediaQuery