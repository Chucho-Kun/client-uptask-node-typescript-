import { trycatchAxios } from "@/utils/trycatchaxios";
import type { UpdateCurrentPasswordForm, UserProfileForm } from "../types";
import api from "@/lib/axios";


export async function updateProfile(formData: UserProfileForm) {
    return trycatchAxios(async() => {
        const { data } = await api.put<string>('/auth/profile',formData)
        return data
    })    
}

export async function changePassword(formData:UpdateCurrentPasswordForm) {
        return trycatchAxios(async() => {
            const { data } = await api.post<string>('/auth/update-password' , formData)
            return data
        })
}