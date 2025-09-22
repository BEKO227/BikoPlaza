'use client'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Form} from '@/components/ui/form'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { toast } from "sonner"
import { useRouter } from 'next/navigation';

export default function ResetPassword() {
  const Route =   useRouter();
  const SchemaResetPassword = z.object({
    email: z.email().nonempty({ message: "Invalid email address." }),
    newPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." })
      .regex(/^(?=.*[A-Za-z])(?=.*\d).{6,}$/, {
        message:
          "Password must contain at least one letter, one number, and can include special characters.",
      }),
     })
  const ResetPasswordForm = useForm<z.infer<typeof SchemaResetPassword>>({
    defaultValues: {
      email: '',
      newPassword: '',
    },
    resolver: zodResolver(SchemaResetPassword),
  })
  async function handleResetPassword(values: z.infer<typeof SchemaResetPassword>) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/resetPassword`, {
      method: 'PUT',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json();
    console.log(data);
    if(data.token){
      ResetPasswordForm.reset();
      toast.success('Reset Passowrd Done successfully!',{position:"top-center"});
      Route.push('/Login');
    } else {
      toast.error(data.message || 'ResetPassword failed. Please try again.',{position:"top-center"});
    }
  }
  return (
    <>
    <div className='w-3/4 md:w-1/3 mx-auto m-5 p-6 border border-gray-300 rounded-lg shadow-2xl'>
    <h1 className='text-blue-950 flex font-extrabold justify-center'>Log<span className='text-orange-500'>In</span></h1>
      <Form {...ResetPasswordForm}>
        <form onSubmit={ResetPasswordForm.handleSubmit(handleResetPassword)}>
        <FormField
          control={ResetPasswordForm.control}
          name="email"
          render={({ field })  => (
            <FormItem>
              <FormLabel className='text-blue-950 m-2'>Enter Your Email</FormLabel>
              <FormControl>
                <Input type="text" {...field} placeholder='E mail'  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent mb-2' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
          control={ResetPasswordForm.control}
          name="newPassword"
          render={({ field })  => (
            <FormItem>
              <FormLabel className='text-blue-950 m-2'>Enter Your New Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} placeholder='Password'  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent mb-2' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {
            ResetPasswordForm.formState.isSubmitting ? (
                <Button disabled className='w-full bg-orange-500 cursor-pointer text-white py-2 px-4 rounded-md hover:bg-orange-600'>
                Reseting...
                </Button>
            ) : (
                <Button type="submit" className='w-full bg-orange-500 cursor-pointer text-white py-2 px-4 rounded-md hover:bg-orange-600'>
                Reset Password
                </Button>
            )
        }
        </form>
      </Form>
    </div>
    </>
  )
}
