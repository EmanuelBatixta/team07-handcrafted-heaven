import prisma from "@/app/db/db"
import { NextRequest, NextResponse } from 'next/server'

export async function GET(){
    return NextResponse.json({ data: await prisma.user.findMany({})})
}

export async function DELETE(request: NextRequest, context: {params: {id:string}}) {
    const id = parseInt(context.params.id, 10)
    try {
        return NextResponse.json({data: await prisma.user.delete({where: {private_id: id}}), status: 204})
    } catch {
        return NextResponse.json({error: 'not possible to delete', satus: 500, })
    }
}
 