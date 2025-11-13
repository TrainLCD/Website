import Link from 'next/link';
import AppLogo from './AppLogo';
import LanguageSwitcher from './client/LanguageSwitcher';
import type { Locale } from '../server/lib/locale';

type HeaderProps = {
  locale: Locale;
};

const Header = ({ locale }: HeaderProps) => {
  return (
    <header className="border-b h-16 md:px-16 p-4 bg-white sticky top-0 w-full flex items-center justify-between">
      <Link className="inline-flex flex-row items-center" href="/">
        <AppLogo className="h-8 w-auto" />
        <span className="text-neutral-800 font-semibold ml-2 md:text-xl text-lg">
          Status
        </span>
      </Link>
      <LanguageSwitcher currentLocale={locale} />
    </header>
  );
};

export default Header;
