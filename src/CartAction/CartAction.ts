'use server'
import { getUserToken } from "@/getUserToken";
import { CartData } from "@/types/cartdata.type";

export async function getCartData(){
    let token : any = await getUserToken()
    if (!token){
        throw new Error('token error')
    }
    let res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`,{
        headers:{
            token: token
        }
    })
    const data:CartData = await res.json()
    return data
}
export async function AddproductCart(id:string){
    const token : any = await getUserToken()
    if (!token){
        throw new Error('token error')
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`,{
        method:"post",
        body: JSON.stringify({
            productId: id
        }),
        headers:{
            token:token,
            'content-type':'application/json'
        }
    })
    const data = await res.json()
    return data
}
export async function RemoveProduct(id:string){
    const token : any = await getUserToken()
    if (!token){
         throw new Error('token error')
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/${id}`,{
        method:"Delete",
        headers:{
            token : token
        }
    })
    const data = await res.json()
    return data
}
export async function ClearCart(){
    const token : any = await getUserToken()
    if (!token){
         throw new Error('token error')
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`,{
        method : 'Delete',
        headers:{
            token : token
        }
    })
    const data = await res.json()
    return data

}
export async function UpdateProductQuantity(id:string , count:number){
    let token : any = await getUserToken()
    if (!token){
        throw new Error('token error')
    }
    let res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/${id}`,{
        method:'Put',
        body: JSON.stringify({
            count:count
        }),
        headers:{
            token: token,
            'content-type':'application/json'

        }
    })
    const data:CartData = await res.json()
    return data

}