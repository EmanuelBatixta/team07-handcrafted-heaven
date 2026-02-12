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

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const id_int = parseInt(id)

    const product = await prisma.product.findUnique({
      where: { id: id_int }
    })

    return NextResponse.json({ data: product })
  } catch (error) {
    return NextResponse.json(
      { error: "Not possible to receive" },
      { status: 400 }
    )
  }
}
 
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const id_int = Number(id)

    if (isNaN(id_int)) {
      return NextResponse.json(
        { error: "Invalid ID" },
        { status: 400 }
      )
    }

    const body = await request.json()
    const { data } = body

    const updatedProduct = await prisma.product.update({
      where: { id: id_int },
      data: data
    })

    return NextResponse.json(updatedProduct)

  } catch (error) {
    return NextResponse.json(
      { error: "Not possible to update" },
      { status: 400 }
    )
  }
}
 
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const id_int = parseInt(id)

    await prisma.product.delete({
      where: { id: id_int }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: "Not possible to delete" },
      { status: 400 }
    )
  }
}