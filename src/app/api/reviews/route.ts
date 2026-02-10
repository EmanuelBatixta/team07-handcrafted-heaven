import prisma from "@/app/db/db"
import { NextRequest, NextResponse } from 'next/server'

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
    return NextResponse.json({data: await prisma.review.findMany({where: {productId: id_int}}), status: 200})
}
  
export async function POST(request: NextRequest) {
    const body = await request.json()
    const { data } = body
    try{
        return NextResponse.json({data: await prisma.review.create({data}), status: 200})
    } catch {
        return NextResponse.json({status: 204, error: 'not possible create'})
    }
}
 
export async function PUT(request: NextRequest, {params}: {params: {id:string}}) {
    const {id} = params
    const body = await request.json()
    const {data} = body
    const id_int = parseInt(id)
    try {
        return NextResponse.json({data: await prisma.review.update({where: {id: id_int}, data:data}), status: 200})
    } catch {
        return NextResponse.json({status: 204, error: 'not possible to update'})
    }
}
 
export async function DELETE(request: NextRequest, {params}: {params: {id:string}}) {
    const {id} = params
    const id_int = parseInt(id)
    try {
        return NextResponse.json({data: await prisma.review.delete({where: {id: id_int}})})
    } catch {
        return NextResponse.json({code: 400, error: 'not possible to delete'})
    }
}
 