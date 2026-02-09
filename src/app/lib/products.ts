import postgres from 'postgres';
import { Product } from './definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchProducts(): Promise<Product[]> {
    try {
        const products = await sql<Product[]>`SELECT * FROM "Product"`;

        return products; 
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch all products.');
    }
}