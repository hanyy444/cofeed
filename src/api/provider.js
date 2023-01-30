import { createAsyncThunk } from "@reduxjs/toolkit"
import axiosInstance from "./axios-instance"

const makeSendRequest = (base_url, requestConfig) => {
    async function sendRequest(params) {
        // SENT from dispatcher
        const { token, path = '', query = '', data = {} } = params

        const url = `${base_url}${path && `/${path}`}${query && `?${query}`}`

        if (!token) throw new Error('Authentication required.')

        const response = await axiosInstance({
            url,
            data,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            ...requestConfig
        })

        return response.data
    }
    return sendRequest
}

const catchAsync = (sendRequest) => {
    return async (params, thunkAPI) => { // CALLBACK to createAsyncThunk (redux-thunk)
        return sendRequest(params)
            .catch(error => {
                console.log(error.response.data)
                return thunkAPI.rejectWithValue({
                    message: error.response.data.message,
                    status: error.response.status
                })
            })
    }
}

export const createThunk = ({ resource, actionType, requestConfig }) => {
    if (!resource) throw new Error('Resource required.')
    return createAsyncThunk(
        `${resource}/${actionType}`,
        catchAsync(
            makeSendRequest(
                `${resource}`,
                requestConfig
            )
        )
    )
}

const getAllThunk = (resource) =>
    createThunk({
        resource,
        actionType: 'getAll',
        requestConfig: {
            method: 'GET'
        }
    })

// query is disabled for following (single) crud handlers

const getSingleThunk = (resource) =>
    createThunk({
        resource,
        actionType: 'getSingle',
        requestConfig: {
            method: 'GET',
            query: ''
        }
    })

const putThunk = (resource) =>
    createThunk({
        resource,
        actionType: 'put',
        requestConfig: {
            method: 'PUT',
            query: '' //disable query
        }
    })

const patchThunk = (resource) =>
    createThunk({
        resource,
        actionType: 'patch',
        requestConfig: {
            method: 'PATCH',
            query: ''
        }
    })

const removeThunk = (resource) =>
    createThunk({
        resource,
        actionType: 'remove',
        requestConfig: {
            method: 'DELETE',
            query: '',
            data: {}
        }
    })

const postThunk = (resource) =>
    createThunk({
        resource,
        actionType: 'post',
        requestConfig: {
            method: 'POST',
            query: ''
        }
    })


//// Each method is a thunk for the store & an action for the API
export const apiProvider = Object.freeze({
    getAllThunk,
    getSingleThunk,
    postThunk,
    patchThunk,
    putThunk,
    removeThunk,
    createThunk
})
