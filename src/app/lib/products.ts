'use server'

import postgres from 'postgres';
import { Product } from './definitions';

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

