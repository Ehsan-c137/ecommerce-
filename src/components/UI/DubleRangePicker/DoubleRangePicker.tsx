"use client"

import React, { useCallback, useEffect, useState, useRef } from "react"
import "./DoubleRangePicker.css"
import { useSearchParams } from "next/navigation"

interface IProps {
   min: number
   max: number
   setMaxPrice: (value: number) => void
   setMinPrice: (value: number) => void
}

function DoubleRangePicker({ min, max, setMaxPrice, setMinPrice }: IProps) {
   const searchParams = useSearchParams()
   // this comes from products price
   const [minVal, setMinVal] = useState(min)
   const [maxVal, setMaxVal] = useState(max)
   const minValRef = useRef(minVal)
   const maxValRef = useRef(maxVal)
   const range = useRef<HTMLInputElement | null>(null)

   // Convert to percentage
   const getPercent = useCallback(
      (value: number) => Math.round(((value - min) / (max - min)) * 100),
      [min, max]
   )

   useEffect(() => {
      if (searchParams.get("min price")) {
         setMinVal(Number(searchParams.get("min price")))
         minValRef.current = Number(searchParams.get("min price"))
      }

      if (searchParams.get("max price")) {
         setMaxVal(Number(searchParams.get("max price")))
         maxValRef.current = Number(searchParams.get("max price"))
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   // Set width of the range to decrease from the right side
   useEffect(() => {
      const maxPercent = getPercent(maxVal)
      const minPercent = getPercent(minValRef.current)
      if (range.current) {
         range.current.style.width = `${maxPercent - minPercent}%`
      }
   }, [maxVal, getPercent])

   // Set width of the range to decrease from the left side
   useEffect(() => {
      const minPercent = getPercent(minVal)
      const maxPercent = getPercent(maxValRef.current)

      if (range.current) {
         range.current.style.left = `${minPercent}%`
         range.current.style.width = `${maxPercent - minPercent}%`
      }
   }, [minVal, getPercent])

   return (
      <div className="container w-full">
         <input
            type="range"
            min={min}
            max={max}
            value={minVal}
            onChange={(event) => {
               const value = Math.min(Number(event.target.value), maxVal - 1)
               setMinVal(value)
               minValRef.current = value
            }}
            onMouseUp={() => {
               setMinPrice(minVal)
            }}
            className="thumb thumb--left"
            style={{ zIndex: minVal > max - 100 ? "5" : "auto" }}
         />
         <input
            type="range"
            min={min}
            max={max}
            value={maxVal}
            onChange={(event) => {
               const value = Math.max(Number(event.target.value), minVal + 1)
               setMaxVal(value)
               maxValRef.current = value
            }}
            onMouseUp={() => {
               setMaxPrice(maxVal)
            }}
            className="thumb thumb--right"
         />

         <div className="slider">
            <div className="slider__track" />
            <div ref={range} className="slider__range" />
            <div className="slider__left-value">{minVal}$</div>
            <div className="slider__right-value">{maxVal}$</div>
         </div>
      </div>
   )
}

export default DoubleRangePicker
