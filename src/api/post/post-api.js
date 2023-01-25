import { ApiCore } from "../core"

const resource = 'posts'
const plural = 'posts'
const single = 'post'

// REGISTER TO PROVIDER SERVICE
const postApi = ApiCore({
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

// ATTACH CUSTOM METHODS TO THE API
// postApi.deactivate = () => postApi.put

postApi.likePost = postApi.createAsync({ resource, actionType: '/likePost', requestConfig: { method: 'PATCH' } })

postApi.unRegister = function () { console.log(`${this.resource} service unregistered.`) }


export default postApi