import 'server-only'
 
import { cookies } from 'next/headers'
import { decrypt } from '@/app/lib/session'
import { redirect } from 'next/navigation'
import { cache } from 'react'
import prisma from '../db/db'
 
export const verifySession = cache(async () => {
  try {
    const cookie = (await cookies()).get('session')?.value
    const session = await decrypt(cookie)
    
    if (!session?.sub) {
      return { isAuth: false, user: null}
      //redirect('/login')
    }
  
    const user = await prisma.user.findUnique({where: { public_id: session?.sub }, omit: {password: true}})
   
    return { isAuth: true, user: user }

  } catch (error) {
    console.error('Error verfying session: ', error)
  }
})