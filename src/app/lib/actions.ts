'use server'
 
//import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
 
// ...
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const { signIn } = await import('@/auth');

    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof Error) {
      return 'Invalid email or password.';
    }
    throw error;
  }
}

export async function signup( prevState: string | undefined,
formData: FormData ){
  try{
    const result = await fetch('/signup/api/users/', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(formData)})

    if (!result){
      throw new Error('Error to create user')
    }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid email or password. Verify your credentials and try again';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}