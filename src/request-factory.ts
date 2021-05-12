import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios"
import {MailcowErrorResponse, MailcowException, Payload} from "./types"

export default {
    post: async<T> (
        route: string,
        payload: Payload,
        headers: AxiosRequestConfig
    ): Promise<T> => {
        return new Promise((resolve, reject) => {
            axios
                .post(route, payload, headers)
                // On succes
                .then((res: AxiosResponse<T>) => {
                    resolve(res.data)
                })
                // On error
                .catch((e: AxiosError<MailcowErrorResponse>) => {
                    const { msg } = e.response.data
                    reject(new MailcowException(msg))
                })
        })
    },

    delete: async<T> (
        route: string,
        payload: any,
        headers: AxiosRequestConfig
    ): Promise<T> => {
        return new Promise((resolve, reject) => {
            axios
                .post(route, payload, headers)
                // On succes
                .then((res: AxiosResponse<T>) => {
                    resolve(res.data)
                })
                // On error
                .catch((e: AxiosError<MailcowErrorResponse>) => {
                    const { msg } = e.response.data
                    reject(new MailcowException(msg))
                })
        })
    },

    get: async<T> (
        route: string,
        headers: AxiosRequestConfig
    ): Promise<T> => {
        return new Promise((resolve, reject) => {
            axios
                .get(route, headers)
                // On succes
                .then((res: AxiosResponse<T>) => {
                    resolve(res.data)
                })
                // On error
                .catch((e: AxiosError<MailcowErrorResponse>) => {
                    const { msg } = e.response.data
                    reject(new MailcowException(msg))
                })
        })
    }
}