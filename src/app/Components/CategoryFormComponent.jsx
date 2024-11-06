"use client"
import React, {
  useState
} from "react"
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
  cn
} from "@/lib/utils"
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
import {
  Input
} from "@/components/ui/input"
import {
  Textarea
} from "@/components/ui/textarea"
import {useRouter} from 'next/navigation';
import BaseURL from "@/app/Components/BaseURL";
import {useToast} from "@/hooks/use-toast";

const formSchema = z.object({
  category_name: z.string().max(200),
  description: z.string().optional()
});

export default function CategoryFormComponent() {
  const form = useForm({
    resolver: zodResolver(formSchema),
  })
  const router = useRouter();
  const {toast} = useToast()


  async function onSubmit(values) {
    try {
      values['category_uuid'] = crypto.randomUUID()
      console.log(values);
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) window.location.href = '/login';
      const response = await fetch(`${BaseURL}categories/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(values)
      })
      const data = await response.json()
      console.log(data)
      if (response.ok) {
        form.reset()
        toast({description: "Category Added successfully."});
      }
    } catch (error) {
      console.error("Form submission error", error);
      toast({description: error, variant: 'destructive'})
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-5xl mx-auto py-10">
          <FormField
            control={form.control}
            name="category_name"
            render={({field}) => (
              <FormItem>
                <FormLabel>Category Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" type="text" {...field} />
                </FormControl>
                <FormDescription>Please enter the category name</FormDescription>
                <FormMessage/>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({field}) => (
              <FormItem>
                <FormLabel>Category Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Description" className="resize-none" {...field} />
                </FormControl>
                <FormDescription>Your Category Description</FormDescription>
                <FormMessage/>
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <div className="flex justify-end mb-4 mt-4">
        <Button onClick={() => router.push('/')} variant="link">
          <h1> Back to home</h1>
        </Button>
      </div>
    </>
  )
}