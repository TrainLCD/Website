import AppLogo from './AppLogo';
import TinyKittenProduct from './TinyKittenProduct';
import { DiscordIcon } from './icons/Discord';
import { XIcon } from './icons/X';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="md:px-16 px-4 py-10 bg-[#212121] w-full">
      <div className="mb-10 flex items-center">
        <AppLogo className="h-12 w-auto md:border border-[0.5px] rounded border-white" />
        <div className="ml-4 flex flex-col justify-center">
          <p className="text-white font-bold text-xs md:text-sm whitespace-pre-wrap">
            日本全国の鉄道路線で使える 新感覚ナビゲーションアプリ
          </p>
          <p className="text-white font-bold text-lg md:text-2xl mt-1">TrainLCD</p>
        </div>
      </div>

      <div className="border-b border-gray-500" />

      <div className="mt-6 flex flex-col md:flex-row md:justify-between md:items-start text-white gap-10">
        <div>
          <div className="flex gap-3">
            <a
              href="https://x.com/trainlcd"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X(旧Twitter)で@trainlcdをフォロー"
              className="inline-flex items-center justify-center opacity-75 transition hover:opacity-100"
            >
              <XIcon className="h-5 w-auto" />
            </a>
            <a
              href="https://discord.gg/jbVE7tj9SE"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Discordサーバーへ参加"
              className="inline-flex items-center justify-center opacity-75 transition hover:opacity-100"
            >
              <DiscordIcon className="h-5 w-auto" />
            </a>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-3 mt-6 text-sm font-bold">
            <a
              href="https://status.trainlcd.app"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-75 transition hover:opacity-100"
            >
              障害情報
            </a>
            <a
              href="https://tinykitten.me"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-75 transition hover:opacity-100"
            >
              開発者のポートフォリオ
            </a>
            <a href="/privacy-policy" className="opacity-75 transition hover:opacity-100">
              プライバシーポリシー
            </a>
            <a href="/privacy-policy-en" className="opacity-75 transition hover:opacity-100">
              Privacy Policy(English)
            </a>
          </div>
        </div>

        <div className="flex flex-col items-start md:items-end gap-3">
          <a
            href="https://tinykitten.me"
            target="_blank"
            rel="noreferrer noopener"
            className="opacity-75 transition hover:opacity-100"
          >
            <TinyKittenProduct className="h-8 w-auto" />
          </a>
          <p className="text-white text-xs opacity-75 leading-relaxed text-left md:text-right whitespace-pre-wrap">
            © 2019-{currentYear} TinyKitten(Tsubasa SEKIGUCHI)
            {'\n'}and the Volunteer TrainLCD development team.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
