"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"


const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3).max(50) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(6).max(100),
  })

}





const AuthenticationForm = ({ type }: { type: FormType }) => {
  const formSchema = authFormSchema(type)
  // 1. Form Definition.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-in") {
        console.log("Sign-in", values)
      }
      else {
        console.log("Sign-up", values
        )
      }
    } catch (error) {
      console.log(values)
      toast.error(`Something went wrong: ${error}`)
    }
  }

  const whetherSignedIn = type === "sign-in"

  return (
    <div className="card-border lg:min-w-[560px]">
      <div className="flex flex-col card gap-6 py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/Logo-rem.png" alt="Logo" width={40} height={40} />
          <h2 className="text-2xl font-bold">AI Interviewer</h2>
        </div>


        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 form mt-4 w-full">
            {!whetherSignedIn && <p>Name</p>}
            <p>Email</p>
            <p>Password</p>

            <Button className="btn" type="submit">{whetherSignedIn ? 'Sign-in' : 'Create a new Account'}</Button>
          </form>
        </Form>

        <p>
          {whetherSignedIn ? 'New to AI Interviewer?' : 'Already have an account?'}
          <Link href={!whetherSignedIn ? '/sign-in' : '/sign-up'}
            className="text-center font-bold ml-1"
          >{!whetherSignedIn ? "Sign-in" : "Sign-up"}</Link>

        </p>
      </div>
    </div>
  )
}

export default AuthenticationForm