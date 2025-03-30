"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import FormField from "./FormField"
import { useRouter } from "next/navigation"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/firebase/client"
import { signIn, signUp } from "@/lib/actions/auth.action"


const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3).max(50) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(6).max(100),
  })

}



const AuthenticationForm = ({ type }: { type: FormType }) => {
  const router = useRouter()
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
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-up") {
        const { name, email, password } = values

        const userCredentials = await createUserWithEmailAndPassword(auth, email, password)

        const result = await signUp({
          uid: userCredentials.user.uid,
          name: name!,
          email,
          password
        })
        if (!result?.success) {
          toast.error(result?.message)
          return
        }
        toast.success("Account created successfully, please sign-in again")
        router.push("/sign-in")
      }
      else {
        const { email, password } = values;
        const userCredentials = await signInWithEmailAndPassword(auth, email, password)

        const idToken = await userCredentials.user.getIdToken()

        if (!idToken) {
          toast.success("Signing in failed")
          return
        }

        await signIn({ email, idToken })
        toast.success("Signed in successfully")
        router.push("/")
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
            {!whetherSignedIn && (
              <>
                <FormField
                  control={form.control}
                  name="name"
                  label="Name"
                  placeholder="Enter Your Name"
                />

                <FormField
                  control={form.control}
                  name="email"
                  label="Email"
                  placeholder="Enter Your Email"
                  type="email"
                />

                <FormField
                  control={form.control}
                  name="password"
                  label="Password"
                  placeholder="Enter Your Password"
                  type="password"
                />
              </>

            )}

            {whetherSignedIn && (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  label="Email"
                  placeholder="Enter Your Email"
                  type="email"
                />

                <FormField
                  control={form.control}
                  name="password"
                  label="Password"
                  placeholder="Enter Your Password"
                  type="password"
                />
              </>
            )}

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