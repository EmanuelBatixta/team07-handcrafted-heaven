'use server'

import postgres from 'postgres';
import { Product } from './definitions';
import { z } from 'zod';
import prisma from '../db/db'; 
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth'; 

const ProductSchema = z.object({
  price: z.coerce.number().min(0.01),
  category: z.string().max(50),
  description: z.string().max(500),
  image_link: z.string().url(),
});

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchProducts(): Promise<Product[]> {
    try {
        const products = await sql`SELECT * FROM "Product"`;

        return products as unknown as Product[]; 
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch all products.');
    }
}

export async function fetchProduct(
  id: string
): Promise<Product | null> {
  if (!id) {
    return null;
  }

  try {
    const rows = await sql`
      SELECT *
      FROM "Product"
      WHERE id = ${id}
      LIMIT 1
    `;

    return (rows[0] as unknown as Product) ?? null;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch product.');
  }
}

export async function fetchProductRating(
  id: string
): Promise<number> {
  if (!id) {
    return 0;
  }

  try {
    const rows = await sql`
      SELECT AVG(stars)::int AS average
      FROM "Rating"
      WHERE "productId" = ${id}
    `;

    return rows[0]?.average ?? 0;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch product reviews.');
  }
}

export async function CreateProduct(prevState: any, formData: FormData) {
  try {
    const session = await auth();

    if (!session || !session.user?.email) {
        return { message: 'You must be logged in to create a product.' };
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email }
    });

    if (!user) {
        return { message: 'Error: User account not found.' };
    }

    const validatedFields = ProductSchema.safeParse({
      price: formData.get('price'),
      category: formData.get('category'),
      description: formData.get('description'),
      image_link: formData.get('image_link'),
    });

    if (!validatedFields.success) {
      return { message: 'Please enter all fields.' };
    }

    const { price, category, description, image_link } = validatedFields.data;

    await prisma.product.create({
      data: {
        price: price,
        category: category,
        description: description,
        image_link: image_link,
        userPublic_id: user.public_id,
      },
    });

    revalidatePath(`/product-list`);
    return { message: 'Success' };

  } catch (error) {
    console.error('Database Error:', error);
    return { message: 'Failed to connect to the database.' };
  }
}

