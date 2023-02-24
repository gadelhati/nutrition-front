import { api } from "../../assets/api/api"
import { ErrorMessage } from "../../assets/error/errorMessage"
import { setToken } from "../../service/service.token"

export const login = async<Auth,>(url: string, object: Auth): Promise<Auth | void> => {
    let errorMessage: ErrorMessage[] = []
    await api.post(url, object)
        .then(response => {
            response.data?.errors?.forEach((element: ErrorMessage) => {
                errorMessage.push({ field: element.field, message: element.message })
            })
            setToken(response.data)
            return errorMessage
        })
        .catch(function (error) {
            return errorMessage.push({ field: error.response.data.status, message: [error.response.data]})
        });
}

export const create = async<T,>(url: string, object: T): Promise<T> => {
    return await api.post(`/${url}`, object)
        .then(response => {
            return response.data?.content
        })
        .catch(function (error) {
            let errorMessage: ErrorMessage[] = []
            error.response.data?.errors?.forEach((element: ErrorMessage) => {
                errorMessage.push({ field: element.field, message: element.message })
            })
            return errorMessage.push({ field: error.response.data.status, message: [error.response.data]})
        });
}

export const retrieve = async<T,>(url: string, id: string): Promise<T> => {
    return await api.get(`/${url}/id/${id}`)
        .then(response => {
            return response.data?.content
        })
        .catch(function (error) {
            let errorMessage: ErrorMessage[] = []
            error.response.data?.errors?.forEach((element: ErrorMessage) => {
                errorMessage.push({ field: element.field, message: element.message })
            })
            return errorMessage.push({ field: error.response.data.status, message: [error.response.data]})
        });
}

export const retrieveAll = async<T,>(url: string, search: string): Promise<T> => {
    return await api.get(`/${url}/${search}`)
        .then(response => {
            return response.data?.content[0]
        })
        .catch(function (error) {
            let errorMessage: ErrorMessage[] = []
            error.response.data?.errors?.forEach((element: ErrorMessage) => {
                errorMessage.push({ field: element.field, message: element.message })
            })
            return errorMessage.push({ field: error.response.data.status, message: [error.response.data]})
        });
}

export const update = async<T,>(url: string, object: T): Promise<T> => {
    return await api.put(`/${url}`, object)
        .then(response => {
            return response.data?.content
        })
        .catch(function (error) {
            let errorMessage: ErrorMessage[] = []
            error.response.data?.errors?.forEach((element: ErrorMessage) => {
                errorMessage.push({ field: element.field, message: element.message })
            })
            return errorMessage.push({ field: error.response.data.status, message: [error.response.data]})
        });
}

export const remove = async<T,>(url: string, id: string): Promise<T> => {
    return await api.delete(`/${url}/${id}`)
        .then(response => {
            return response.data?.content
        })
        .catch(function (error) {
            let errorMessage: ErrorMessage[] = []
            error.response.data?.errors?.forEach((element: ErrorMessage) => {
                errorMessage.push({ field: element.field, message: element.message })
            })
            return errorMessage.push({ field: error.response.data.status, message: [error.response.data]})
        });
}

export const removeAll = async<T,>(url: string): Promise<T> => {
    return await api.delete(`/${url}`)
        .then(response => {
            return response.data?.content
        })
        .catch(function (error) {
            let errorMessage: ErrorMessage[] = []
            error.response.data?.errors?.forEach((element: ErrorMessage) => {
                errorMessage.push({ field: element.field, message: element.message })
            })
            return errorMessage.push({ field: error.response.data.status, message: [error.response.data]})
        });
}