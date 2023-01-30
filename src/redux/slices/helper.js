export const createBuilderCases = ({ builder, thunk, stateProp }) => {
    if (!stateProp) return;

    builder.addCase(thunk.pending, (state) => {
        state[stateProp] = {
            ...state[stateProp],
            loading: 'pending'
        }
    })
    builder.addCase(thunk.fulfilled, (state, { payload }) => {
        state[stateProp] = {
            ...state[stateProp],
            error: null,
            data: payload[stateProp],
            loading: payload.status,
            count: payload.count,
            page: payload.page
        }
    })
    builder.addCase(thunk.rejected, (state, action) => {
        state[stateProp] = {
            ...state[stateProp],
            loading: 'failure',
            error: {
                message: action.payload.message,
                status: action.payload.status
            }
        }
    })
}
