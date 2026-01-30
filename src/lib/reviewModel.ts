import { PrismaClient } from "../../generated/prisma/client";
import * as z from "zod"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const reviewSchema = z.object({
    stars: z.int().min(1).max(5),
    comment: z.string(),
    productId: z.string(),
    userPrivate_id: z.string()
})

export class Review{
    constructor(private prisma: PrismaClient) {}
}