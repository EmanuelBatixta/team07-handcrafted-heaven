'use server'

import bcrypt from "bcryptjs";
import { PrismaClient } from "../../../generated/prisma/client";
import * as z from "zod"

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

export class User{
    constructor(private prisma: PrismaClient) {}

    async createUser(info: userType) {
        const saltRounds = 10
        const hashedpass = await bcrypt.hash(info.password, saltRounds)
        const {name, email, password} = info
        const data = {name, email, password: hashedpass}
        return this.prisma.user.create({ data })
    }

    async deleteUser(id: number){
        return this.prisma.user.delete({where:{private_id: id}})
    }

    async getUserByEmail(email: string){
        const data = await this.prisma.user.findUnique({where: { email: email}})
        // @ts-expect-error
        const {...secureData, password } = data
        return secureData 
    }
}