"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import baseURL from "@/app/Components/BaseURL";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {TrashIcon, PencilSquareIcon} from '@heroicons/react/24/outline';
import {useToast} from "@/hooks/use-toast";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const router = useRouter();
  const {toast} = useToast()


  useEffect(() => {
    function getCourses() {
      fetch(`${baseURL}all-course-name/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => setCourses(data))
        .catch((error) => console.error("Error fetching courses:", error));
    }

    getCourses();
  }, []);

  // Function to handle edit button click
  const handleEdit = (courseId) => {
    router.push(`/course/edit/${courseId}`);
  };

  // Function to handle delete button click
  const handleDelete = (id) => {
    setSelectedCourse(courses[id]);
    setIsDeleteDialogOpen(true);
  };

  // Confirm delete action
  const handleDeleteConfirm = async () => {
    if (selectedCourse) {
      try {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) window.location.href = '/login';

        const response = await fetch(`${baseURL}course-delete/${selectedCourse.course_uuid}/`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          setCourses((prevCourses) =>
            prevCourses.filter((course) => course.course_uuid !== selectedCourse.course_uuid)
          );
          toast({ description: "Course deleted successfully." });
        } else {
          console.error("Failed to delete course");
          toast({ description: "Failed to delete course", variant: 'destructive' });
        }
      } catch (error) {
        console.error("Error deleting course:", error);
        toast({ description: "Failed to delete course", variant: 'destructive' });
      }
    }
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="container">
      <h1>Course List</h1>
      <hr />
      <Table className="mt-4 w-full min-w-full border border-gray-300">
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Course Name</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course, index) => (
            <TableRow key={course.course_uuid}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{course.course_name}</TableCell>
              <TableCell className="flex space-x-2">
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => handleEdit(course.course_uuid)}
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger><PencilSquareIcon className="w-5 h-5" aria-hidden="true" /></TooltipTrigger>
                      <TooltipContent>
                        <p>Edit</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </button>

                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger><TrashIcon className="w-5 h-5" aria-hidden="true" /></TooltipTrigger>
                      <TooltipContent>
                        <p>Delete</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this course?
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex justify-end space-x-2">
            <Button onClick={() => setIsDeleteDialogOpen(false)} variant="secondary">
              No
            </Button>
            <Button onClick={handleDeleteConfirm} variant="destructive">
              Yes, Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
