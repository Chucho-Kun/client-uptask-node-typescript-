
import api from "@/lib/axios";
import { dashboardProjectSchema, editProjectSchema, projectSchema, type Project, type ProjectFormData } from "../types";
import { isAxiosError } from "axios";

export async function createProject( formData : ProjectFormData ) {
    
    try {
        const { data } = await api.post( '/projects' , formData )
        return data        
    } catch (error) {
        if( isAxiosError(error) && error.response ){
            throw new Error(error.response.data.error)
        }
        
    }
    
}

export async function getProjects() {
    
    try {
        const { data } = await api('/projects')  
        const response = dashboardProjectSchema.safeParse(data)
        
        if(response.success) return response.data
        //return []; // O retorna un array vacío para evitar undefined
    } catch (error) {
        if( isAxiosError(error) && error.response){
            throw new Error( error.response.data.error )
        }
        return [];
    }
}

export async function getProjectsById( id : Project['_id'] ) {
    try {
        const { data } = await api(`/projects/${ id }`)
        const response = editProjectSchema.safeParse(data)
        if(response.success){
            return response.data
        }
    } catch (error) {
        if( isAxiosError(error) && error.response){
            throw new Error( error.response.data.error )
        }
    }
}

export async function getFullProject( id : Project['_id'] ) {
    try {
        const { data } = await api(`/projects/${ id }`)
        const response = projectSchema.safeParse(data)
        if(response.success){
            return response.data
        }
    } catch (error) {
        if( isAxiosError(error) && error.response){
            throw new Error( error.response.data.error )
        }
    }
}

type ProjectAPIType = {
    formData: ProjectFormData
    projectId: Project['_id']
}

export async function updateProject({ formData , projectId } : ProjectAPIType) {
    try {
        const { data } = await api.put<string>(`/projects/${ projectId }` , formData)
            return data            
    } catch (error) {
        if( isAxiosError(error) && error.response){
            throw new Error( error.response.data.error )
        }
    }
}

export async function deleteProject( id : Project['_id'] ) {
    try {
        const { data } = await api.delete<string>(`/projects/${ id }`)
            return data            
    } catch (error) {
        if( isAxiosError(error) && error.response){
            throw new Error( error.response.data.error )
        }
    }
}