import { useCallback, useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from "react-redux"
import { selectAuthToken } from "redux/slices/auth.slice"
import isEqual from 'lodash/isEqual';

// CUSTOM HOOK: useQuery
// - args: selector, action, action extra params, extra dep for useEffect
// params = token | path | header | query | data
const abortController = new AbortController();
const signal = abortController.signal;
export default function useQuery({ selector, thunk: { action, params = {} }, extraDeps = [] }) {
    const token = useSelector(selectAuthToken)
    const dispatch = useDispatch()
    // const { data, loading, error, count, page } = useSelector(selector) // NOTE: 3 render cycles, 1 for each loading state
    const queryResult = useSelector(selector, isEqual)
    const useQuery = useCallback(
        async () => action && await dispatch(action({ token, ...params }, { signal })),
        [token, ...Object.values(params)]
    )
    useEffect(() => {
        useQuery()
        return () => abortController.abort();
    }, [token, action, ...Object.values(params), ...extraDeps])
    return queryResult
}

