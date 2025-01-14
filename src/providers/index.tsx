"use client"

import {
   isServer,
   QueryClient,
   QueryClientProvider,
} from "@tanstack/react-query"
import { useState } from "react"
import { Toaster } from "react-hot-toast"

function makeQueryClient() {
   return new QueryClient({
      defaultOptions: {
         queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
         },
      },
   })
}

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
   if (isServer) {
      return makeQueryClient()
   } else {
      if (!browserQueryClient) browserQueryClient = makeQueryClient()
      return browserQueryClient
   }
}

export default function Providers({ children }: { children: React.ReactNode }) {
   const [queryClient] = useState(getQueryClient())
   return (
      <>
         <Toaster position="bottom-center" />
         <div id="my-portal"></div>
         <QueryClientProvider client={queryClient}>
            {children}
         </QueryClientProvider>
      </>
   )
}
