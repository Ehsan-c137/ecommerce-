"use client"
import DoubleRangePicker from "@/components/UI/DubleRangePicker/DoubleRangePicker"
import Products from "./Products"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import getAllCategory from "@/services/store/category/getAllCategory"
import { useCallback } from "react"
import products from "@/services/store/product/products"

export default function Filters() {
   const searchParams = useSearchParams()
   const pathname = usePathname()
   const router = useRouter()

   const sizes = ["S", "M", "L", "XL", "XXL"]
   const colors = ["yellow", "red", "blue", "black", "white"]

   const { data: categories, isLoading } = useQuery({
      queryKey: ["categories"],
      queryFn: () => getAllCategory(),
      refetchOnWindowFocus: false,
   })

   const { data: allProducts, isLoading: allProductLoading } = useQuery({
      queryKey: ["allproducts"],
      queryFn: () => products(2, 1),
      refetchOnWindowFocus: false,
   })

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
         <div className="hidden sm:flex flex-col gap-6 border border-neutral-100 rounded-md w-[248px] sticky top-[--header-height] pb-14 left-0 h-fit">
            <div className="flex flex-col gap-2 px-4 pt-6 ">
               <p className="text-neutral-900 font-medium">Categories</p>
               <div>
                  <div className="flex flex-col text-nowrap">
                     {isLoading && (
                        <div className="w-full bg-white-200 animate-pulse h-10 rounded-md"></div>
                     )}
                     {categories?.map((data: { name: string }) => {
                        const item = data.name
                        const isChecked = searchParams
                           .getAll("category")
                           ?.includes(item)

                        return (
                           <div
                              className="flex items-center py-3 px-1 border-b border-neutral-200"
                              key={item}
                           >
                              <input
                                 id={item + "-checkbox"}
                                 type="checkbox"
                                 value={item}
                                 checked={isChecked}
                                 onChange={(e) => {
                                    handleQueryParams(
                                       "category",
                                       e.target.value
                                    )
                                 }}
                                 className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              />
                              <label
                                 htmlFor={item + "-checkbox"}
                                 className="ms-2 text-sm font-medium text-neutral-700  w-full cursor-pointer"
                              >
                                 {item[0].toUpperCase() + item.slice(1)}
                              </label>
                           </div>
                        )
                     })}
                  </div>
               </div>
            </div>
            <div className="flex flex-col gap-4 px-4">
               <p className="text-neutral-900 font-medium">Color</p>
               <div className="flex items-center gap-3">
                  {colors.map((item) => {
                     const isChecked = searchParams
                        .getAll("color")
                        ?.includes(item)
                     return (
                        <div key={item} className="flex items-center">
                           <label
                              style={{
                                 border: "1px solid transparent",
                                 borderColor: isChecked
                                    ? "black"
                                    : "transparent",
                                 backgroundColor: item,
                              }}
                              htmlFor={`${item}--color`}
                              className={`w-7 h-7 rounded-full transition p-[3px] bg-clip-content bg-red-r200 borderp-[3px]  cursor-pointer`}
                           ></label>
                           <input
                              type="checkbox"
                              value={item}
                              id={`${item}--color`}
                              className="hidden"
                              checked={isChecked}
                              onChange={(e) => {
                                 handleQueryParams("color", e.target.value)
                              }}
                           />
                        </div>
                     )
                  })}
               </div>
            </div>
            <div className="flex flex-col gap-4 px-4">
               <p className="text-neutral-900 font-medium">Sized</p>
               <div className="flex items-center flex-wrap gap-3 text-sm">
                  {sizes.map((item) => {
                     const isChecked = searchParams
                        .getAll("size")
                        ?.includes(item)

                     return (
                        <div key={item} className="flex items-center">
                           <label
                              style={{
                                 borderColor: isChecked ? "black" : "#e6e7e8",
                              }}
                              htmlFor={`${item}--size`}
                              className="flex items-center justify-center w-10 h-10 rounded-md cursor-pointer border border-neutral-100 transition"
                           >
                              {item}
                           </label>
                           <input
                              type="checkbox"
                              value={item}
                              id={`${item}--size`}
                              className="hidden"
                              checked={isChecked}
                              onChange={(e) => {
                                 handleQueryParams("size", e.target.value)
                              }}
                           />
                        </div>
                     )
                  })}
               </div>
            </div>

            <div className="flex flex-col gap-4 px-4">
               <p className="text-neutral-900 font-medium">Price</p>
               {allProductLoading ? (
                  "loading"
               ) : (
                  <DoubleRangePicker
                     min={minPrice}
                     max={maxPrice}
                     setMaxPrice={handleSetMaxPrice}
                     setMinPrice={handleSetMinPrice}
                  />
               )}
            </div>
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
