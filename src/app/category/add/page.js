import CategoryFormComponent from "@/app/Components/CategoryFormComponent";

export default function CategoryAddPage() {
  return (
    <div className="flex flex-col min-h-screen w-full items-center justify-center px-8">
      <h1 className="text-2xl font-bold mb-6">Add Category</h1>
      <CategoryFormComponent />
    </div>
  );
}
