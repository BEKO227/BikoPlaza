'use client'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ClearCart, getCartData, RemoveProduct, UpdateProductQuantity } from "@/CartAction/CartAction"
import { useContext, useEffect, useState } from "react"
import { cart, CartData } from "@/types/cartdata.type"
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import Loading from './../../_components/loading/loading';
import { toast } from "sonner"
import { CountContext } from "@/app/CountProvider"
import { useRouter } from "next/navigation"
import  Link  from 'next/link';

export default  function Cart() {
    const Route = useRouter()
    const context = useContext(CountContext);
  
    if (!context) return null; 
    const { count , setcount } = context;

  const [currentId , setcurrentId]=useState<string>()
  const [countdisabled , setcountdisabled]=useState(false)
  const [cartloading , setcartloading]=useState(true)
  const [countloading , setcounttloading]=useState(false)

  const [cart , SetCart]=useState<cart>()
  const [generaldata ,setgeneraldata ] = useState<CartData>()
  useEffect(()=>{getAllCartdata()},[])

  async function getAllCartdata(){
    setcartloading(true)
   const data:CartData =  await getCartData()
   SetCart(data.data)
   setgeneraldata(data)
   setcartloading(false)
  }

  async function deleteproduct(id:string){
    const data = await RemoveProduct(id)
    if(data.status == 'success'){
      toast.success('Item Deleted Successfully',{position:"top-center"})
      SetCart(data.data)
      let sum = 0;
      data.data.products.forEach((item:{count:number}) => {
        sum += item.count;
      });
      setcount(sum);
    }else{
      toast.error('Please wait ! Something went wrong')
    }
  }

  async function ClearCartData(){
    const data = await ClearCart()
    if (data.message=='success'){
      toast.success("Cart Cleared successfully")
      getAllCartdata()
      setcount(0)
    }else{
      toast.error(data.message)
    }
    
  }
  async function UpdateQuantity(id:string,count:number) {
    setcurrentId(id)
    setcounttloading(true)
    setcountdisabled(true)
    const data = await UpdateProductQuantity(id , count)
    if(data.status == 'success'){
      SetCart(data.data)
      let sum = 0;
      data.data.products.forEach((item:{count:number}) => {
        sum += item.count;
      });
      setcount(sum);
    }
    setcounttloading(false)
    setcountdisabled(false)
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">

      <h2 className="text-2xl font-bold text-orange-500"><span className="text-blue-950">Your Cart have</span> {generaldata?.numOfCartItems} items</h2>
      <Button onClick={()=>ClearCartData()} className="bg-orange-500 hover:bg-red-700 rounded-xl cursor-pointer">Clear Cart 🗑️</Button>      

      {cartloading?
      <>
            <Loading/>
      </>
      :
      <>
            <div className="space-y-4">
        {cart?.products.map((item)=>{
          return       <div key={item._id}
          className="flex items-center justify-between p-4 bg-white roundatexl shadow"
        >
          {/* Left: Image + Info */}
          <div className="flex items-center gap-4">
            <img
              src={item.product.imageCover}
              alt={item.product.title}
              className="w-20 h-20 object-cover rounded-xl"
            />
            <div>
              <h3 className="font-semibold text-blue-950">{item.product.title.split(" ").slice(0, 2).join(" ")}</h3>
              <p className="text-orange-500">{item.price}EGP</p>
            </div>
          </div>
    
          {/* Middle: Quantity */}
          <div className="flex items-center gap-2">
                <Button disabled={countdisabled} onClick={()=>UpdateQuantity(item.product.id,item.count-=1)} variant="outline" size="icon" className="rounded-full h-7 w-7 cursor-pointer">
                  {item.count==1?
                  <>
                  <Trash2 className="h-4 w-4" />
                  </>
                  :
                  <>
                    <Minus className="h-4 w-4" />
                  </>
                  }
                  </Button>
                  {countloading && currentId==item.product.id?
                  <>
                  <div role="status">
                      <svg aria-hidden="true" className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                      </svg>
                  </div>
                  </>
                  :
                  <span className="w-6 text-center">{item.count}</span>
                  }
                  <Button disabled={countdisabled} onClick={()=>UpdateQuantity(item.product.id,item.count+=1)} variant="outline" size="icon" className="rounded-full h-7 w-7 cursor-pointer">
                    <Plus className="h-4 w-4" />
                  </Button>
          </div>
    
          {/* Right: Delete */}
          <Button disabled={countdisabled} onClick={()=>deleteproduct(item.product._id)} variant="ghost" size="icon" className=" border border-red-500 text-red-500 hover:text-red-700 cursor-pointer">
              <Trash2 className="h-5 w-5" />
          </Button>
          </div>
        })}
      </div>

      <Card className="p-4 rounded-2xl shadow-md space-y-3">
        <div className="flex justify-between text-lg font-bold border-t pt-2">
          <span>Total</span>
          <span>{cart?.totalCartPrice} EGP</span>
        </div>
        <Button className="bg-orange-500 hover:bg-white hover:text-blue-950 w-full mt-3 text-lg py-6 rounded-xl">
          <Link href={"/checkoutSession/"+ cart?._id } >CheckOut Session</Link>
        </Button>
        <Button onClick={()=>Route.push('/')} variant="ghost" className="bg-blue-950 w-full text-white">
          Continue Shopping
        </Button>
      </Card>
      </>
      }
    </div>
  )
}
