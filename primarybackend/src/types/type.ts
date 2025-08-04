import {email, string, z} from "zod"

export const Signupschema = z.object({
    email: z.email(),
    name : z.string(),
    password: z.string().min(8),
})
export const Signinschema = z.object({
    email: z.email(),
    password : z.string().min(8)
})
export const Zapschema = z.object({
    trigerId : z.string(),
    trigerMetadata : z.any().optional(),
    actions: z.array(z.object({
        actionId : z.string(),
        actionMetadata : z.any().optional()
    }))
})