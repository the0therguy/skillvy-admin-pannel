import CategoryFormComponent from "@/app/Components/CategoryFormComponent";

export default function CategoryAddPage () {
  return (
    <>
      <div className="flex flex-col min-h-[50vh] h-full w-full items-center justify-center px-8">
        <h1>Add Category</h1>
        <CategoryFormComponent />
      </div>

    </>
  )
}