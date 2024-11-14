"use client"
import React, {useEffect, useState} from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Update this import based on your project structure
import baseURL from "@/app/Components/BaseURL";
import TypingAnimation from "@/components/ui/typing-animation";


const ApplicantTable = () => {
  const [applicantData, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${baseURL}apply-now/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });
      const data = await response.json();
      setData(data);
    }
    fetchData();
  }, [])

  return (
    <div className="mt-10 w-[85%] mx-auto">
      <TypingAnimation
        className="mt-10 mb-10 text-4xl font-bold text-black dark:text-white"
        text="Applicant Information"
      />
      <hr/>

      <Table className="min-w-full border border-gray-300">
        <TableHeader>
          <TableRow>
            <TableHead>Course Name</TableHead>
            <TableHead>Study Mode</TableHead>
            <TableHead>First Name</TableHead>
            <TableHead>Surname</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Job Title</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicantData.map((applicant) => (
            <TableRow key={applicant.id}>
              <TableCell>{applicant.course_name}</TableCell>
              <TableCell>{applicant.study_mode}</TableCell>
              <TableCell>{applicant.first_name}</TableCell>
              <TableCell>{applicant.surname}</TableCell>
              <TableCell>{applicant.email}</TableCell>
              <TableCell>{applicant.job_title || "N/A"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantTable;
