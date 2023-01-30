import { apiProvider } from "./provider"

//// AN API RUNNER
// EACH PROPERTY IS A THUNK
// export class ApiCore {
//     constructor(options) {
//         this.resource = options.resource
//         this.createAsync = apiProvider.createAsync
//         if (options.getAll) { this.getAll = apiProvider.getAll(this.resource) }
//         if (options.getSingle) { this.getSingle = apiProvider.getSingle(this.resource) }
//         if (options.post) { this.post = apiProvider.post(this.resource) }
//         if (options.patch) { this.patch = apiProvider.patch(this.resource) }
//         if (options.put) { this.put = apiProvider.put(this.resource) }
//         if (options.remove) { this.remove = apiProvider.remove(this.resource) }
//     }
// }

// COMPOSITION INSTEAD OF CLASSES
export function ApiCore(options) {
    const { getAllThunk, getSingleThunk, postThunk, patchThunk, putThunk, removeThunk, createThunk } = apiProvider
    const resource = options.resource
    return {
        resource,
        createThunk,
        getAll: options.getAll && getAllThunk(resource),
        getSingle: options.getSingle && getSingleThunk(resource),
        post: options.post && postThunk(resource),
        patch: options.patch && patchThunk(resource),
        put: options.put && putThunk(resource),
        remove: options.remove && removeThunk(resource),
    }
}