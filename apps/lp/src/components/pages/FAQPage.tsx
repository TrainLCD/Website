import { useMemo, useState } from 'preact/hooks';
import { Marked } from 'marked';
import styles from '../FAQ.module.css';
import Footer from '../Footer';
import Header from '../Header';

const markdownParser = new Marked({
  gfm: true,
  breaks: true,
});

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
        answer: `**TrainLCDは、日本全国の鉄道路線で使える新感覚ナビゲーションアプリです。**
電車に乗っている間、現在地をリアルタイムで表示し、次の駅や乗り換え情報をわかりやすくご案内します。`,
      },
      {
        question: '開発者は誰ですか？',
        answer: `TrainLCDは都内在住のクリエイター **TinyKitten（関口 翼）** が個人で開発・運営しています。
大半のコードをオープンソースとして公開し、透明性の高い運用を心がけています。`,
      },
      {
        question: 'アプリは無料で使えますか？',
        answer: `**はい、TrainLCDは完全無料でご利用いただけます。**
広告表示もなく、すべての機能を無料でお使いいただけます。`,
      },
      {
        question: '広告は表示されますか？',
        answer: `**いいえ、TrainLCDには広告は一切表示されません。**
個人開発のアプリのため、収益目的ではなくユーザー体験を最優先に設計しています。
今後もアプリの基本機能は無料でご利用いただけます。`,
      },
      {
        question: 'オフラインでも使えますか？',
        answer: `**一部機能はオフラインでもご利用いただけます。**
ただし、経路の選択や検索にはインターネット接続が必要です。`,
      },
    ],
  },
  {
    category: 'プライバシー',
    items: [
      {
        question: '経路の選択や検索の際に、位置情報はどのように扱われますか？',
        answer: `**TrainLCDでは、最寄り駅を判定するためにのみ、一時的に現在地（緯度・経度）をアプリ内部のサーバーへ送信する場合があります。**
これは周囲の駅との距離を計算し、出発駅を自動で選択するために使用しています。
送信された位置情報は以下のように扱われます：

- 駅の判定以外の目的には使用しません
- サーバー側に保存されません（ログにも残りません）
- 広告・トラッキング用途では一切使用しません

また、**経路検索や路線データの取得時に現在地が送信されることはありません。**`,
      },
      {
        question:
          '位置情報の使用を許可しない場合、アプリはどのように動作しますか？',
        answer: `**位置情報の使用を許可しない場合でも、手動で駅や路線を選択することでTrainLCDをご利用いただけます。**
ただし、自動的な現在地表示やリアルタイムの乗車案内など、一部の機能が制限される場合があります。`,
      },
    ],
  },
  {
    category: '対応路線・対応エリア',
    items: [
      {
        question: 'どの路線に対応していますか？',
        answer: `**TrainLCDは日本全国のJR・私鉄など、ほぼすべての鉄道路線に対応しています。**
詳細な対応路線リストはアプリ内でご確認いただけます。ただし、地下鉄など電波の入りづらい路線、鶴見線など入り組んだ路線は一部サービス保証外となります。
また、サービス対象は鉄道路線のみで、バス等の移動手段には対応しておりません。`,
      },
      {
        question: '新幹線でも使えますか？',
        answer: `**はい、新幹線でもご利用いただけます。**
東海道・山陽・九州・東北・上越・北陸・北海道の各新幹線に対応しています。`,
      },
      {
        question: '海外の鉄道には対応していますか？',
        answer: '**いいえ、現時点では日本国内の鉄道路線のみ対応しています。**',
      },
    ],
  },
  {
    category: '動作環境',
    items: [
      {
        question: '対応しているデバイスを教えてください。',
        answer: `**TrainLCDはiPhone、iPad、Apple Watch、Androidスマートフォン・タブレット、Wear OSに対応しています。**
最新のOSバージョンでのご利用を推奨します。`,
      },
      {
        question: 'iOSの必要バージョンは？',
        answer:
          '**iOS 15.1以降が必要です。** 最新のiOSバージョンでのご利用を推奨します。',
      },
      {
        question: 'Androidの必要バージョンは？',
        answer:
          '**Android 7.0以降が必要です。** 最新のAndroidバージョンでのご利用を推奨します。',
      },
    ],
  },
  {
    category: 'データソース',
    items: [
      {
        question: '路線データはどこから取得していますか？',
        answer: `**「駅データ.jp」などの路線データをもとに、一部を手動で補正して利用しています。**
実際の運行に合わせた調整も行っており、多くの路線で安定した精度でご利用いただけます。`,
      },
      {
        question: 'データの精度はどのくらいですか？',
        answer: `**実運行に合わせて継続的に補正しているため、ほとんどの路線で安定した精度です。**
ダイヤ改正や工事による変更があった場合など、まれに誤差が生じることがあります。`,
      },
      {
        question:
          '駅データや路線データの間違いを見つけました。どこに報告すればいいですか？',
        answer: `**アプリ内の「フィードバック」機能、または公式Discordサーバーからご連絡ください。**
いただいた情報をもとに、データ修正を順次行っています。`,
      },
    ],
  },
  {
    category: '使い方・トラブルシューティング',
    items: [
      {
        question: '位置情報が取得できません。',
        answer: `**デバイスの設定で位置情報サービスが有効になっているか、TrainLCDアプリに位置情報の使用許可が与えられているかご確認ください。**
また、屋内や地下では位置情報の精度が低下する場合があります。`,
      },
      {
        question: 'バッテリーの消費が気になります。',
        answer: `**TrainLCDはバックグラウンドでの位置情報取得を最適化していますが、長時間のご利用ではバッテリー消費が発生します。**
必要に応じてアプリを終了するか、省電力モードをご利用ください。`,
      },
      {
        question: 'アプリが正常に動作しない場合はどうすればいいですか？',
        answer: `**まずはアプリの再起動をお試しください。**
それでも解決しない場合は、アプリを最新版にアップデートするか、アプリ内の「フィードバック」機能、または公式Discordサーバーからご連絡ください。`,
      },
    ],
  },
];

// FAQ項目のコンポーネント
const FAQItemComponent = ({
  question,
  answer,
  id,
}: FAQItem & { id: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const answerId = `answer-${id}`;
  const questionId = `question-${id}`;
  const renderedAnswer = useMemo(
    () => markdownParser.parse(answer) as string,
    [answer]
  );

  return (
    <div className={styles.faqItem}>
      <button
        className={styles.faqQuestion}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={answerId}
        aria-label={`質問: ${question}`}
      >
        <span className={styles.questionMark}>Q</span>
        <span id={questionId} className={styles.questionText}>
          {question}
        </span>
        <span className={`${styles.icon} ${isOpen ? styles.iconOpen : ''}`}>
          ▼
        </span>
      </button>
      {isOpen && (
        <section
          id={answerId}
          aria-labelledby={questionId}
          className={styles.faqAnswer}
        >
          <span className={styles.answerMark}>A</span>
          <div
            className={styles.answerText}
            dangerouslySetInnerHTML={{ __html: renderedAnswer }}
          />
        </section>
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

        {faqData.map((category) => (
          <section key={category.category} className={styles.categorySection}>
            <h3 className={styles.categoryTitle}>{category.category}</h3>
            <div className={styles.faqList}>
              {category.items.map((item, itemIndex) => (
                <FAQItemComponent
                  key={`${category.category}-${itemIndex}`}
                  id={`${category.category}-${itemIndex}`}
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
              href="https://discord.gg/tsemdME9Nz"
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
