'use server'

import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from '../auth.config';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import prisma from '@/app/db/db';
import { FormState, userSchema } from './app/lib/definitions';
import { createSession, deleteSession } from './app/lib/session';
import { redirect } from 'next/navigation';
 
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
          if (passwordsMatch) {
            await createSession(user.public_id)
             return user;
          }
        }
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
  
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }
  try{
    //@ts-ignore
    const { name, email, password } = validatedFields.data
    if (await prisma.user.findUnique({where: {email: validatedFields.data.email}})){ return { errors: {email: ['This email is already in use']}, values: {name, email}}}
    const saltRounds = 10
    const hashedpass = await bcrypt.hash(password, saltRounds)

    const user = await prisma.user.create({data: {name: name, email: email, password: hashedpass}})

    if(!user) { return {message: 'An error occurred while creating your account.'}}

    await createSession(user.public_id)
    redirect('/product-list')
  } catch(error) {
    return {message: 'An unexpected error ocurred. please try again later'}
  }
}

export async function logout() {
  await deleteSession()
  await signOut()
  redirect('/login')
}