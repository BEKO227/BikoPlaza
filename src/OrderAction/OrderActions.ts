'use server'

import { getUserToken } from "@/getUserToken"

 export async function CheckoutPayment(cartId:string , shippingData:{details:string,phone:string,city:string}){
    const token:any = await getUserToken()
    if (token){
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/checkout-session/${cartId}?url=${process.env.NEXT_PUBLIC_URL}`,{
            method : 'POST',
            body : JSON.stringify({
                "shippingAddress":shippingData
            }),

            headers:{
                'content-type':"application/json",
                 token : token
            }
        })
        const data = await res.json()
        return data
    }
}