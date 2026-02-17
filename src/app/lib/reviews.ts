'use server'

import { z } from 'zod';
import prisma from '../db/db'; 
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth'; // Now active!

const ReviewSchema = z.object({
  stars: z.coerce.number().min(1).max(5),
  comment: z.string().min(5, { message: "The comment must be more detailed." }),
  productId: z.coerce.number(),
});

export async function createReview(prevState: any, formData: FormData) {
  try {
    // 1. Check if the user is authenticated
    const session = await auth();

    if (!session || !session.user?.email) {
        return { message: 'You must be logged in to leave a review.' };
    }

    // 2. Find the logged-in user in the database
    const user = await prisma.user.findUnique({
        where: { email: session.user.email }
    });

    if (!user) {
        return { message: 'Error: User account not found.' };
    }

    // 3. Validate form data
    const validatedFields = ReviewSchema.safeParse({
      stars: formData.get('stars'),
      comment: formData.get('comment'),
      productId: formData.get('productId'),
    });

    if (!validatedFields.success) {
      return { message: 'Please select a star rating and write a comment.' };
    }

    const { stars, comment, productId } = validatedFields.data;

    // 4. Create the review using the real user's public_id
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