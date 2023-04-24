import { api } from "../assets/api/api"
import { ErrorMessage } from "../assets/error/errorMessage"
import { setToken } from "./service.token"

const addError = (error: any):ErrorMessage[] => {
    let errorMessage: ErrorMessage[] = []
    error.response.data?.errors?.forEach((element: ErrorMessage) => {
        errorMessage.push({ field: element.field, message: element.message })
    })
    return errorMessage
}

export const login = async<Auth,>(url: string, object: Auth) => {
    return await api.post(url, object)
        .then(response => {
            setToken(response.data)
            return response.data
        })
        .catch(error => { return addError(error) })
}

export const create = async<T,>(url: string, object: T) => {
    return await api.post(`/${url}`, object)
        .then(response => { return response.data })
        .catch(error => { return addError(error) })
}

export const retrieve = async<T,>(url: string, page: number, size: number, sort: string) => {
    return await api.get(`/${url}`, { params: { page: page, size: size } } )
    // return await api.get(`/${url}`, { params: { page: page, size: size, sort: sort } } )
        .then(response => { return response.data })
        .catch(error => { return addError(error) })
}

export const update = async<T,>(url: string, object: T) => {
    return await api.put(`/${url}`, object)
        .then(response => { return response.data })
        .catch(error => { return addError(error) })
}

export const remove = async<T,>(url: string, id: string) => {
    return await api.delete(`/${url}/${id}`)
        .then(response => { return response.data })
        .catch(error => { return addError(error) })
}

export const removeAll = async<T,>(url: string) => {
    return await api.delete(`/${url}`)
        .then(response => { return response.data })
        .catch(error => { return addError(error) });
}