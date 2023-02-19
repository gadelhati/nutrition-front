import { api } from "../../assets/api/api"
import { ErrorMessage } from "../../assets/error/errorMessage"
import { setToken } from "../../service/service.token"

export const login = async<T,>(url: string, object: T) => {
    let errorMessage: ErrorMessage[] = []
    await api.post(url, object)
        .then(response => {
            response.data?.errors?.forEach((element: ErrorMessage) => {
                errorMessage.push({ field: element.field, defaultMessage: element.defaultMessage })
            })
            setToken(response.data)
            return errorMessage
        })
        .catch(function (error) {
            return errorMessage.push({ field: error.response.data.status, defaultMessage: [error.response.data]})
        });
}

export const create = async<T,>(url: string, object: T): Promise<Awaited<T | ErrorMessage[]>> => {
    let errorMessage: ErrorMessage[] = []
    await api.post(`/${url}`, object)
        .then(response => {
            response.data?.errors?.forEach((element: ErrorMessage) => {
                errorMessage.push({ field: element.field, defaultMessage: element.defaultMessage })
            })
        })
        .catch(function (error) {
            errorMessage.push({ field: error.response.data.status, defaultMessage: [error.response.data]})
        })
        return errorMessage
}

export const retrieve = async<T,>(url: string, id: string) => {
    let errorMessage: ErrorMessage[] = []
    await api.get(`/${url}/${id}`)
        .then(response => {
            response.data?.errors?.forEach((element: ErrorMessage) => {
                errorMessage.push({ field: element.field, defaultMessage: element.defaultMessage })
            })
            return errorMessage
        })
        .catch(function (error) {
            return errorMessage.push({ field: error.response.data.status, defaultMessage: [error.response.data]})
        });
}

export const update = async<T,>(url: string, object: T) => {
    let errorMessage: ErrorMessage[] = []
    await api.put(`/${url}`, object)
        .then(response => {
            response.data?.errors?.forEach((element: ErrorMessage) => {
                errorMessage.push({ field: element.field, defaultMessage: element.defaultMessage })
            })
            return errorMessage
        })
        .catch(function (error) {
            return errorMessage.push({ field: error.response.data.status, defaultMessage: [error.response.data]})
        });
}

export const remove = async<T,>(url: string, id: string) => {
    let errorMessage: ErrorMessage[] = []
    await api.delete(`/${url}/${id}`)
        .then(response => {
            response.data?.errors?.forEach((element: ErrorMessage) => {
                errorMessage.push({ field: element.field, defaultMessage: element.defaultMessage })
            })
            return errorMessage
        })
        .catch(function (error) {
            return errorMessage.push({ field: error.response.data.status, defaultMessage: [error.response.data]})
        });
}

export const removeAll = async<T,>(url: string) => {
    let errorMessage: ErrorMessage[] = []
    await api.delete(`/${url}`)
        .then(response => {
            response.data?.errors?.forEach((element: ErrorMessage) => {
                errorMessage.push({ field: element.field, defaultMessage: element.defaultMessage })
            })
            return errorMessage
        })
        .catch(function (error) {
            return errorMessage.push({ field: error.response.data.status, defaultMessage: [error.response.data]})
        });
}