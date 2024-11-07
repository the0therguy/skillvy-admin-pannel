"use client"
import { useEffect, useState } from "react";
import BaseURL from "@/app/Components/BaseURL";

export default function CourseEditPage({params}) {
  const [course, setCourse] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCourse = async () => {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        window.location.href = "/login";
        return;
      }

      try {
        const response = await fetch(
          `${BaseURL}course/${params.course_uuid}/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setCourse(data);
        fetch(`${BaseURL}categories/`, {
          method: "GET",
          headers: {'Content-Type': 'application/json'}
        })
          .then((response) => response.json())
          .then((data) => setCategories(data))
          .catch((error) => console.error("Error fetching categories:", error));
      } catch (error) {
        console.error(error);
      }
    };

    if (params.course_uuid) {
      fetchCourse();
    }
  }, [params.course_uuid]);

  if (!course) {
    return <div>Loading...</div>;
  }
  if (course) {
    console.log(course)
  }

  return (
    <>
      {/* Your course edit UI */}
      <h1>{params.course_uuid}</h1>
      {/* Add your course edit form and other components */}
    </>
  );
}