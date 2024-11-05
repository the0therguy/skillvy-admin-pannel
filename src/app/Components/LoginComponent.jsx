'use client'

import Link from 'next/link'
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {Button} from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {Input} from '@/components/ui/input'
import baseURL from "@/app/Components/BaseURL";
import {useAuth} from "@/app/Context/AuthContext";
import {useState} from "react";
import {useToast} from "@/hooks/use-toast";

const formSchema = z.object({
  username: z.string(),
  password: z
    .string()
    .min(6, {message: 'Password must be at least 6 characters long'})
    .regex(/[a-zA-Z0-9]/, {message: 'Password must be alphanumeric'}),
})

export default function LoginComponent() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const {login} = useAuth()
  const [loading, setLoading] = useState(false);
  const {toast} = useToast()


  async function onSubmit(values) {
    setLoading(true)
    try {
      const response = await fetch(`${baseURL}admin/signin/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(values),
      })
      debugger
      if (response.ok) {
        const data = await response.json();
        const contextData = await login(data.access, data.refresh)
        setLoading(false)
        if (contextData === true) {
          window.location.href = "/";
        }
      } else {
        setLoading(false)
        const data = await response.json()
        console.log(data)
        if (data.detail) {
          toast({
            variant: "destructive",
            description: data.detail,
          })
        } else {
          toast({
            variant: "destructive",
            description: data.non_field_errors[0],
          })
        }
        // console.error('Login failed:', await response.json());
      }
    } catch (error) {
      setLoading(false)
      console.error('Form submission error', error)
      toast({
        variant: "destructive",
        description: 'Failed to submit the form. Please try again.'
      })
    }
  }

  return (
    <div className="flex flex-col min-h-[50vh] h-full w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email and password to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({field}) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="username">Username</FormLabel>
                      <FormControl>
                        <Input
                          id="username"
                          placeholder="johndoe"
                          type="text"
                          autoComplete="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({field}) => (
                    <FormItem className="grid gap-2">
                      <div className="flex justify-between items-center">
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Link
                          href="#"
                          className="ml-auto inline-block text-sm underline"
                        >
                          Forgot your password?
                        </Link>
                      </div>
                      <FormControl>
                        <Input
                          id="password"
                          placeholder="******"
                          autoComplete="current-password"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full flex items-center justify-center" disabled={loading}>
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 mr-3"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 0112-6.93 8 8 0 100 13.86A8 8 0 014 12z"
                        />
                      </svg>
                      Loading...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="#" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
