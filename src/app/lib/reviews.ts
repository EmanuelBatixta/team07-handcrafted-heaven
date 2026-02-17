'use server'

import { z } from 'zod';
import prisma from '../db/db'; 
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth'; 
import postgres from 'postgres';
import { Review } from './definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const ReviewSchema = z.object({
  stars: z.coerce.number().min(1).max(5),
  comment: z.string().min(5, { message: "The comment must be more detailed." }),
  productId: z.coerce.number(),
});

export async function createReview(prevState: any, formData: FormData) {
  try {
    const session = await auth();

    if (!session || !session.user?.email) {
        return { message: 'You must be logged in to leave a review.' };
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email }
    });

    if (!user) {
        return { message: 'Error: User account not found.' };
    }

    const validatedFields = ReviewSchema.safeParse({
      stars: formData.get('stars'),
      comment: formData.get('comment'),
      productId: formData.get('productId'),
    });

    if (!validatedFields.success) {
      return { message: 'Please select a star rating and write a comment.' };
    }

    const { stars, comment, productId } = validatedFields.data;

    await prisma.review.create({
      data: {
        stars: stars,
        comment: comment,
        productId: productId,
        userPublic_id: user.public_id,
      },
    });

    revalidatePath(`/product-list/${productId}`);
    return { message: 'Success' };

  } catch (error) {
    console.error('Database Error:', error);
    return { message: 'Failed to connect to the database.' };
  }
}

export async function fetchReview(id: string): Promise<Review[]> {
    if (!id) {
      return [];
    }

    try {
      const rows = await sql<Review[]>`
        SELECT "Review".*, "User".name as "userName"
        FROM "Review"
        JOIN "User" ON "Review"."userPublic_id" = "User"."public_id"
        WHERE "Review"."productId" = ${id}
        LIMIT 3
      `;

    return rows;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch review.');
  }
}