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
import Link from 'next/link';

export default function Register() {
  const Route =   useRouter();
  const SchemaRegister = z.object({
    name: z.string().nonempty().min(2, { message: "Name must be at least 2 characters." }),
    email: z.email().nonempty({ message: "Invalid email address." }),
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
    phone: z.string().min(11, { message: "Phone number must be at least 11 digits." }).regex(/^01[0125][0-9]{8}$/,"enter valid Egyptian phone number"),
  }).refine((obj) => {
     return obj.password === obj.rePassword}, 
     {
      path: ["rePassword"],
      error: "Confirm Password don't match",
  });
  const RegisterForm = useForm<z.infer<typeof SchemaRegister>>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
    resolver: zodResolver(SchemaRegister),
  })
  async function handleRegister(values: z.infer<typeof SchemaRegister>) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup`, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json();
    console.log(data);
    if(data.message === 'success'){
      RegisterForm.reset();
      toast.success('Registration successful! Please log in.',{position:"top-center"});
      Route.push('/Login');
    } else {
      toast.error(data.message || 'Registration failed. Please try again.',{position:"top-center"});
    }
  }
  return (
    <>
    <div className='w-3/4 md:w-1/3 mx-auto m-5 p-6 border border-gray-300 rounded-lg shadow-2xl'>
    <h1 className='text-blue-950 flex font-extrabold justify-center'>Register<span className='text-orange-500'> Now</span></h1>
      <Form {...RegisterForm}>
        <form onSubmit={RegisterForm.handleSubmit(handleRegister)}>
        <FormField
          control={RegisterForm.control}
          name="name"
          render={({ field })  => (
            <FormItem>
              <FormLabel className='text-blue-950 m-2'>Enter Your Name</FormLabel>
              <FormControl>
                <Input type="text" {...field} placeholder='Name'  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent' />
              </FormControl>
              <FormDescription className='mb-2'>This the name which will be displayed on Orders</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={RegisterForm.control}
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
          control={RegisterForm.control}
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
          control={RegisterForm.control}
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
          <FormField
          control={RegisterForm.control}
          name="phone"
          render={({ field })  => (
            <FormItem>
              <FormLabel className='text-blue-950 m-2'>Enter Your Phone No.</FormLabel>
              <FormControl>
                <Input type="tel" {...field} placeholder='Phone Number'  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent mb-2' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
          <Button className='w-full bg-orange-500 cursor-pointer my-2'>Register</Button>
          <Link href="/Login" className="text-blue-900 text-sm"> Already have an account? <span className="text-orange-500">Login</span></Link>
        </form>
      </Form>
    </div>
    </>
  )
}
