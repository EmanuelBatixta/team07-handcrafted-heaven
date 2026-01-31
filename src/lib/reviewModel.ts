'use server'

import { PrismaClient } from "../../generated/prisma/client";
import * as z from "zod"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        this.prisma.review.create({data})
    }

    async editReview(id: string ,data: Partial<review>){
        this.prisma.review.update(
           { 
            where:{ id: id},
            data: data
           } 
        )
    }

    async deleteReview(id: string){
        this.prisma.review.delete({where: {id: id}})
    }
}