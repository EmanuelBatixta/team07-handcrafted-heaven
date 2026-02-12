import prisma from "@/app/db/db"
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    const body = await request.json()
    const {data} = body
    try{
        return NextResponse.json({data: await prisma.product.create({data})})
    } catch {
        return NextResponse.json({code: 400, error: 'not possible create'})
    }
}
 
