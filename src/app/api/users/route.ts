import prisma from "@/app/db/db"
import { NextRequest, NextResponse } from 'next/server'

export async function GET(){
    return NextResponse.json({ data: await prisma.user.findMany({})})
}

export async function DELETE(request: NextRequest, {params}: {params: {id:string}}) {
    const {id} = params
    const id_int = parseInt(id)
    try {
        return NextResponse.json({data: await prisma.user.delete({where: {private_id: id_int}}), status: 204})
    } catch {
        return NextResponse.json({error: 'not possible to delete', satus: 500, })
    }
}
 