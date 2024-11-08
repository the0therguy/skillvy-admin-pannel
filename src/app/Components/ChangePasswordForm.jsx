"use client"

import {
  useForm
} from "react-hook-form"
import {
  zodResolver
} from "@hookform/resolvers/zod"
import * as z from "zod"

import {
  Button
} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {Input} from '@/components/ui/input'
import {useToast} from "@/hooks/use-toast";
import BaseURL from "@/app/Components/BaseURL";
import {useState} from "react";


const formSchema = z.object({
  old_password: z.string(),
  new_password: z.string(),
  re_new_password: z.string()
});

export default function ChangePasswordForm() {

  const form = useForm({
    resolver: zodResolver(formSchema),

  })

  const {toast} = useToast()
  const [loading, setLoading] = useState(false);


  async function onSubmit(values) {
    setLoading(true)
    try {
      const accessToken = localStorage.getItem("access_token")
      if (!accessToken) {
        window.location.href = '/login'
      }
      if (values.new_password === values.re_new_password) {
        delete values.re_new_password
        const response = await fetch(`${BaseURL}change-password/`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify(values)
        })
        const data = await response.json()
        if (!response.ok) {
          toast({description: data.message, variant: "destructive"});
        }
        toast({description: data.message});
        setLoading(false)
      } else {
        toast({description: "New password and retype new password doesn't match", variant: "destructive"})
        setLoading(false)
      }
    } catch (error) {
      console.error("Form submission error", error);
      toast({description: "Failed to submit the form. Please try again.", variant: "destructive"});
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">

        <FormField
          control={form.control}
          name="old_password"
          render={({field}) => (
            <FormItem>
              <FormLabel>Old Password</FormLabel>
              <FormControl>
                <Input id="old_password"
                       placeholder="******"
                       autoComplete="current-password"
                       type="password" {...field} />
              </FormControl>
              <FormDescription>Enter your old password.</FormDescription>
              <FormMessage/>
            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="new_password"
          render={({field}) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input id="new_password"
                       placeholder="******"
                       autoComplete="current-password"
                       type="password" {...field} />
              </FormControl>
              <FormDescription>Enter your new password.</FormDescription>
              <FormMessage/>
            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="re_new_password"
          render={({field}) => (
            <FormItem>
              <FormLabel>Retype New Password</FormLabel>
              <FormControl>
                <Input id="re_new_password"
                       placeholder="******"
                       autoComplete="current-password"
                       type="password" {...field} />
              </FormControl>
              <FormDescription>Enter your new password again. </FormDescription>
              <FormMessage/>
            </FormItem>
          )}
        />

        <Button type="submit" className="flex items-center justify-center" disabled={loading}>
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
            "Change Password"
          )}
        </Button>
      </form>
    </Form>
  )
}