'use server'

import { PrismaClient } from "../../../generated/prisma/client";
import * as z from "zod"

export const productSchema = z.object({
    userPrivate_id: z.number(),
    category: z.string(),
    image_link: z.string(),
    price: z.float32()
})

type product = z.infer<typeof productSchema>

export class Product{
    constructor(private prisma: PrismaClient) {}

    async createProduct(data: product){
        return this.prisma.product.create({data})
    }

    async deleteProduct(id: number){
        return this.prisma.product.delete({where: {id: id}})
    }

    async getAll(){
        return this.prisma.product.findMany()
    }
}