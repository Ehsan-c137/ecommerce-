import DoubleRangePicker from "@/components/UI/DubleRangePicker/DoubleRangePicker"
import { PriceFilterProps } from "@/types/types"

export function PriceFilter({
   minPrice,
   maxPrice,
   isLoading,
   handleSetMinPrice,
   handleSetMaxPrice,
}: PriceFilterProps) {
   return (
      <div className="flex flex-col gap-2 px-4">
         <p className="text-neutral-900 font-medium">Price</p>
         {isLoading ? (
            <div className="h-[58px] w-full animate-pulse bg-white-200 rounded-sm"></div>
         ) : (
            <DoubleRangePicker
               min={minPrice}
               max={maxPrice}
               setMaxPrice={handleSetMaxPrice}
               setMinPrice={handleSetMinPrice}
            />
         )}
      </div>
   )
}
