import prisma from "@/app/db/db"
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from "bcryptjs";
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
        .trim()
        
})

type userType = z.infer<typeof userSchema>

export async function POST(request: NextRequest) {
    const body = await request.json()
    if (!body){ return Response.json("no data provided")}
    console.log(request)
    try{
        const { name, email, password } = body
        const emailUsing = await prisma.user.findFirst({where: {email: email}})
        if (emailUsing) { return NextResponse.json({code:400, error: 'email already is using'}) }
        const saltRounds = 10
        const hashedpass = await bcrypt.hash(password, saltRounds)
        return NextResponse.json({data: await prisma.user.create({ data:{name, email, password: hashedpass}}), status: 201})
    } catch (error) {
        return NextResponse.json({error: 'no possible create a new user', data:{}, status: 400})
    }
}

export async function GET(){
    return NextResponse.json({ data: await prisma.user.findMany({})})
}

export async function DELETE(request: NextRequest, {params}: {params: {id:string}}) {
    const {id} = params
    const id_int = parseInt(id)
    try {
        return NextResponse.json({data: await prisma.user.delete({where: {private_id: id_int}}), status: 204})
    } catch {
        return NextResponse.json({error: 'not possible to delete', satus: 400, })
    }
}
 