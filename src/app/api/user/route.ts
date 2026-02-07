import prisma from "@/app/db/db"
import { NextRequest } from 'next/server'
import bcrypt from "bcryptjs";
import * as z from "zod"
import { info } from "console";

const userSchema = z.object({
    name: z.string().min(2,{error: 'Name must be least 2 characters long'}).trim(),
    email: z.email({error: 'Please, enter a valid email'}).trim(),
    password: z
        .string()
        .min(8, { error: 'Be at least 8 characters long' })
        .regex(/[a-zA-Z]/, { error: 'Contain at least one letter.' })
        .regex(/[0-9]/, { error: 'Contain at least one number.' })
        .regex(/[^a-zA-Z0-9]/, {
      error: 'Contain at least one special character.',
    })
        .trim(),
        
})

type userType = z.infer<typeof userSchema>

export async function POST(request: NextRequest) {
    const body = await request.json()
    const { info } = body
    try{
        const saltRounds = 10
        const { name, email, password } = info
        const hashedpass = await bcrypt.hash(password, saltRounds)
        const data = {name, email, password: hashedpass}
        return prisma.user.create({ data, omit: password})
    } catch {
        return {code: 204, error: 'not possible create'}
    }
}

export async function DELETE(request: NextRequest, {params}: {params: {id:string}}) {
    const {id} = params
    const id_int = parseInt(id)
    try {
        return await prisma.user.delete({where: {private_id: id_int}})
    } catch {
        return {code: 400, error: 'not possible to delete'}
    }
}
 