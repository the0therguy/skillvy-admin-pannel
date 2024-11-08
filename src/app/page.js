import CategoryTable from "@/app/Components/CategoryTable";
import CourseList from "@/app/Components/CourseList";

export default function Home() {

  return (
    <div
      className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-row gap-8 row-start-2 items-start sm:justify-center w-full">
        <CategoryTable/>
        <CourseList/>
      </main>
    </div>
  );
}
