import Header from './components/Header';
import Footer from './components/Footer';
import StatusContent from './components/client/StatusContent';
import { FeedIcon } from './components/icons/Feed';
import { XIcon } from './components/icons/X';
import { getServices, getStatusLabel } from './server/repo/serviceRepository';
import { getIncidentHistories } from './server/repo/incidentRepository';
import { detectLocale } from './server/lib/locale';

// Force dynamic rendering - don't pre-render during build
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const locale = await detectLocale();
  
  const [statusLabel, services, incidents] = await Promise.all([
    getStatusLabel(locale),
    getServices(locale),
    getIncidentHistories(locale),
  ]);

  const feedText = locale === 'ja' 
    ? 'フィード登録はこちら: '
    : 'Subscribe to feed: ';
  
  const twitterText = locale === 'ja'
    ? 'X(旧Twitter)アカウント: '
    : 'X (formerly Twitter) account: ';

  return (
    <>
      <Header />
      <main className="flex flex-col justify-center items-center md:p-8 p-4 md:mt-16 mt-4 md:mb-32 mb-16">
        <StatusContent
          initialStatusLabel={statusLabel}
          initialServices={services}
          initialIncidents={incidents}
          locale={locale}
        />
        <div className="w-full max-w-2xl mt-6 flex justify-start items-center">
          <FeedIcon className="text-orange-700 h-4 w-4" />
          <p className="ml-1 text-xs">{feedText}</p>
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
          <p className="ml-1 text-xs">{twitterText}</p>
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
