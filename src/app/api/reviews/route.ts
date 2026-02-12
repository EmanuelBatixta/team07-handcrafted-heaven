import prisma from "@/app/db/db"
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    const body = await request.json()
    const { data } = body
    try{
        return NextResponse.json({data: await prisma.review.create({data}), status: 200})
    } catch {
        return NextResponse.json({status: 204, error: 'not possible create'})
    }
}
