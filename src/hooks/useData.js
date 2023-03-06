import { useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { selectAuth } from "redux/slices/auth.slice"


// CUSTOM HOOK: useData
// - args: selector, action, action extra params, extra dep for useEffect
const useData = ({ selector, thunk: { action, params = {} }, extraDeps = [] }) => {

    const dispatch = useDispatch()

    const { token } = useSelector(selectAuth)

    const { data, loading, error } = useSelector(selector)

    const useData = useCallback(() => action && (dispatch(
        action({
            token,
            ...params
        })
    )), [token, ...Object.values(params)])

    useEffect(() => {
        useData()
        return () =>
            console.log('useData is successfully unmounted! A controller abort method should be used here!!')
    }, [...extraDeps])

    return {
        data,
        loading,
        error
    }
}

export default useData