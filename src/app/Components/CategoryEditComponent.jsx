import React, {useState} from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import BaseURL from "@/app/Components/BaseURL";
import {useToast} from "@/hooks/use-toast";


export default function CategoryEditComponent({category, isDialogOpen, setIsDialogOpen, setSelectedCategory}) {
  const [formData, setFormData] = useState({
    category_name: category.category_name || '',
    category_description: category.category_description || '',
  });
  const {toast} = useToast()


  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) window.location.href = '/login';
      const response = await fetch(`${BaseURL}category-update/${category.category_uuid}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({description: "Category Updated successfully."});
        setSelectedCategory(null)
        setIsDialogOpen(false); // Close the dialog on success
      } else {
        console.error("Failed to update category");
        toast({description: "Something went wrong.", variant: 'destructive'});
      }
    } catch (error) {
      console.error("Error updating category:", error);
      toast({description: "Something went wrong.", variant: 'destructive'});
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>
            Update the category details below.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label htmlFor="category_name" className="block text-sm font-medium text-gray-700">
              Category Name
            </label>
            <Input
              id="category_name"
              name="category_name"
              value={formData.category_name}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>
          <div>
            <label htmlFor="category_description" className="block text-sm font-medium text-gray-700">
              Category Description
            </label>
            <Input
              id="category_description"
              name="category_description"
              value={formData.category_description}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <Button onClick={() => setIsDialogOpen(false)} variant="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} variant="primary">
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
