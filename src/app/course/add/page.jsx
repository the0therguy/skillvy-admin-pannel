"use client"
import CourseFormComponent from "@/app/Components/CourseFormComponent";
import CourseCoverPhotoComponent from "@/app/Components/CourseCoverPhotoComponent";
import {useState} from "react";

export default function Home() {
  const [courseAdd, setCourseAdd] = useState(false);
  const [courseUuid, setCourseUuid] = useState(false);
  return (
    <>
      <div className="flex flex-col min-h-[50vh] h-full w-full items-center justify-center px-8">
        <h1>Add Course</h1>
        <CourseFormComponent setCourseAdd={setCourseAdd} setCourseUuid={setCourseUuid}/>
        <CourseCoverPhotoComponent courseAdd={courseAdd} courseUuid={courseUuid}/>
      </div>
    </>
  )
}