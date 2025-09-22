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

export default function Forgotpassword() {
  const Route =   useRouter();
  const SchemaForgotPassword = z.object({
    email: z.email().nonempty({ message: "Invalid email address." }),
     })
  const ForgotPasswordForm = useForm<z.infer<typeof SchemaForgotPassword>>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(SchemaForgotPassword),
  })
  async function hanldeForgotPassword(values: z.infer<typeof SchemaForgotPassword>) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/forgotPasswords`, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json();
    console.log(data);
    if(data.statusMsg === 'success'){
      ForgotPasswordForm.reset();
      toast.success('Code Sent Succesfully!',{position:"top-center"});
      Route.push('/EnterCode');
    } else {
      toast.error(data.message || 'login failed. Please try again.',{position:"top-center"});
    }
  }
  return (
    <>
    <div className='w-3/4 md:w-1/3 mx-auto m-5 p-6 border border-gray-300 rounded-lg shadow-2xl'>
    <h1 className='text-blue-950 flex font-extrabold justify-center'>Forgot<span className='text-orange-500'>Password</span></h1>
      <Form {...ForgotPasswordForm}>
        <form onSubmit={ForgotPasswordForm.handleSubmit(hanldeForgotPassword)}>
        <FormField
          control={ForgotPasswordForm.control}
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
          
          <Button className='w-full bg-orange-500 cursor-pointer my-2'>Send Code</Button>
            <Link href="/Login" className="text-blue-900 text-sm">
              Back to ...<span className="text-orange-500">Login</span>
            </Link>
        </form>
      </Form>
    </div>
    </>
  )
}
