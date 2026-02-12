"use server"

import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from '../auth.config';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import prisma from '@/app/db/db';
import { userSchema, FormState } from '@/app/lib/definitions'
import { redirect } from 'next/navigation'
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.email(), password: z.string().min(6) })
          .safeParse(credentials);
 
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await prisma.user.findUnique({where: {email: email}});
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password)
          if (passwordsMatch) return user;
        }
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});
 
export async function signup(state: FormState, formData: FormData) {
  const validatedFields = userSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  })
  //@ts-ignore
  const { name, email, password } = validatedFields.data
  const saltRounds = 10
  const hashedpass = await bcrypt.hash(password, saltRounds)
  
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }
  if (await prisma.user.findUnique({where: {email: validatedFields.data.email}})){ return { message: 'This email is already in use'}}

  const user = await prisma.user.create({data: {name: validatedFields.data.name, email: validatedFields.data.email, password: hashedpass}})

  if(!user) { return {message: 'An error occurred while creating your account.',}}

  redirect('/product-list')
}