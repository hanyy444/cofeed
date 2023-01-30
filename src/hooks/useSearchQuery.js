import { useCallback, useEffect, useState } from 'react'
import useDebounce from './useDebounce'


const useSearchQuery = ({ searchCallback, clearSearch }) => {

    const [searchQuery, setSearchQuery] = useState('')

    const search = useCallback(() => {
        if (searchQuery === '') return
        searchCallback(searchQuery)
    }, [searchQuery])

    // NOTE: whenever searchQuery changes, it resets the timeout
    // If nothing changes for a half sec, timeout callback is run
    useDebounce(search, 500, [searchQuery])

    useEffect(() => {
        return () => {
            if (searchQuery !== '') return
            clearSearch()
        }
    }, [searchQuery])

    return [
        searchQuery,
        setSearchQuery
    ]

}
export default useSearchQuery