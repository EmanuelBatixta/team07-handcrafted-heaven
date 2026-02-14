import 'server-only'
 
import { cookies } from 'next/headers'
import { decrypt } from '@/app/lib/session'
import { redirect } from 'next/navigation'
import { cache } from 'react'
import prisma from '../db/db'
 
export const verifySession = cache(async () => {
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)
  
  if (!session?.sub) {
    redirect('/login')
  }

  const user = await prisma.user.findUnique({where: { public_id: session?.sub }, omit: {password: true}})
 
  return { isAuth: true, user: user }
})