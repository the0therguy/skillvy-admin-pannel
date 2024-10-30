import CourseFormComponent from "@/app/Components/CourseFormComponent";

export default function Home() {
  return (
    <>
      <div className="flex flex-col min-h-[50vh] h-full w-full items-center justify-center px-8">
        <h1>Add Course</h1>
        <CourseFormComponent/>
      </div>
    </>
  )
}