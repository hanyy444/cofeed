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
    const { getAll, getSingle, post, patch, put, remove, createAsync } = apiProvider
    const resource = options.resource
    return {
        resource,
        createAsync,
        getAll: options.getAll && getAll(resource),
        getSingle: options.getSingle && getSingle(resource),
        post: options.post && post(resource),
        patch: options.patch && patch(resource),
        put: options.put && put(resource),
        remove: options.remove && remove(resource),
    }
}