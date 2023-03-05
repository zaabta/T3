import { z } from "zod";
import { type AppProps } from "next/app";

export const signUpSchema = z
  .object({
    username: z
      .string({ required_error: "UserName is required" })
      .min(2, { message: "UserName Must be 2 or more characters long" })
      .max(15, { message: "Must be 15 or fewer characters long" }),
    email: z
      .string({ required_error: "Email is required" })
      .trim()
      .email({ message: "Invalid email address" }),
    password: z
      .string({ required_error: "Password is required" })
      .min(5, { message: "Password Must be 5 or more characters long" }),
    confirm: z.string({ required_error: "Password Confirmation  is required" }),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords and Passwords Confirmation don't match",
    path: ["confirm"],
  });

export const loginSchema = z
  .object({
    account: z.string({ required_error: "UserName or Email is required" }),
    password: z
      .string({ required_error: "Passwird is required" })
      .min(5, { message: "Must be 5 or more characters long" }),
  })
  .refine((data) => data.password === data.password, {
    message: "Passwords and Passwords Confirmation don't match",
    path: ["confirm"],
  });

export type Props = {
  children: React.ReactElement;
};

export const quoteInput = z.object({
  title: z.string({ required_error: "The title is required" }),
  categoryId: z.string({ required_error: "choose the category of your quote" }).trim().min(1,{
    message: "choose the category of your quote"
  }),
  content: z.string({ required_error: "quote is required!" }).min(3, {
    message: "Must be 3 or more characters long",
  }),
});

export type Response = {
  status: number;
  success: boolean;
  data: any[] | any;
  messages: string;
  time: Date | number;
  extras?: object
};

export type AppPropsWithAuth = AppProps & {
  Component: {
    requireAuth?: boolean;
  };
};

export type SingleQuoteProps = {
  id? : string,
  text: string,
  date: Date,
  user: UserData,
  category: {id: string, name: string}
}

export type CategoryProps = {
  list?: Category[]
}

export type Category = {
  id: string,
  name: string
}

export type UserData = {
  id: string,
  username: string,
  image?: string
}


export type SingleQuoteData = {
  id: string,
  title: string,
  content: string,
  category: Category,
  createdAt: Date,
  user: UserData
}

export type PostProps = {
  title: string
  contnet: string
  date: Date
  category: { id: string; name: string }
  user: { username: string; img?: string }
}

export type author = {
  id: string,
  name: string,
  avatar?: string,
  quotes: number
}

