import * as z from 'zod'

export type Product = {
  image_link: string;
  category: string;
  id: string;
  price: number;
  userPublic_id: string;
  description: string;
  name: string;
};

export type Review = {
  stars: number;
  comment: string;
  id: string;
  productId: string;
  userPublic_id: string;
}

export const userSchema = z.object({
    name: z.string().min(2,{error: 'Name must be least 2 characters long'}).trim(),
    email: z.email({error: 'Please, enter a valid email'}).trim(),
    password: z
        .string()
        .min(8, { error: 'Be at least 8 characters long' })
        .regex(/[a-zA-Z]/, { error: 'Contain at least one letter.' })
        .regex(/[0-9]/, { error: 'Contain at least one number.' })
        .regex(/[^a-zA-Z0-9]/, {
      error: 'Contain at least one special character.',
    })
        .trim()
        
})

export const reviewSchema = z.object({
    stars: z.int().min(1).max(5),
    comment: z.string(),
    productId: z.string(),
    userPrivate_id: z.string(),
})


export type FormState =
  | {
      errors?: {
        name?: string[]
        email?: string[]
        password?: string[]
      }
      values?: { 
        name?: string 
        email?: string 
        password?: string 
      }
      message?: string
    }
  | undefined  

export   type SessionPayload = {
  sub: string;       
  email?: string;
  name?: string;
  expiresAt?: Date; 
  exp?: number;    
}
