import { useCallback, useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from "react-redux"
import { selectAuth } from "redux/slices/auth.slice"


// CUSTOM HOOK: useData
// - args: selector, action, action extra params, extra dep for useEffect
const useData = ({ selector, thunk: { action, params = {} }, extraDeps = [] }) => {

    const dispatch = useDispatch()

    const { token } = useSelector(selectAuth, shallowEqual)

    const { data, loading, error } = useSelector(selector, shallowEqual)

    const useData = useCallback(() =>
        action && (dispatch(
            action({
                token,
                ...params
            })
        )), [token, ...Object.values(params)])

    useEffect(() => {
        useData()
    }, [...extraDeps])

    return {
        data,
        loading,
        error
    }
}

export default useData