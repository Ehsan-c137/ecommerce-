"use server";

import { BASE_URL } from "../index";
import { cookies } from "next/headers";

export default async function signup(data: {
   email: string;
   password: string;
   username: string;
}) {
   const option = {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
   };

   try {
      const response = await fetch(`${BASE_URL}/user/register/`, option);

      const data = await response.json();
      if (response.status >= 200 && response.status < 300) {
         cookies().set({
            name: "session",
            value: data?.token,
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
         });
      }

      console.log({ data, response });
      return data;
   } catch (error) {
      return error;
   }
}