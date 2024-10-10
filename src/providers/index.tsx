"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();
export default function Providers({ children }: { children: React.ReactNode }) {
   return (
      <>
         <Toaster />
         <QueryClientProvider client={queryClient}>
            {children}
         </QueryClientProvider>
      </>
   );
}