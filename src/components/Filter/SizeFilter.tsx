import { FilterProps } from "@/types/types"

interface SizeFilterProps extends FilterProps {
   sizes: string[]
}

export function SizeFilter({ sizes, searchParams, onSelect }: SizeFilterProps) {
   return (
      <div className="flex flex-col gap-4 px-4">
         <p className="text-neutral-900 font-medium">Size</p>
         <div className="flex items-center flex-wrap gap-3 text-sm">
            {sizes?.map((size) => {
               const isChecked = searchParams.getAll("size")?.includes(size)
               return (
                  <div key={size} className="flex items-center">
                     <label
                        style={{
                           borderColor: isChecked ? "black" : "#e6e7e8",
                        }}
                        htmlFor={`${size}--size`}
                        className="flex items-center justify-center w-10 h-10 rounded-md cursor-pointer border border-neutral-100 transition"
                     >
                        {size}
                     </label>
                     <input
                        type="checkbox"
                        value={size}
                        id={`${size}--size`}
                        className="hidden"
                        checked={isChecked}
                        onChange={(e) => onSelect("size", e.target.value)}
                     />
                  </div>
               )
            })}
         </div>
      </div>
   )
}
