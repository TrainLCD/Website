import { useState } from 'preact/hooks';
import styles from '../FAQ.module.css';
import Footer from '../Footer';
import Header from '../Header';

// FAQ項目の型定義
type FAQItem = {
  question: string;
  answer: string;
};

type FAQCategory = {
  category: string;
  items: FAQItem[];
};

// FAQデータ
const faqData: FAQCategory[] = [
  {
    category: 'アプリについて',
    items: [
      {
        question: 'TrainLCDとはどのようなアプリですか？',
        answer:
          'TrainLCDは、日本全国の鉄道路線で使える新感覚のナビゲーションアプリです。電車に乗っている間、現在地をリアルタイムで表示し、次の駅や乗り換え情報を分かりやすく案内します。',
      },
      {
        question: 'アプリは無料で使えますか？',
        answer:
          'はい、TrainLCDは完全無料でご利用いただけます。広告表示もなく、すべての機能を無料でお使いいただけます。',
      },
      {
        question: 'オフラインでも使えますか？',
        answer:
          '一部機能はオフラインでもご利用いただけますが、使用する経路の選択や検索にはインターネット接続が必要です。',
      },
    ],
  },
  {
    category: '対応路線・対応エリア',
    items: [
      {
        question: 'どの路線に対応していますか？',
        answer:
          'TrainLCDは日本全国のJR・私鉄など、ほぼすべての鉄道路線に対応しています。詳細な対応路線リストはアプリ内でご確認いただけます。ただし、地下鉄などの電波の入りづらい路線、鶴見線などの入り組んだ路線は一部サービス保証外となります。またサービス対象は鉄道路線のみであり、バス等の移動手段には対応しておりません。',
      },
      {
        question: '新幹線でも使えますか？',
        answer:
          'はい、新幹線でもご利用いただけます。東海道・山陽・九州・東北・上越・北陸・北海道の各新幹線に対応しています。',
      },
      {
        question: '海外の鉄道には対応していますか？',
        answer:
          '現在は日本国内の鉄道路線のみに対応しており、海外の鉄道には対応しておりません。',
      },
    ],
  },
  {
    category: '動作環境',
    items: [
      {
        question: '対応しているデバイスを教えてください。',
        answer:
          'TrainLCDはiPhone、iPad、Apple Watch、Androidスマートフォン・タブレット、Wear OSに対応しています。最新のOSバージョンでのご利用を推奨します。',
      },
      {
        question: 'iOSの必要バージョンは？',
        answer:
          'iOS 14.0以降が必要です。最新のiOSバージョンでのご利用を推奨します。',
      },
      {
        question: 'Androidの必要バージョンは？',
        answer:
          'Android 6.0以降が必要です。最新のAndroidバージョンでのご利用を推奨します。',
      },
    ],
  },
  {
    category: 'データソース',
    items: [
      {
        question: '路線データはどこから取得していますか？',
        answer:
          '路線データは株式会社コードプラス様が公開するデータを一部独自に拡充したデータを利用しています。データは定期的に更新されます。',
      },
      {
        question: 'データの精度はどのくらいですか？',
        answer:
          '路線データは株式会社コードプラス様が公開するデータを一部独自に拡充したデータを利用しているため、ダイヤ改正直後などは一時的に情報が古い場合があります。',
      },
    ],
  },
  {
    category: '使い方・トラブルシューティング',
    items: [
      {
        question: '位置情報が取得できません。',
        answer:
          'デバイスの設定で位置情報サービスが有効になっているか、TrainLCDアプリに位置情報の使用許可が与えられているかご確認ください。また、屋内や地下では位置情報の精度が低下する場合があります。',
      },
      {
        question: 'バッテリーの消費が気になります。',
        answer:
          'TrainLCDはバックグラウンドでの位置情報取得を最適化していますが、長時間のご利用ではバッテリー消費が発生します。必要に応じてアプリを終了するか、省電力モードをご利用ください。',
      },
      {
        question: 'アプリが正常に動作しない場合はどうすればいいですか？',
        answer:
          'まずはアプリの再起動をお試しください。それでも解決しない場合は、アプリを最新版にアップデートするか、公式のDiscordサーバーやX（旧Twitter）でサポートをご依頼ください。',
      },
    ],
  },
];

// FAQ項目のコンポーネント
const FAQItemComponent = ({ question, answer }: FAQItem) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.faqItem}>
      <button
        className={styles.faqQuestion}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className={styles.questionMark}>Q</span>
        <span className={styles.questionText}>{question}</span>
        <span className={`${styles.icon} ${isOpen ? styles.iconOpen : ''}`}>
          ▼
        </span>
      </button>
      {isOpen && (
        <div className={styles.faqAnswer}>
          <span className={styles.answerMark}>A</span>
          <p className={styles.answerText}>{answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQPage = () => (
  <>
    <Header />
    <div className={styles.wrapper}>
      <main className={styles.container}>
        <header className={styles.headingContainer}>
          <h1 className={styles.title}>FAQ</h1>
          <h2 className={styles.subtitle}>よくある質問</h2>
        </header>

        {faqData.map((category, categoryIndex) => (
          <section key={categoryIndex} className={styles.categorySection}>
            <h3 className={styles.categoryTitle}>{category.category}</h3>
            <div className={styles.faqList}>
              {category.items.map((item, itemIndex) => (
                <FAQItemComponent
                  key={itemIndex}
                  question={item.question}
                  answer={item.answer}
                />
              ))}
            </div>
          </section>
        ))}

        <section className={styles.contactSection}>
          <h3 className={styles.categoryTitle}>その他のお問い合わせ</h3>
          <p className={styles.contactText}>
            上記以外のご質問やサポートが必要な場合は、以下のチャンネルでお問い合わせください。
          </p>
          <div className={styles.contactLinks}>
            <a
              href="https://discord.gg/jbVE7tj9SE"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactLink}
            >
              Discordサーバー
            </a>
            <a
              href="https://x.com/trainlcd"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactLink}
            >
              X（旧Twitter）
            </a>
          </div>
        </section>
      </main>
    </div>
    <Footer />
  </>
);

export default FAQPage;
