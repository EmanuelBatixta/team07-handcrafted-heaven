import prisma from "@/app/db/db"
import { NextRequest } from 'next/server'

import * as z from "zod"

export const productSchema = z.object({
    userPublic_id: z.string(),
    category: z.string(),
    image_link: z.string().optional(),
    price: z.float32(),
    description: z.string()
})

export type product = z.infer<typeof productSchema>

export async function POST(request: NextRequest) {
    const body = await request.json()
    const {data} = body
    try{
        return await prisma.product.create({data})
    } catch {
        return {code: 400, error: 'not possible create'}
    }
}