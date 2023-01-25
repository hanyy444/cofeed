// SOURCE: https://www.30secondsofcode.org/articles/s/javascript-switch-object

// NOTE: The lookupValue is always a function so it runs it(IIF)
const switchFunctionInvoker = (lookupObject, defaultCase = '_default') =>
    lookupValue => {
        const lookupMethod = (lookupObject[lookupValue] || lookupObject[defaultCase])
        return lookupMethod()
    }

export default switchFunctionInvoker