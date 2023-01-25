import { createAsyncThunk } from "@reduxjs/toolkit"
import axiosInstance from "./axios-instance"


// EXPORTED AS 2 THINGS: A thunk for the store & A dispatcher for an API

export function catchAsync(asyncFunc) {
    return async (params, thunkAPI) => {
        return asyncFunc(params, thunkAPI)
            .catch(error => {
                console.log(error.response.data)
                return thunkAPI.rejectWithValue({
                    message: error.response.data.message,
                    status: error.response.status
                })
            })
    }
}

export const createAsync = ({ resource, actionType, requestConfig: { method } }) => {
    return createAsyncThunk(
        `${resource}/${actionType}`,
        catchAsync(async ({ url = '', token, data = {}, query = '' }, { rejectWithValue }) => {
            const response = await axiosInstance({
                method,
                url: `${resource}/${url}?${query}`,
                headers: { 'Authorization': `Bearer ${token}` },
                data
            })
            return response.data
        })
    )
}

const getAll = (resource) => {
    if (!resource) throw new Error('Please provide resource argument')
    return createAsyncThunk(
        `${resource}/getAll`,
        catchAsync(async ({ token, url = '', query = '' }, thunkAPI) => {
            const response = await axiosInstance({
                method: 'GET',
                url: `${resource}/${url}${query ? `?${query}` : ''}`,
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            return response.data
        })
    )
}
const getSingle = (resource) => {
    if (!resource) throw new Error('Please provide resource argument')
    return createAsyncThunk(
        `${resource}/getSingle`,
        catchAsync(async ({ token, url }, thunkAPI) => {
            if (!url || !token) throw new Error('Please provide required params.')
            const response = await axiosInstance({
                method: 'GET',
                url: `${resource}/${url}`,
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            return response.data;
        })
    )
}

const put = (resource) => {
    if (!resource) throw new Error('Please provide resource argument')
    return createAsyncThunk(
        `${resource}/put`,
        catchAsync(async ({ token, url, data }, thunkAPI) => {
            if (!url || !token || Object.keys(data).length === 0) throw new Error('Please provide required params.')
            const response = await axiosInstance({
                method: 'PUT',
                url: `${resource}/${url}`,
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                data
            })
            return response.data
        })
    )
}
const patch = (resource) => {
    if (!resource) throw new Error('Please provide resource argument')
    return createAsyncThunk(
        `${resource}/patch`,
        catchAsync(async ({ token, url, data }) => {
            if (!url || !token || Object.keys(data).length === 0) throw new Error('Please provide required params.')
            const response = await axiosInstance({
                method: 'PATCH',
                url: `${resource}/${url}`,
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                data
            })
            return response.data
        })
    )
}
const remove = (resource) => {
    if (!resource) throw new Error('Please provide resource argument')

    return createAsyncThunk(
        `${resource}/remove`,
        catchAsync(async ({ token, url }) => {
            if (!url || !token) throw new Error('Please provide required params.')
            const response = await axiosInstance({
                method: 'DELETE',
                url: `${resource}/${url}`,
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            return response.data
        })
    )
}
const post = (resource) => {
    if (!resource) throw new Error('Please provide resource argument')
    return createAsyncThunk(
        `${resource}/post`,
        catchAsync(async ({ token, url = '', data }) => {
            const response = await axiosInstance({
                method: 'POST',
                url: `${resource}/${url}`,
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                data
            })
            return response.data
        })
    )
}
export const apiProvider = {
    getAll,
    getSingle,
    post,
    patch,
    put,
    remove,
    createAsync
}
