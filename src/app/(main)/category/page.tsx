'use client'
import { Datum } from '@/types/brands'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function Category() {
  const [categories, setCategories] = useState<Datum[]>([])

  async function getAllCategories() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()
      console.log(data)
      setCategories(data.data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  useEffect(() => {
    getAllCategories()
  }, [])

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-orange-500">
        <span className='text-blue-950'>Shop by</span> Category
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {categories.length > 0 ? (
          categories.map((cat) => (
            <Link
              key={cat._id}
              href={`/categories/${cat.slug}`}
              className="block bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition"
            >
              <div className="relative w-full h-40">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-3 text-center">
                <h2 className="font-semibold text-gray-700">{cat.name}</h2>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">Loading categories...</p>
        )}
      </div>
    </div>
  )
}
