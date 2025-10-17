import IncidentsTable from "@components/IncidentsTable";
import Overview from "@components/Overview";
import ServicesTable from "@components/ServicesTable";
import { FeedIcon } from "@components/icons/Feed";
import { XIcon } from "@components/icons/X";

const HomePage = () => (
  <main className="flex flex-col justify-center items-center md:p-8 p-4 md:mt-16 mt-4 md:mb-32 mb-16">
    <Overview />
    <div className="mt-16 w-full flex justify-center items-center">
      <ServicesTable />
    </div>
    <div className="mt-16 w-full flex justify-center items-center">
      <IncidentsTable />
    </div>
    <div className="w-full max-w-2xl mt-6 flex justify-start items-center">
      <FeedIcon className="text-orange-700 h-4 w-4" />
      <p className="ml-1 text-xs">フィード登録はこちら: </p>
      <a className="text-xs ml-2 text-orange-600" href="/rss.xml">
        RSS
      </a>
      <a className="text-xs ml-2 text-orange-600" href="/atom.xml">
        Atom
      </a>
    </div>
    <div className="w-full max-w-2xl mt-2 flex justify-start items-center">
      <XIcon className="h-4 w-4 text-neutral-600" />
      <p className="ml-1 text-xs">X(旧Twitter)アカウント: </p>
      <a
        className="text-xs ml-2 text-orange-600"
        href="https://x.com/trainlcd"
        target="_blank"
        rel="noopener noreferrer"
      >
        @TrainLCD
      </a>
    </div>
  </main>
);

export default HomePage;
