"use client"

import {
  toast
} from "sonner"
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


  async function onSubmit(values) {
    try {
      const accessToken = localStorage.getItem("accessToken")
      if (!accessToken) {
        window.location.href = '/'
      }
      console.log(values);
      if (values.new_password === values.re_new_password) {

      }
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
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

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}