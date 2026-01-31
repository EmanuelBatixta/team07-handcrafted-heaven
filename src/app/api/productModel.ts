'use server'

import { PrismaClient } from "../../../generated/prisma/client";
import * as z from "zod"

const productSchema = z.object({
    userPrivate_id: z.string(),
    category: z.string(),
    image_link: z.string()
})

type product = z.infer<typeof productSchema>

export class Product{
    constructor(private prisma: PrismaClient) {}

    async createProduct(data: product){
        this.prisma.product.create({data})
    }

    async deleteProduct(id: string){
        this.prisma.product.delete({where: {id: id}})
    }
}