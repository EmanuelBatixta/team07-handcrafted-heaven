import prisma from "@/app/db/db"
import { NextRequest, NextResponse } from 'next/server'

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
  try {
    const body = await request.json()

    const product = await prisma.product.create({
      data: body
    })

    return NextResponse.json(product)

  } catch (error) {
    return NextResponse.json(
      { error: "Not possible to create product" },
      { status: 400 }
    )
  }
}