"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {Form,FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useParams } from "next/navigation"
import { CheckoutPayment } from "@/OrderAction/OrderActions"
import { toast } from "sonner"


const checkoutSchema = z.object({
  details: z.string().min(5, { message: "Please enter your order details" }),
  phone: z.string().regex(/^01[0-9]{9}$/, { message: "Enter a valid Egyptian phone number" }),
  city: z.string().min(2, { message: "City is required" }),
})

export default function CheckoutForm() {
  const { cartId } : {cartId:string} =  useParams()
 
  const form = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
  })

  async function checkoutsessionPayment(values:{details:string,phone:string,city:string}) {
    console.log("Checkout Data:", values)
    const data = await CheckoutPayment( cartId , values)
    if (data.status === "success") {
      console.log(data)
      toast.success("Checkout session created successfully")
      if (data.session?.url) {
        window.location.href = data.session.url
      }
    } else {
      toast.error(data.message || "Something went wrong with checkout")
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(checkoutsessionPayment)}
        className="space-y-6 p-4 max-w-md mx-auto"
      >

        <FormField
          control={form.control}
          name="details"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Details</FormLabel>
              <FormControl>
                <Input placeholder="Enter order details" {...field} />
              </FormControl>
              <FormDescription>Extra information about your order.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="01010700999" {...field} />
              </FormControl>
              <FormDescription>Enter your phone number.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="Cairo" {...field} />
              </FormControl>
              <FormDescription>Your delivery city.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full bg-orange-500 text-white">
          Checkout
        </Button>
      </form>
    </Form>
  )
}
