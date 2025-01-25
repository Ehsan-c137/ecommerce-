"use client"

import Products from "./Products"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { getAllCategory } from "@/services/store/category/category"
import { useCallback } from "react"
import products from "@/services/store/product/products"
import {
   FilterSection,
   PriceFilter,
   ColorFilter,
   SizeFilter,
} from "@/components/Filter"

export default function Filters() {
   const searchParams = useSearchParams()
   const pathname = usePathname()
   const router = useRouter()

   const { data: categories, isLoading: categoriesLoading } = useQuery({
      queryKey: ["categories"],
      queryFn: () => getAllCategory(),
   })

   const { data: allProducts, isLoading: productsLoading } = useQuery({
      queryKey: ["allproducts"],
      queryFn: () => products(2, 1),
   })

   const colors = allProducts
      ?.flatMap((product: TProduct) => product.options.colors)
      .filter(
         (color: string, index: number, self: string[]) =>
            self.indexOf(color) === index
      )

   const sizes = allProducts
      ?.flatMap((product: TProduct) => product.options.sizes)
      .map((item: string) => item.toLowerCase())
      .filter(
         (color: string, index: number, self: string[]) =>
            self.indexOf(color) === index
      )

   const minPrice = allProducts?.reduce(
      (min: number, item: { price: number }) => Math.min(min, item.price),
      allProducts[0]?.price
   )

   const maxPrice = allProducts?.reduce(
      (max: number, item: { price: number }) => Math.max(max, item.price),
      allProducts[0]?.price
   )

   const handleQueryParams = useCallback(
      (name: string, value: string) => {
         const current = new URLSearchParams(Array.from(searchParams.entries()))
         const currentQuery = current.getAll(name)

         if (currentQuery.includes(value)) {
            current.delete(name, value)
         } else {
            current.append(name, value)
         }

         const search = current.toString()

         router.push(`${pathname}${search ? `?${search}` : ""}`)
      },
      [router, searchParams, pathname]
   )

   const handleSetMinPrice = (min: number) => {
      if (min > minPrice) {
         const current = new URLSearchParams(Array.from(searchParams.entries()))
         current.set("min price", `${min}`)
         const search = current.toString()
         router.push(`${pathname}${search ? `?${search}` : ""}`)
      } else {
         const current = new URLSearchParams(Array.from(searchParams.entries()))
         current.delete("min price")
         const search = current.toString()
         router.push(`${pathname}${search ? `?${search}` : ""}`)
      }
   }

   const handleSetMaxPrice = (max: number) => {
      if (max <= maxPrice) {
         const current = new URLSearchParams(Array.from(searchParams.entries()))
         current.set("max price", `${max}`)
         const search = current.toString()
         router.push(`${pathname}${search ? `?${search}` : ""}`)
      } else {
         const current = new URLSearchParams(Array.from(searchParams.entries()))
         current.delete("max price")
         const search = current.toString()
         router.push(`${pathname}${search ? `?${search}` : ""}`)
      }
   }

   return (
      <>
         <div className="hidden sm:flex flex-col gap-6 border border-neutral-100 rounded-sm w-[248px] sticky top-[--header-height] pb-14 left-0 h-fit">
            <FilterSection
               title="Categories"
               isLoading={categoriesLoading}
               items={categories}
               paramName="category"
               onSelect={handleQueryParams}
               searchParams={searchParams}
            />

            <ColorFilter
               colors={colors}
               searchParams={searchParams}
               onSelect={handleQueryParams}
            />

            <SizeFilter
               sizes={sizes}
               searchParams={searchParams}
               onSelect={handleQueryParams}
            />

            <PriceFilter
               minPrice={minPrice}
               maxPrice={maxPrice}
               isLoading={productsLoading}
               searchParams={searchParams}
               onSelect={handleQueryParams}
            />
         </div>

         <div className="flex flex-col gap-1 w-full">
            <Products
               minPrice={searchParams.get("min price") ?? minPrice}
               maxPrice={searchParams.get("max price") ?? maxPrice}
            />
         </div>
      </>
   )
}
