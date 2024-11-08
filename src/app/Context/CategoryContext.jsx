"use client";
import {createContext, useContext, useState, useEffect} from "react";
import baseURL from "@/app/Components/BaseURL";

// Create the context
const CategoryContext = createContext();

// Provider component
export const CategoryProvider = ({children}) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch categories once when the provider mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${baseURL}categories/`, {
          method: "GET",
          headers: {'Content-Type': 'application/json'}
        });

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await response.json();
        setCategories(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Function to add a new category
  const addCategory = (newCategory) => {
    setCategories((prevCategories) => [...prevCategories, newCategory]);
  };

  const removeCategory = (selectedCategory) => {
    setCategories((prevCategories) =>
      prevCategories.filter((cat) => cat.category_uuid !== selectedCategory.category_uuid)
    );
  }

  // Provide the state, addCategory function, and any loading or error info
  return (
    <CategoryContext.Provider value={{categories, addCategory, loading, error, removeCategory}}>
      {children}
    </CategoryContext.Provider>
  );
};

// Hook to use the category context
export const useCategories = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategories must be used within a CategoryProvider");
  }
  return context;
};
