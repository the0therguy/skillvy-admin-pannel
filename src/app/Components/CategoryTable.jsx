"use client"
import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {PencilSquareIcon, TrashIcon} from '@heroicons/react/24/outline';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';
import {useToast} from "@/hooks/use-toast";


import BaseURL from "@/app/Components/BaseURL";
import CategoryEditComponent from "@/app/Components/CategoryEditComponent";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {useCategories} from "@/app/Context/CategoryContext";

const CategoryTable = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const {toast} = useToast()
  const router = useRouter();
  const {categories, removeCategory} = useCategories()

  const handleEdit = (id) => {
    // Handle edit action

    console.log(`Editing category with ID: ${id}`);
    setSelectedCategory(categories[id]);
    setIsDialogOpen(true);

  };

  const handleDelete = (id) => {
    // Handle delete action
    console.log(`Deleting category with ID: ${id}`);
    setSelectedCategory(categories[id]);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedCategory) {
      try {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) window.location.href = '/login';
        const response = await fetch(`${BaseURL}category-delete/${selectedCategory.category_uuid}/`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          removeCategory(selectedCategory)
          toast({description: "Category deleted successfully."});
        } else {
          console.error("Failed to delete category");
          toast({description: "Failed to delete category", variant: 'destructive'});
        }
      } catch (error) {
        console.error("Error deleting category:", error);
        toast({description: "Failed to delete category", variant: 'destructive'});
      }
    }
    setIsDeleteDialogOpen(false);
  };

  return (
    <div>
      {selectedCategory && (
        <CategoryEditComponent
          category={selectedCategory}
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          setSelectedCategory={setSelectedCategory}
        />
      )}

      <div className="mb-4">
        <Button onClick={() => router.push('/category/add')} variant="link">
          <h1>Add Category</h1>
        </Button>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this category?
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

      <Table className="min-w-full border border-gray-300">
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="p-4 text-left">ID</TableHead>
            <TableHead className="p-4 text-left">Category Name</TableHead>
            <TableHead className="p-4 text-left">Category Description</TableHead>
            <TableHead className="p-4 text-left">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category, index) => (
            <TableRow key={index} className="hover:bg-gray-50">
              <TableCell className="p-4">{index + 1}</TableCell>
              <TableCell className="p-4">{category.category_name}</TableCell>
              <TableCell className="p-4">
                {category.category_description || 'N/A'}
              </TableCell>
              <TableCell className="p-4 flex space-x-2">
                <button onClick={() => handleEdit(index)} className="text-blue-600 hover:text-blue-800">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger><PencilSquareIcon className="w-5 h-5" aria-hidden="true"/></TooltipTrigger>
                      <TooltipContent>
                        <p>Edit</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </button>
                <button onClick={() => handleDelete(index)} className="text-red-600 hover:text-red-800">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger><TrashIcon className="w-5 h-5" aria-hidden="true"/></TooltipTrigger>
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
    </div>
  );
};

export default CategoryTable;
