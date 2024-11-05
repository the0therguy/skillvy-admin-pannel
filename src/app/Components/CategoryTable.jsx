"use client"
import React, {useEffect, useState} from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import BaseURL from "@/app/Components/BaseURL";

const CategoryTable = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${BaseURL}categories/`, {
      method: "GET",
      headers: {'Content-Type': 'application/json'}
    }) // Replace with your actual API endpoint
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleEdit = (id) => {
    // Handle edit action
    console.log(`Editing category with ID: ${id}`);
  };

  const handleDelete = (id) => {
    // Handle delete action
    console.log(`Deleting category with ID: ${id}`);
  };

  return (
    <Table className="min-w-full border border-gray-300">
      <TableHeader className="bg-gray-100">
        <TableRow>
          <TableHead className="p-4 text-left">ID</TableHead>
          <TableHead className="p-4 text-left">Category UUID</TableHead>
          <TableHead className="p-4 text-left">Category Name</TableHead>
          <TableHead className="p-4 text-left">Category Description</TableHead>
          <TableHead className="p-4 text-left">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category) => (
          <TableRow key={category.id} className="hover:bg-gray-50">
            <TableCell className="p-4">{category.id}</TableCell>
            <TableCell className="p-4">{category.category_uuid}</TableCell>
            <TableCell className="p-4">{category.category_name}</TableCell>
            <TableCell className="p-4">
              {category.category_description || 'N/A'}
            </TableCell>
            <TableCell className="p-4 flex space-x-2">
              <button onClick={() => handleEdit(category.id)} className="text-blue-600 hover:text-blue-800">
                <PencilSquareIcon className="w-5 h-5" aria-hidden="true"/>
              </button>
              <button onClick={() => handleDelete(category.id)} className="text-red-600 hover:text-red-800">
                <TrashIcon className="w-5 h-5" aria-hidden="true"/>
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CategoryTable;
