'use client'
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form} from '@/components/ui/form'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { toast } from "sonner"
import { useRouter } from 'next/navigation';

export default function ChangePassword() {
  const Route =   useRouter();
  const SchemaChangePassword = z.object({
    currentPassword: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." })
    .regex(/^(?=.*[A-Za-z])(?=.*\d).{6,}$/, {
      message:
        "Password must contain at least one letter, one number, and can include special characters.",
    }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." })
      .regex(/^(?=.*[A-Za-z])(?=.*\d).{6,}$/, {
        message:
          "Password must contain at least one letter, one number, and can include special characters.",
      }),
    rePassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." })
      .regex(/^(?=.*[A-Za-z])(?=.*\d).{6,}$/, {
        message:
          "Password must contain at least one letter, one number, and can include special characters.",
      }),
  }).refine((obj) => {
     return obj.password === obj.rePassword}, 
     {
      path: ["rePassword"],
      error: "Confirm Password don't match",
  });
  const ChangePasswordForm = useForm<z.infer<typeof SchemaChangePassword>>({
    defaultValues: {
      currentPassword: '',
      password: '',
      rePassword: '',
    },
    resolver: zodResolver(SchemaChangePassword),
  })
  async function handleChangePassword(values: z.infer<typeof SchemaChangePassword>) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users/changeMyPassword`, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json();
    console.log(data);
    if(data.message === 'success'){
      ChangePasswordForm.reset();
      toast.success('Change Password successful! Please log in.',{position:"top-center"});
      Route.push('/');
    } else {
      toast.error(data.message || 'Change Password failed. Please try again.',{position:"top-center"});
    }
  }
  return (
    <>
    <div className='w-3/4 md:w-1/3 mx-auto m-5 p-6 border border-gray-300 rounded-lg shadow-2xl'>
    <h1 className='text-blue-950 flex font-extrabold justify-center'>Change<span className='text-orange-500'> Password</span></h1>
      <Form {...ChangePasswordForm}>
        <form onSubmit={ChangePasswordForm.handleSubmit(handleChangePassword)}>
        <FormField
          control={ChangePasswordForm.control}
          name="currentPassword"
          render={({ field })  => (
            <FormItem>
              <FormLabel className='text-blue-950 m-2'>Enter Your Current Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} placeholder='Password'  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent mb-2' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
          control={ChangePasswordForm.control}
          name="password"
          render={({ field })  => (
            <FormItem>
              <FormLabel className='text-blue-950 m-2'>Enter Your Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} placeholder='Password'  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent mb-2' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={ChangePasswordForm.control}
          name="rePassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-blue-950 m-2'>Confirm Your Passowrd</FormLabel>
              <FormControl>
                <Input type="password" {...field} placeholder='Confirm Password'  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent mb-2' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
          <Button className='w-full bg-orange-500 cursor-pointer my-2'>Change Password</Button>
        </form>
      </Form>
    </div>
    </>
  )
}
