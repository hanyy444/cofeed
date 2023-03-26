import { createAsyncThunk } from "@reduxjs/toolkit"
import axiosInstance from "./axios-instance"

const callAxios = async (requestData) => {
    const response = await axiosInstance(requestData)
    return response
}

const makeSendRequest = (base_url, requestConfig) => {
    return async function sendRequest(params) {
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
            ...requestConfig
        })

        return response
    }
}

export const catchAsyncThunk = (sendRequest) => {
    return async (params, thunkAPI) => { // CALLBACK to createAsyncThunk (redux-thunk)
        return sendRequest(params)
            .then(response => response.data)
            .catch(error => {
                return thunkAPI.rejectWithValue({
                    message: error?.response?.data?.message || error.message,
                    status: error?.response?.status
                })
            })
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
