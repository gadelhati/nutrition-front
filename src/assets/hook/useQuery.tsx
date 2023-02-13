import axios, { AxiosRequestConfig } from "axios";
import { useState, useEffect } from "react";
import { api } from "../api/api";

export function useQuery<T = unknown>(url: string, options?: AxiosRequestConfig){
    const [ data, setData ] = useState<T | null>(null)
    const [ isQuery, setIsQuery ] = useState(true)
    const [ error, setError ] = useState<Error | null>(null)

    useEffect(() => {
        api.get(url, options)
        .then(response => { setData(response.data) })
        .catch(error => { setError(error) })
        .finally(() => { setIsQuery(false) })
    }, [])

    return { data, error, isQuery }
}