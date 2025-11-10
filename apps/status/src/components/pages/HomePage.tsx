import { useEffect, useState } from "preact/hooks";
import IncidentsTable from "@components/IncidentsTable";
import Overview from "@components/Overview";
import ServicesTable from "@components/ServicesTable";
import { FeedIcon } from "@components/icons/Feed";
import { XIcon } from "@components/icons/X";
import type { Locale } from "@utils/locale";

type Props = {
  initialLocale: Locale;
};

const copy = {
  ja: {
    feedLabel: "フィード登録はこちら:",
    xLabel: "X(旧Twitter)アカウント:",
  },
  en: {
    feedLabel: "Subscribe via feed:",
    xLabel: "X (Twitter) account:",
  },
} as const;

const detectBrowserLocale = (): Locale => {
  if (typeof navigator === "undefined") {
    return "ja";
  }
  const lang = navigator.language.toLowerCase();
  if (lang.startsWith("ja")) {
    return "ja";
  }
  return "en";
};

const HomePage = ({ initialLocale }: Props) => {
  const [locale, setLocale] = useState<Locale>(initialLocale);

  useEffect(() => {
    const browserLocale = detectBrowserLocale();
    setLocale(browserLocale);
  }, []);

  const t = copy[locale];

  return (
    <main className="flex flex-col justify-center items-center md:p-8 p-4 md:mt-16 mt-4 md:mb-32 mb-16">
      <Overview locale={locale} />
      <div className="mt-16 w-full flex justify-center items-center">
        <ServicesTable locale={locale} />
      </div>
      <div className="mt-16 w-full flex justify-center items-center">
        <IncidentsTable locale={locale} />
      </div>
      <div className="w-full max-w-2xl mt-6 flex justify-start items-center">
        <FeedIcon className="text-orange-700 h-4 w-4" />
        <p className="ml-1 text-xs">{t.feedLabel}</p>
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
        <p className="ml-1 text-xs">{t.xLabel}</p>
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
  );
};

export default HomePage;
