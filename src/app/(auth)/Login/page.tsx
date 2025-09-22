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
import Link from 'next/link';

export default function Login() {
  const Route =   useRouter();
  const SchemaLogin = z.object({
    email: z.email().nonempty({ message: "Invalid email address." }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." })
      .regex(/^(?=.*[A-Za-z])(?=.*\d).{6,}$/, {
        message:
          "Password must contain at least one letter, one number, and can include special characters.",
      }),
     })
  const loginForm = useForm<z.infer<typeof SchemaLogin>>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(SchemaLogin),
  })
  async function handleLogin(values: z.infer<typeof SchemaLogin>) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signin`, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json();
    console.log(data);
    if(data.message === 'success'){
      loginForm.reset();
      toast.success('Welcome Back!',{position:"top-center"});
      Route.push('/');
    } else {
      toast.error(data.message || 'login failed. Please try again.',{position:"top-center"});
    }
  }
  return (
    <>
    <div className='w-3/4 md:w-1/3 mx-auto m-5 p-6 border border-gray-300 rounded-lg shadow-2xl'>
    <h1 className='text-blue-950 flex font-extrabold justify-center'>Log<span className='text-orange-500'>In</span></h1>
      <Form {...loginForm}>
        <form onSubmit={loginForm.handleSubmit(handleLogin)}>
        <FormField
          control={loginForm.control}
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
          control={loginForm.control}
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
          <Button className='w-full bg-orange-500 cursor-pointer'>Log in</Button>
          <div className="flex justify-between mt-4 text-sm">
            <Link href="/register" className="text-blue-900">
            Don&apos;t have an account? <span className="text-orange-500">Register</span>
            </Link>
            <Link href="/ForgotPassword" className="text-blue-900">
              Forgot Password?
            </Link>
          </div>
        </form>
      </Form>
    </div>
    </>
  )
}
