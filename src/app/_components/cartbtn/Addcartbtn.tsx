'use client'
import { CountContext } from '@/app/CountProvider'
import { AddproductCart } from '@/CartAction/CartAction'
import { Button } from '@/components/ui/button'
import React, { useContext } from 'react'
import { toast } from 'sonner'

export default function Addcartbtn({ id }: {id:string}) {
  const context = useContext(CountContext);
    
      if (!context) return null; // safety check if provider missing
      const { count , setcount } = context;
  async function addproduct(id:string){
    const data = await AddproductCart(id)
    if(data.status=='success'){ 
      toast.success(data.message,{position:"top-center"})
      let sum = 0;
      data.data.products.forEach((item:{count:number}) => {
        sum += item.count;
      });
      setcount(sum);    
  }else{
    toast.error("something went wrong" ,{position:"top-center"})
  }
  }

  return (
    <div>
    <Button  onClick={()=>addproduct(id)} className="px-4 py-2 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors cursor-pointer">Add to cart</Button>
    </div>
  )
}
