import prisma from "@/app/db/db"
import { NextRequest } from 'next/server'

import * as z from "zod"

const reviewSchema = z.object({
    stars: z.int().min(1).max(5),
    comment: z.string(),
    productId: z.string(),
    userPrivate_id: z.string(),
})

type review = z.infer<typeof reviewSchema>

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params
    const id_int = parseInt(id)
    return await prisma.review.findMany({where: {productId: id_int}})
}
  
export async function POST(request: NextRequest) {
    const body = await request.json()
    const {data} = body
    try{
        return await prisma.review.create({data})
    } catch {
        return {code: 204, error: 'not possible create'}
    }
}
 
export async function PUT(request: NextRequest, {params}: {params: {id:string}}) {
    const {id} = params
    const body = await request.json()
    const {data} = body
    const id_int = parseInt(id)
    try {
        return await prisma.review.update({where: {id: id_int}, data:data})
    } catch {
        return {code: 204, error: 'not possible to update'}
    }
}
 
export async function DELETE(request: NextRequest, {params}: {params: {id:string}}) {
    const {id} = params
    const id_int = parseInt(id)
    try {
        return await prisma.review.delete({where: {id: id_int}})
    } catch {
        return {code: 400, error: 'not possible to delete'}
    }
}
 