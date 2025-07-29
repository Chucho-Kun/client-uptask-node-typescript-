import { isAxiosError } from "axios"

export function trycatchAxios<T>(fn: () => Promise<T> ) : Promise<T> {
    return fn().catch(error => {
        if(isAxiosError(error)){
            throw new Error(error.response?.data.error)
        }
        throw error
    })
}