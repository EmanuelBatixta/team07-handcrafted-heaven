import prisma from "@/app/db/db"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, context: { params: { id: string } }) {
    try{
        const id = parseInt(context.params.id, 10)
        return NextResponse.json({data: await prisma.product.findMany({where: {id: id}})})
    } catch {
        return NextResponse.json({code: 400, error: 'not possible recive'})
    }
}

export async function PUT(request: NextRequest, context: {params: {id:string}}) {
    const id = parseInt(context.params.id, 10)
    const body = await request.json()
    const { data } = body
    try {
        return NextResponse.json({data: await prisma.product.update({where: {id: id}, data:data})})
    } catch {
        return NextResponse.json({code: 400, error: 'not possible to update'})
    }
}
 

export async function DELETE(request: NextRequest, context: {params: {id:string}}) {
    const id = parseInt(context.params.id, 10)
    try {
        return NextResponse.json({data: await prisma.product.delete({where: {id: id}})})
    } catch {
        return NextResponse.json({code: 400, error: 'not possible to delete'})
    }
}
 