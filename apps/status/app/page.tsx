import Header from './components/Header';
import Footer from './components/Footer';
import Overview from './components/client/Overview';
import ServicesTable from './components/client/ServicesTable';
import IncidentsTable from './components/client/IncidentsTable';
import { FeedIcon } from './components/icons/Feed';
import { XIcon } from './components/icons/X';

async function getStatusSnapshot() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/status/snapshot`, {
    cache: 'no-store',
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch status');
  }
  
  return res.json();
}

export default async function HomePage() {
  const { statusLabel, services, incidents } = await getStatusSnapshot();

  return (
    <>
      <Header />
      <main className="flex flex-col justify-center items-center md:p-8 p-4 md:mt-16 mt-4 md:mb-32 mb-16">
        <Overview statusLabel={statusLabel} />
        <div className="mt-16 w-full flex justify-center items-center">
          <ServicesTable services={services} />
        </div>
        <div className="mt-16 w-full flex justify-center items-center">
          <IncidentsTable incidents={incidents} />
        </div>
        <div className="w-full max-w-2xl mt-6 flex justify-start items-center">
          <FeedIcon className="text-orange-700 h-4 w-4" />
          <p className="ml-1 text-xs">フィード登録はこちら: </p>
          <a
            className="text-xs ml-2 text-orange-700"
            href="/rss.xml"
            rel="noopener noreferrer"
            target="_blank"
          >
            RSS
          </a>
          <a
            className="text-xs ml-2 text-orange-700"
            href="/atom.xml"
            rel="noopener noreferrer"
            target="_blank"
          >
            Atom
          </a>
        </div>
        <div className="w-full max-w-2xl mt-2 flex justify-start items-center">
          <XIcon className="h-4 w-4 text-neutral-600" />
          <p className="ml-1 text-xs">X(旧Twitter)アカウント: </p>
          <a
            className="text-xs ml-2 text-orange-700"
            href="https://x.com/trainlcd"
            target="_blank"
            rel="noopener noreferrer"
          >
            @TrainLCD
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
