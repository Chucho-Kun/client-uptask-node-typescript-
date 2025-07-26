# FRONT MERN - REST API REACT/TypeScript
React Web Platform connected to an API hosted on a MongoDB + Express + React + Node ( MERN )
![Gameplay A](src/assets/shotA.png)
![Gameplay B](src/assets/shotB.png)
![Gameplay C](src/assets/shotC.png)
![Gameplay 1](src/assets/shot1.png)
![Gameplay 2](src/assets/shot2.png)
## Technologies
React + Typescript + TailwindCSS + Axios + Zod + React Router + React Query
## Developer Notes
### Managed with Axios
#### src/lib/axios.ts
```
import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

export default api
```
#### src/api/ProjectAPI.ts
```

import api from "@/lib/axios";
import { dashboardProjectSchema, type Project, type ProjectFormData } from "../types";
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
        console.log({response});
        
        if(response.success) return response.data        
    } catch (error) {
        if( isAxiosError(error) && error.response){
            throw new Error( error.response.data.error )
        }
    }
}

export async function getProjectsById( id : Project['_id'] ) {
    try {
        const { data } = await api(`/projects/${ id }`)
            return data            
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
```
#### src/types/index.ts
```
import { z } from "zod"

/** Auth & Users */

const authSchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string(),
    password_confirmation: z.string(),
    token: z.string()
})

type Auth = z.infer<typeof authSchema>
export type UserLoginForm = Pick<Auth, 'email' | 'password'>
export type UserRegistrationForm = Pick<Auth, 'name' | 'email' | 'password' | 'password_confirmation'>
export type RequestConfirmationCodeForm = Pick<Auth, 'email' >
export type ForgottenPasswordForm = Pick<Auth, 'email' >
export type NewPasswordForm = Pick<Auth, 'password' | 'password_confirmation' >

export type ConfirmToken = Pick<Auth , 'token'>

/** User Authentication */
export const userSchema = authSchema.pick({
    name:true,
    email:true
}).extend({
    _id: z.string()
})
export type User = z.infer<typeof userSchema>

/** Tasks */
export const taskStatusSchema = z.enum(["pending", "onHold" , "inProgress" , "underReview" , "completed"])
export type TaskStatus = z.infer<typeof taskStatusSchema>

export const taskSchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    project: z.string(),
    status: taskStatusSchema,
    completedBy: z.array(z.object({
        _id: z.string(),
        user: userSchema,
        status: taskStatusSchema
    })),
    createdAt: z.string(),
    updatedAt: z.string()
})

export type Task = z.infer<typeof taskSchema>
export type TaskFormData = Pick<Task, 'name' | 'description'>

/** Projects **/
export const projectSchema = z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),
    manager: z.string(),
    tasks: z.array( z.object() ),
    team: z.array( z.string() )
})

export const dashboardProjectSchema = z.array(
   projectSchema.pick({
        _id: true,
        projectName: true,
        clientName: true,
        description: true,
        manager: true,
        tasks: true,
        team: true
   })
)

export type Project = z.infer<typeof projectSchema>
export type ProjectFormData = Pick<Project , 'clientName' | 'projectName' | 'description' > & { tasks?:string[] }

/** Team */
const teamMemberSchema = userSchema.pick({
    name: true,
    email: true,
    _id:true
})

export const teamMembersSchema = z.array(teamMemberSchema)
export type TeamMember = z.infer<typeof teamMemberSchema>
export type TeamMemberForm = Pick<TeamMember , 'email'>
```
#### src/env.local
```
VITE_API_URL=https://server-uptask-node-typescript.onrender.com/api
```
