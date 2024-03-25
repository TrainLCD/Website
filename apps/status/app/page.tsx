import Link from "next/link";
import { IncidentsTable } from "./components/IncidentsTable";
import { Overview } from "./components/Overview";
import { ServicesTable } from "./components/ServicesTable";
import { FeedIcon } from "./components/icons/Feed";
import { XIcon } from "./components/icons/X";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center md:p-8 p-4 md:mt-16 mt-4 md:mb-32 mb-16">
      <Overview />
      <div className="mt-16 w-full flex justify-center items-center">
        <ServicesTable />
      </div>
      <div className="mt-16 w-full flex justify-center items-center">
        <IncidentsTable />
      </div>
      <div className="w-full max-w-2xl mt-6 flex justify-start items-center">
        <FeedIcon color="#f26522" />
        <p className="ml-1 text-xs">フィード登録はこちら: </p>
        <Link className="text-xs ml-2 text-[#f26522]" href="/rss.xml">
          RSS
        </Link>
        <Link className="text-xs ml-2 text-[#f26522]" href="/atom.xml">
          Atom
        </Link>
      </div>
      <div className="w-full max-w-2xl mt-2 flex justify-start items-center">
        <XIcon color="#f26522" />
        <p className="ml-1 text-xs">X(旧Twitter)アカウント: </p>
        <Link
          className="text-xs ml-2 text-[#f26522]"
          href="https://x.com/trainlcd"
        >
          @TrainLCD
        </Link>
      </div>
    </main>
  );
}
