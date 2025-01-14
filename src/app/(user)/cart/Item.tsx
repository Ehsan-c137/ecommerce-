import { Icons } from "@/components/Icons/icons"
import Image from "next/image"
import { useState } from "react"

interface IProps {
   handleCart: (
      id: string,
      count: number,
      colors: string,
      sizes: string
   ) => void
   item: {
      data: {
         id: string
         main_image: string
         name: string
         price: number | string
         remaining: number
      }
      count: number
      colors: string
      sizes: string
   }
}
export default function Item({ item, handleCart }: IProps) {
   const [count, setCount] = useState(item.count)
   const { remaining } = item.data
   const handleDeleteFromCart = () => {
      handleCart(item.data.id, 0, item.colors, item.sizes)
   }

   return (
      <div className="flex gap-4 items-center">
         <div className="w-[134px] h-[134px] bg-white-100 flex items-center justify-center relative">
            <div className="absolute top-0 right-0 bg-white-200 md:hidden">
               <Icons.X />
            </div>
            <Image
               src={item.data.main_image}
               alt={item.data.name}
               width={100}
               height={134}
               sizes="100vw"
               objectFit="cover"
            />
         </div>
         <div className="flex flex-col md:flex-row gap-2 py-1 h-[134px]">
            <div className="flex flex-row flex-wrap md:flex-row items-center gap-2">
               <p className="text-titleActive">{item.data.name}</p>
               <p className="text-label">
                  Color: {item.colors} — Size: {item.sizes}
               </p>
            </div>
            <div className="flex items-center gap-8">
               <div className="flex items-center gap-2">
                  <button
                     className="h-[24px] w-[24px] border rounded-full flex items-center justify-center p-1"
                     onClick={() => {
                        setCount(count - 1)
                        handleCart(
                           item.data.id,
                           count - 1,
                           item.colors,
                           item.sizes
                        )
                     }}
                     disabled={count == 1}
                  >
                     <Icons.Minus />
                  </button>

                  <p className="h-[24px] w-[24px] text-center  flex justify-center items-center">
                     {count}
                  </p>
                  <button
                     className="h-[24px] w-[24px] border rounded-full flex items-center justify-center p-1"
                     onClick={() => {
                        setCount(count + 1)
                        handleCart(
                           item.data.id,
                           count + 1,
                           item.colors,
                           item.sizes
                        )
                     }}
                     disabled={count == remaining}
                  >
                     <Icons.Plus />
                  </button>
               </div>
            </div>
            <p className="text-secondary font-medium text-base text-nowrap ">
               $ {item?.data.price}
            </p>
         </div>
         <div
            className="h-10 w-10 cursor-pointer items-center justify-center bg-white-100 rounded-md hidden md:flex"
            onClick={handleDeleteFromCart}
         >
            <Icons.X />
         </div>
      </div>
   )
}
