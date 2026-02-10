import prisma from "@/app/db/db"
import { NextRequest, NextResponse } from 'next/server'

import * as z from "zod"

export const productSchema = z.object({
    userPublic_id: z.string(),
    category: z.string(),
    image_link: z.string().optional(),
    price: z.number(),
    description: z.string()
})

export type product = z.infer<typeof productSchema>

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try{
        if (params == null){
            return NextResponse.json({data: await prisma.product.findMany()})
        }
        const { id } = params
        const id_int = parseInt(id)
        return NextResponse.json({data: await prisma.product.findMany({where: {id: id_int}})})
    } catch {
        return NextResponse.json({code: 400, error: 'not possible recive'})
    }
}
  
export async function POST(request: NextRequest) {
    const body = await request.json()
    const {data} = body
    try{
        return NextResponse.json({data: await prisma.product.create({data})})
    } catch {
        return NextResponse.json({code: 400, error: 'not possible create'})
    }
}
 
export async function PUT(request: NextRequest, {params}: {params: {id:string}}) {
    const {id} = params
    const body = await request.json()
    const {data} = body
    const id_int = parseInt(id)
    try {
        return NextResponse.json({data: await prisma.product.update({where: {id: id_int}, data:data})})
    } catch {
        return NextResponse.json({code: 400, error: 'not possible to update'})
    }
}
 
export async function DELETE(request: NextRequest, {params}: {params: {id:string}}) {
    const {id} = params
    const id_int = parseInt(id)
    try {
        return NextResponse.json({data: await prisma.product.delete({where: {id: id_int}})})
    } catch {
        return NextResponse.json({code: 400, error: 'not possible to delete'})
    }
}
 