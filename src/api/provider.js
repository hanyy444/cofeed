import { createAsyncThunk } from "@reduxjs/toolkit"
import axiosInstance from "./axios-instance"

const callAxios = async (requestData) => {
    const response = await axiosInstance(requestData)
    return response
}

const makeSendRequest = (base_url, requestConfig) => {
    return async function sendRequest(params, { signal }) {
        const { token, path = '', headers = {}, query = '', data = {} } = params

        const url = `${base_url}${path && `/${path}`}${query && `?${query}`}`

        if (!token) throw new Error('Authentication required.')

        const response = await callAxios({
            url,
            data,
            headers: {
                'Authorization': `Bearer ${token}`,
                ...headers
            },
            signal,
            ...requestConfig
        })

        return response
    }
}

export const catchAsyncThunk = (sendRequest) => {
    return async (params, { signal, rejectWithValue }) => { // CALLBACK to createAsyncThunk (redux-thunk): action
        try {
            const result = await sendRequest(params, { signal });
            return result.data
        } catch (error) {
            // TODO: handle different types of errors
            console.error('Error:', error);
            return rejectWithValue({
                message: error?.response?.data?.message || 'Something went wrong!',
                status: error?.response?.status || 'failure'
            })
        }
    }
}

export const createThunk = ({ resource, actionType, requestConfig }) => {
    if (!resource) throw new Error('Resource required.')
    return createAsyncThunk(
        `${resource}/${actionType}`,
        catchAsyncThunk(
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
            query: ''
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
