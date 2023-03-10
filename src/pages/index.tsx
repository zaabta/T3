import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { FormEvent } from "react";
import { loginSchema } from "y/types";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter()
  const handleOnSubmit = async (e:FormEvent) => {
    try {
      e.preventDefault()
    const userDateObj = Object.fromEntries(new FormData(e.target as HTMLFormElement)) 
    const input = await loginSchema.safeParseAsync(userDateObj)
    if(!input.success) input.error.errors.map(err => toast.error(err.message))
    else {
      const res = await signIn("credentials", {...userDateObj, redirect: false})
      if(!res?.ok) toast.error("Could not login please check your account name or email and password")
      else 
        router.push("/quote").then(()=> toast.success("login successfully")).catch((err)=>{
          console.log("ERORR->",err)
          toast.error("something wrong !")
        })
    }
    } catch(err){
      console.log("ERROR->", err)
    }
  }

  return (
    <>
      <Head>
        <title>Quote</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <div className="bg-white font-family-karla h-screen"> 
      <div className="w-full flex flex-wrap">
        <div className="w-full md:w-1/2 flex flex-col">
            <div className="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24">
                <a href="#" className="bg-black text-white font-bold text-xl p-4">Logo</a>
            </div>
            <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                <p className="text-center text-3xl">Welcome.</p>
                <form className="flex flex-col pt-3 md:pt-8" onSubmit={handleOnSubmit}>
                    <div className="flex flex-col pt-4">
                        <label htmlFor="email" className="text-lg">Account</label>
                        <input type="text" name="account"  id="email" placeholder="username or your@email.com" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"/>
                    </div>
                    <div className="flex flex-col pt-4">
                        <label htmlFor="password" className="text-lg">Password</label>
                        <input type="password" name="password" id="password" placeholder="Password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"/>
                    </div>
                    <input type="submit" value="Log In" className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"/>
                </form>
                <div className="text-center pt-12 pb-12">
                    <p>{"Don't have an account?"} <Link href="/register" className="underline font-semibold">Register here.</Link></p>
                </div>
            </div>
        </div>
        <div className="w-1/2 shadow-2xl">
            <img className="object-cover w-full h-screen hidden md:block" src="https://source.unsplash.com/IXUM4cJynP0"/>
        </div>
      </div>
    </div>
    </>);
};

export default Home;

