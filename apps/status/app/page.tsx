import { Overview } from "./components/Overview";
import { ServicesTable } from "./components/ServicesTable";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center md:p-8 p-4 md:mt-16 mt-4 md:mb-32 mb-16">
      <Overview />
      <div className="mt-16 w-full flex justify-center items-center">
        <ServicesTable />
      </div>
    </main>
  );
}
