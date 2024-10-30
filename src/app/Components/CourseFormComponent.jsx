"use client"
import {
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Input
} from "@/components/ui/input"
import {
  Textarea
} from "@/components/ui/textarea"

const formSchema = z.object({
  courseCategory: z.string(),
  courseName: z.string().max(200),
  courseOverview: z.string(),
  courseDuration: z.number().optional(),
  courseLectures: z.number().optional(),
  courseLanguage: z.string(),
  skillLevel: z.string(),
  quizes: z.number().optional(),
  access: z.string(),
  courseDescription: z.string().optional()
});

export default function CourseFormComponent() {

  const form = useForm({
    resolver: zodResolver(formSchema),

  })

  async function onSubmit(values) {
    try {
      console.log(values);
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-5xl mx-auto py-10">

        <FormField
          control={form.control}
          name="courseCategory"
          render={({field}) => (
            <FormItem>
              <FormLabel>Course Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Course Category"/>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="English Courses">English Courses</SelectItem>
                  <SelectItem value="Functional Skill Courses">Functional Skill Courses</SelectItem>
                  <SelectItem value="Post Graduate Courses">Post Graduate Courses</SelectItem>
                  <SelectItem value="Undergraduate Courses">Undergraduate Courses</SelectItem>
                  <SelectItem value="Professional Courses">Professional Courses</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Course Category</FormDescription>
              <FormMessage/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="courseName"
          render={({field}) => (
            <FormItem>
              <FormLabel>Course Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Course Name"

                  type="text"
                  {...field} />
              </FormControl>
              <FormDescription>Please enter the course name</FormDescription>
              <FormMessage/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="courseOverview"
          render={({field}) => (
            <FormItem>
              <FormLabel>Course Overview</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Course Overview"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>Please enter your course overview</FormDescription>
              <FormMessage/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="courseDuration"
          render={({field}) => (
            <FormItem>
              <FormLabel>Course Duration</FormLabel>
              <FormControl>
                <Input
                  placeholder="Duration"

                  type="number"
                  {...field} />
              </FormControl>
              <FormDescription>Duration of the course</FormDescription>
              <FormMessage/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="courseLectures"
          render={({field}) => (
            <FormItem>
              <FormLabel>Lectures</FormLabel>
              <FormControl>
                <Input
                  placeholder="Lectures"

                  type="number"
                  {...field} />
              </FormControl>
              <FormDescription>Number of lectures need to complete this course</FormDescription>
              <FormMessage/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="courseLanguage"
          render={({field}) => (
            <FormItem>
              <FormLabel>Language</FormLabel>
              <FormControl>
                <Input
                  placeholder="English"

                  type="text"
                  {...field} />
              </FormControl>
              <FormDescription>The language of the course</FormDescription>
              <FormMessage/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="skillLevel"
          render={({field}) => (
            <FormItem>
              <FormLabel>Skill Level</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder=""/>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Full Lifetime">Full Lifetime</SelectItem>
                  <SelectItem value="Limited">Limited</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>What's the skill level of this course</FormDescription>
              <FormMessage/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="quizes"
          render={({field}) => (
            <FormItem>
              <FormLabel>Quizes</FormLabel>
              <FormControl>
                <Input
                  placeholder="Quizes"

                  type="number"
                  {...field} />
              </FormControl>
              <FormDescription>Number of quiz in the course</FormDescription>
              <FormMessage/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="access"
          render={({field}) => (
            <FormItem>
              <FormLabel>Access</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Access"/>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="m@example.com">m@example.com</SelectItem>
                  <SelectItem value="m@google.com">m@google.com</SelectItem>
                  <SelectItem value="m@support.com">m@support.com</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Course Access</FormDescription>
              <FormMessage/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="courseDescription"
          render={({field}) => (
            <FormItem>
              <FormLabel>Course Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Description"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>Description of the course</FormDescription>
              <FormMessage/>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}