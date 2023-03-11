import { ApiCore } from "../core"

const resource = 'posts'
const plural = 'posts'
const single = 'post'

// REGISTER TO PROVIDER SERVICES
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

postApi.likePost = postApi.createThunk({
    resource,
    actionType: '/likePost',
    requestConfig: {
        method: 'PATCH',
        query: '',
        data: {}
    }
})

postApi.addComment = postApi.createThunk({
    resource,
    actionType: '/addComment',
    requestConfig: {
        method: 'PATCH',
        query: ''
    }
})

postApi.savePost = postApi.createThunk({
    resource,
    actionType: '/savePost',
    requestConfig: {
        method: 'PATCH',
        query: ''
    }
})

postApi.unRegister = function () { }


export default postApi