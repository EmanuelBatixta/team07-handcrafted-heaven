'use server'
 
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
 
// ...
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
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

export async function signup( prevState: string | undefined,
formData: FormData ){
  try{
    //const data = Object.fromEntries(formData.entries())
    const result = await fetch(`${process.env.BASE_URL || 'https://handcrafted-heaven-team07.vercel.app/'}/api/users/`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(formData)})

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