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
import {useCategories} from "@/app/Context/CategoryContext";
import {useAuth} from "@/app/Context/AuthContext";
import {useToast} from "@/hooks/use-toast";
import baseURL from "@/app/Components/BaseURL";

const formSchema = z.object({
  courseCategory: z.string(),
  course_name: z.string().max(200),
  course_overview: z.string(),
  course_duration: z.number().optional(),
  lectures: z.number().optional(),
  language: z.string(),
  skill_level: z.string(),
  quizzes: z.number().optional(),
  access: z.string(),
  course_description: z.string().optional()
});

export default function CourseFormComponent({setCourseAdd, setCourseUuid}) {

  const form = useForm({
    resolver: zodResolver(formSchema),
  })

  const {categories} = useCategories()
  const {isAuthenticated} = useAuth()
  const {toast} = useToast()

  async function onSubmit(values) {
    try {
      if (!isAuthenticated) {
        toast({description: "Session Expired. Please login again", variant: "destructive"})
        window.location.href = '/login'
      }
      const course_uuid = crypto.randomUUID()
      values['course_uuid'] = course_uuid
      setCourseUuid(course_uuid)
      const response = await fetch(`${baseURL}courses/${values.courseCategory}/1/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values)
      })

      if (response.ok) {
        setCourseAdd(true)
        toast({
          description: "Course Added successfully"
        })
      } else {
        const data = await response.json()
        const errorString = Object.entries(data)
          .map(([key, value]) => `${key}: ${value.join(', ')}`)
          .join('\n');
        toast({
          description: errorString,
          variant: "destructive"
        })
      }

    } catch (error) {
      console.error("Form submission error", error);
      toast({
        description: error,
        variant: "destructive"
      })
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
                  {
                    categories && categories.map((category, index) => (
                      <SelectItem key={index} value={category.category_name}>{category.category_name}</SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
              <FormDescription>Course Category</FormDescription>
              <FormMessage/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="course_name"
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
          name="course_overview"
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
          name="course_duration"
          render={({field}) => (
            <FormItem>
              <FormLabel>Course Duration</FormLabel>
              <FormControl>
                <Input
                  placeholder="Duration"

                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                />
              </FormControl>
              <FormDescription>Duration of the course</FormDescription>
              <FormMessage/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lectures"
          render={({field}) => (
            <FormItem>
              <FormLabel>Lectures</FormLabel>
              <FormControl>
                <Input
                  placeholder="Lectures"

                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                />
              </FormControl>
              <FormDescription>Number of lectures need to complete this course</FormDescription>
              <FormMessage/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="language"
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
          name="skill_level"
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
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Professional">Professional</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>What&#39;s the skill level of this course</FormDescription>
              <FormMessage/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="quizzes"
          render={({field}) => (
            <FormItem>
              <FormLabel>quizzes</FormLabel>
              <FormControl>
                <Input
                  placeholder="quizzes"
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                />
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
                  <SelectItem value="Full Lifetime">Full Lifetime</SelectItem>
                  <SelectItem value="Limited">Limited</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Course Access</FormDescription>
              <FormMessage/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="course_description"
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