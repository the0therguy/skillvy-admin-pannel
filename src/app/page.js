import CategoryTable from "@/app/Components/CategoryTable";
import CourseList from "@/app/Components/CourseList";
import DataAnalytics from "@/app/Components/DataAnalytics";

export default function Home() {

  return (
    <div
      className="w-[95%] font-[family-name:var(--font-geist-sans)]">
      <div>
        <DataAnalytics/>
      </div>
      <main className="flex flex-row gap-8 row-start-2 items-start sm:justify-center w-full">
        <CategoryTable/>
        <CourseList/>
      </main>
    </div>
  );
}
