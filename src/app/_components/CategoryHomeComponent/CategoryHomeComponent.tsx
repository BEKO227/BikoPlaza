'use client'
import Loading from '@/app/_components/loading/loading'
import { Datum } from '@/types/brands'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function CategoryHomeComponent() {
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
      setCategories(data.data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  useEffect(() => {
    getAllCategories()
  }, [])

  return (
    <div className="container mx-auto px-10 py-10">

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-0 justify-items-center">
        {categories.length > 0 ? (
          categories.map((cat) => (
            <Link
              key={cat._id}
              href={`/categories/${cat.slug}`}
              className="relative w-full h-48 overflow-hidden group"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-none group-hover:scale-105 transition-transform duration-300"
              />

              {/* Overlay text */}
              <div className="absolute bottom-2 left-2 bg-black/60 text-white text-sm font-semibold px-2 py-1 rounded">
                {cat.name}
              </div>
            </Link>
          ))
        ) : (
          <Loading />
        )}
      </div>
    </div>
  )
}
