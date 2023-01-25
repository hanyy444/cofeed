import { ApiCore } from "../core"

const resource = 'users'
const plural = 'users'
const single = 'user'

const userApi = ApiCore({
    getAll: true,
    getSingle: true,
    post: true,
    put: true,
    patch: true,
    delete: false,
    resource,
    plural,
    single
})

// CUSTOM
userApi.search = userApi.createAsync({ resource, actionType: 'search', requestConfig: { method: 'GET' } })
userApi.addRemoveFriend = userApi.createAsync({ resource, actionType: 'addRemoveFriend', requestConfig: { method: 'PATCH' } })


export default userApi