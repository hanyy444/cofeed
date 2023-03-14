export const createBuilderCases = ({ builder, thunk, stateProp, payloadProp }) => {
    if (!stateProp) return;

    builder.addCase(thunk.pending, (state) => {
        state[stateProp] = {
            ...state[stateProp],
            loading: 'pending'
        }
    })
    payloadProp && (builder.addCase(thunk.fulfilled, (state, { payload }) => {
        state[stateProp] = {
            ...state[stateProp],
            error: null,
            data: payload[payloadProp],
            loading: payload.status,
            count: payload.count,
            page: payload.page
        }
    }))
    builder.addCase(thunk.rejected, (state, action) => {
        state[stateProp] = {
            ...state[stateProp],
            loading: 'failure',
            error: {
                message: action.payload?.message,
                status: action.payload?.status
            }
        }
    })
}

export const arrayDataState = () => {
    return {
        data: [],
        count: 0,
        page: 0,
        loading: 'idle', // 'idle' | 'loading' | 'sucess' | 'failure',
        error: null
    }
}

export const objectDataState = () => {
    return {
        data: null,
        loading: 'idle',
        error: null
    }
}
