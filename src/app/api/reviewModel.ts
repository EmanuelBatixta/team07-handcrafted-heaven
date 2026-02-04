'use server'

import { PrismaClient } from "../../../generated/prisma/client";
import * as z from "zod"

const reviewSchema = z.object({
    stars: z.int().min(1).max(5),
    comment: z.string(),
    productId: z.string(),
    userPrivate_id: z.string(),
})

type review = z.infer<typeof reviewSchema>

export class Review{
    constructor(private prisma: PrismaClient) {}

    async createReview(data: review) {
        return this.prisma.review.create({data})
    }

    async editReview(id: string ,data: Partial<review>){
        return this.prisma.review.update(
           { 
            where:{ id: id},
            data: data
           } 
        )
    }

    async deleteReview(id: string){
        return this.prisma.review.delete({where: {id: id}})
    }
}