"use client"
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'; // Import Next.js router
import baseURL from "@/app/Components/BaseURL";

export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const router = useRouter();

  useEffect(() => {
    function getCourses() {
      fetch(`${baseURL}all-course-name/`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
        .then((response) => response.json())
        .then((data) => setCourses(data))
        .catch((error) => console.error("Error fetching courses:", error));
    }

    getCourses();
  }, []);

  // Function to handle edit button click
  const handleEdit = (courseId) => {
    router.push(`/edit-course/${courseId}`); // Redirect to the edit page
  };

  return (
    <div className="container">
      <h1>Course List</h1>
      <hr/>
      <div>
        <ul className="list-disc">
          {courses.map((course, index) => (
            <li key={index} className="flex justify-between items-center">
              <span>{course.course_name}</span>
              <button
                className="ml-4 text-blue-500 hover:underline"
                onClick={() => handleEdit(course.course_uuid)} // Use course ID here
              >
                Edit
              </button>
              <hr/>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
