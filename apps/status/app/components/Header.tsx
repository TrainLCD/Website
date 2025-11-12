import Link from 'next/link';
import AppLogo from 'ui/AppLogo';

const Header = () => {
  return (
    <header className="border-b h-16 md:px-16 p-4 bg-white sticky top-0 w-full">
      <Link className="inline-flex flex-row items-center" href="/">
        <AppLogo className="h-8 w-auto" />
        <span className="text-neutral-800 font-semibold ml-2 md:text-xl text-lg">
          Status
        </span>
      </Link>
    </header>
  );
};

export default Header;
