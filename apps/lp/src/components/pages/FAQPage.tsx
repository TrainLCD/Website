import { useMemo, useState } from 'preact/hooks';
import { Marked } from 'marked';
import styles from '../FAQ.module.css';
import Footer from '../Footer';
import Header from '../Header';

const markdownParser = new Marked({
  gfm: true,
  breaks: true,
  renderer: {
    // 回答本文の外部リンクは、ページ内の他の外部リンクと同じく別タブで開く。
    link({ href, tokens }) {
      const text = this.parser.parseInline(tokens);
      const isExternal = /^https?:\/\//.test(href);
      const attrs = isExternal
        ? ' target="_blank" rel="noopener noreferrer"'
        : '';
      return `<a href="${href}"${attrs}>${text}</a>`;
    },
  },
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
        answer: `**電車のあの画面、持ち歩けます。**
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
アプリ内課金や有料プランはなく、すべての機能を無料でお使いいただけます。`,
      },
      {
        question: '広告は表示されますか？',
        answer: `**いいえ、TrainLCDには広告は一切表示されません。**
個人開発のアプリのため、収益目的ではなくユーザー体験を最優先に設計しています。
今後もアプリの基本機能は無料でご利用いただけます。`,
      },
      {
        question: 'アカウント登録は必要ですか？',
        answer: `**いいえ、アカウント登録は不要です。**
氏名・メールアドレス・電話番号などの登録は一切必要ありません。ダウンロードしてすぐにご利用いただけます。`,
      },
      {
        question: 'オープンソースですか？',
        answer: `**はい、アプリ本体や駅データAPIのソースコードをGitHubで公開しています。**
不具合の報告や機能の提案、コードの改善提案も歓迎しています。

- [TrainLCD/MobileApp](https://github.com/TrainLCD/MobileApp) — アプリ本体
- [TrainLCD/StationAPI](https://github.com/TrainLCD/StationAPI) — 駅データAPI`,
      },
      {
        question: 'オフラインでも使えますか？',
        answer: `**乗車中の駅表示など、一部の機能はオフラインでもご利用いただけます。**
路線を選択したあとは駅の情報を端末側に保持しているため、トンネルや地下などで一時的に通信が途切れても案内は継続します。

ただし、以下の機能にはインターネット接続が必要です。

- 路線・駅の検索、経路検索
- AIへの行き先相談
- サーバー側で音声を合成する場合の自動アナウンス（通信できないときは端末内蔵の音声に切り替わります）

オフラインの状態が続く場合は、アプリ内に通信状態に関する警告が表示されます。`,
      },
    ],
  },
  {
    category: '機能について',
    items: [
      {
        question: 'どのような機能がありますか？',
        answer: `**乗車中の案内を中心に、次のような機能をご用意しています。**

- 現在地と次の停車駅、乗り換え路線のリアルタイム表示
- 目的地までの経路検索と、よく使う経路のプリセット保存
- 次の駅を読み上げる自動アナウンス
- 逆方向に進んでいるときの逆走通知
- ホーム画面ウィジェット・ロック画面ウィジェット・ライブアクティビティ
- Apple Watch / Wear OS対応
- 鉄道会社をイメージした12種類のテーマ`,
      },
      {
        question: '位置情報を使わずに走行中の表示を試せますか？',
        answer: `**はい、「オートモード」をご利用ください。**
オートモードを有効にすると、実際の位置情報とは関係なく、選択した路線を一定間隔で自動的に進みます。乗車していないときに画面を試したい場合にもお使いいただけます。`,
      },
      {
        question: '行きたい駅の名前がわからないときはどうすればいいですか？',
        answer: `**経路検索画面のバナーから、AIに行き先を相談できます。**
「海が見える駅に行きたい」「温泉のある観光地に行きたい」のように、ことばで希望を伝えると行き先の候補をご提案します。アプリの使い方に関する質問にもお答えします。

提案する駅は実在する駅データと照合しているため、存在しない駅がご提案されることはありません。ただしAIの提案には誤りが含まれる場合がありますので、最終的なご判断はご自身でお願いします。なお、負荷対策のため1日あたりの利用回数に上限を設けています。`,
      },
      {
        question: 'よく使う経路を保存できますか？',
        answer: `**はい、「プリセット」として保存できます。**
保存したプリセットは次回からワンタップで呼び出せるほか、ホーム画面ウィジェットからも起動できます。行き先や始発駅で絞り込まず、停車パターンだけを保存することもできます。`,
      },
      {
        question: '駅名を音声で読み上げてくれますか？',
        answer: `**はい、「自動アナウンス」機能で次の駅などを読み上げます。**
日本語・英語に対応しており、バックグラウンド再生を有効にすれば画面を消していてもアナウンスが流れます。

読み上げには、サーバー側で合成した音声を再生する方式と、端末に内蔵された読み上げ機能を使う方式があります。現在は **iOSがサーバー側での合成、Androidが端末内蔵の読み上げ** を既定としており、どちらを使うかはアプリの配信設定によって変わる場合があります。

- サーバー側で合成する場合、通信できないときはその回だけ端末内蔵の音声に切り替わります
- 端末内蔵の読み上げを使う場合、音質は端末にインストールされている音声データに依存します

なお、バックグラウンド再生中はマナーモードでも音声が流れますので、車内でのご利用時はご注意ください。`,
      },
      {
        question: '画面のデザインは変えられますか？',
        answer: `**はい、鉄道会社の車内案内表示器をイメージした12種類のテーマからお選びいただけます。**
東京メトロ、都営地下鉄、JR山手線、JR西日本、東急東横線、JR埼京線、LED（E531系）、JR横須賀・総武快速線、JR常磐線各駅停車、JR九州、小田急電鉄、E231系のテーマをご用意しています。

「自動」を選ぶと、乗車中の路線に応じてテーマが自動的に切り替わります。`,
      },
      {
        question: '日本語以外の表示に対応していますか？',
        answer: `**駅名の表示は日本語・英語・中国語・韓国語に対応しています。**
設定画面から表示する言語と、その表示順を選べます。アプリのメニューなどの表示は、端末の言語設定に応じて日本語または英語になります。`,
      },
      {
        question: '逆方向の電車に乗ってしまった場合はどうなりますか？',
        answer: `**「逆走通知」を有効にしていると、設定した行き先と逆方向に進んでいる場合に通知でお知らせします。**
環状線の場合は到着自体は可能なため、遠回りになる旨をお知らせします。`,
      },
      {
        question: 'ホーム画面やロック画面から乗車状況を確認できますか？',
        answer: `**はい、iOS・Androidの両方でホーム画面ウィジェットに対応しています。**
乗車中の路線・方面を表示するウィジェットと、保存済みプリセットの一覧を表示するウィジェットをご用意しています。

iOSではさらに、ロック画面ウィジェット・ロック画面コントロール・ライブアクティビティにも対応しており、アプリを開かずに次の停車駅を確認できます。`,
      },
      {
        question: 'スマートウォッチで使えますか？',
        answer: `**はい、Apple WatchとWear OS搭載のスマートウォッチに対応しています。**
手首を見るだけで、現在停車している駅や次に停まる駅を確認できます。Apple WatchではSmart Stackへのライブアクティビティ表示にも対応しています。

なお、Wear OS搭載のスマートウォッチをご利用の場合は、Androidスマートフォンとペアリングされている必要があります。`,
      },
      {
        question: 'App Clipとは何ですか？（iOS）',
        answer: `**アプリをインストールせずに、TrainLCDの基本機能をその場でお試しいただける仕組みです。**
リンクやコードからすぐに起動できます。ただしApp Clipでは、LEDテーマや自動アナウンスのバックグラウンド再生など一部の機能をご利用いただけません。継続してお使いいただく場合は、App Storeから完全版をダウンロードしてください。`,
      },
    ],
  },
  {
    category: 'プライバシー',
    items: [
      {
        question: '経路の選択や検索の際に、位置情報はどのように扱われますか？',
        answer: `**TrainLCDでは、最寄り駅や現在乗車中の駅を判定するためにのみ、現在地（緯度・経度）をサーバーへ送信します。**
これは周囲の駅との距離を計算し、出発駅の自動選択や乗車中の駅の判定を行うために使用しています。ナビゲーション中はアプリを起動している間、バックグラウンドでも位置情報を取得します。
送信された位置情報は以下のように扱われます：

- 駅の判定以外の目的には使用しません
- サーバー側に保存されません（ログにも残りません）
- 広告・トラッキング用途では一切使用しません

また、**経路検索や路線データの取得時に現在地が送信されることはありません。**`,
      },
      {
        question:
          '位置情報の使用を許可しない場合、アプリはどのように動作しますか？',
        answer: `**位置情報の使用を許可しない場合でも、手動で路線や駅を選択し、「オートモード」でTrainLCDをご利用いただけます。**
ただし、現在地に基づくリアルタイムの乗車案内など、位置情報を前提とした機能はご利用いただけません。`,
      },
      {
        question: 'AIに行き先を相談した内容はどのように扱われますか？',
        answer: `**会話の内容は行き先の提案を生成する目的にのみ使用します。**
AIの処理はサーバー側で行っており、送信されるのは会話の内容（直近の一定件数のみ）と、駅の候補を絞り込むための乗車中の駅の情報、表示言語の設定です。位置情報そのものは送信されません。会話履歴はアプリ内に保持され、いつでもリセットできます。

詳しくは[プライバシーポリシー第14条](/privacy-policy)をご確認ください。`,
      },
      {
        question: '利用状況の分析やトラッキングは行われますか？',
        answer: `**広告目的のトラッキングは一切行っていません。**
アプリの安定性を確認するため、クラッシュやエラーの情報をSentryへ送信しています。詳しくは[プライバシーポリシー](/privacy-policy)をご確認ください。`,
      },
    ],
  },
  {
    category: '対応路線・対応エリア',
    items: [
      {
        question: 'どの路線に対応していますか？',
        answer: `**TrainLCDは日本全国のJR・私鉄など、ほぼすべての鉄道路線に対応しています。**
詳細な対応路線リストはアプリ内でご確認いただけます。ただし、地下鉄など電波の入りづらい路線、鶴見線など入り組んだ路線は一部サービス保証外となります。`,
      },
      {
        question: '快速や急行などの種別に対応していますか？',
        answer: `**はい、路線ごとに列車種別を選択できます。**
種別を選ぶと、その種別の停車駅に合わせて案内を行います。運行区間の途中で種別が変わる列車についても、変更をお知らせします。`,
      },
      {
        question: '新幹線でも使えますか？',
        answer: `**はい、新幹線でもご利用いただけます。**
東海道・山陽・九州・西九州・東北・上越・山形・秋田・北陸・北海道の各新幹線に対応しています。`,
      },
      {
        question: 'バスには対応していますか？',
        answer: `**都営バスのみ対応しており、その他のバス路線には対応しておりません。**
系統を選択して、鉄道と同じように停留所の案内をご利用いただけます。`,
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
        answer: `**TrainLCDはiPhone、iPad、Apple Watch、Androidスマートフォン・タブレット、Wear OS搭載スマートウォッチに対応しています。**
最新のOSバージョンでのご利用を推奨します。`,
      },
      {
        question: 'iOSの必要バージョンは？',
        answer:
          '**iOS 16.4以降が必要です。** 最新のiOSバージョンでのご利用を推奨します。',
      },
      {
        question: 'Androidの必要バージョンは？',
        answer:
          '**Android 7.0以降が必要です。** 最新のAndroidバージョンでのご利用を推奨します。',
      },
      {
        question: 'スマートウォッチの必要バージョンは？',
        answer: `**Apple WatchはwatchOS 9.6以降、Wear OS搭載スマートウォッチはWear OS 5以降が必要です。**
Apple WatchのSmart Stackへのライブアクティビティ表示には、watchOS 10.6以降が必要です。`,
      },
    ],
  },
  {
    category: 'データソース',
    items: [
      {
        question: '路線データはどこから取得していますか？',
        answer: `**「駅データ.jp」などの路線データをもとに、一部を手動で補正して利用しています。**
実際の運行に合わせた調整も行っており、多くの路線で安定した精度でご利用いただけます。
バス関連のデータは、[東京都交通局](https://www.kotsu.metro.tokyo.jp/)が提供するデータ（[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)）を利用しています。`,
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
ナビゲーション機能をご利用いただくには、位置情報を「常に許可」に設定していただく必要があります。また、屋内や地下では位置情報の精度が低下する場合があります。`,
      },
      {
        question: '地下やトンネルで駅の表示が進みません。',
        answer: `**GPSの電波が届かない区間では、到着予測時刻をもとに駅の進行を推定します。**
それでも実際の位置とずれる場合があるため、地下鉄など電波の入りづらい路線は一部サービス保証外とさせていただいています。位置情報の誤差が大きい場合は、アプリ内に警告が表示されます。`,
      },
      {
        question: 'バッテリーの消費が気になります。',
        answer: `**設定の「バッテリー」から「省電力測位モード」を有効にすると、電池の消費と発熱を抑えられます。**
測位精度を電池優先まで下げ、停車中は測位を自動的に休止します。精度の低下により駅の判定や到着案内が遅れたり、ずれたりする場合があります。なお、端末の省電力モード中は自動的に有効になります。`,
      },
      {
        question: '自動アナウンスが聞こえません。',
        answer: `**まずは端末のメディア音量と、設定の「自動アナウンス」が有効になっているかをご確認ください。**
画面を消した状態で聞くには、バックグラウンド再生を有効にする必要があります。また、サーバーの状況によって機能を一時的に停止している場合がありますので、[サービスステータス](https://status.trainlcd.app)もあわせてご確認ください。`,
      },
      {
        question: 'アプリが正常に動作しない場合はどうすればいいですか？',
        answer: `**まずはアプリの再起動をお試しください。**
それでも解決しない場合は、アプリを最新版にアップデートするか、アプリ内の「フィードバック」機能、または公式Discordサーバーからご連絡ください。`,
      },
      {
        question: '障害情報やメンテナンス情報はどこで確認できますか？',
        answer: `**[サービスステータスのページ](https://status.trainlcd.app)で最新の稼働状況をご確認いただけます。**
X（旧Twitter）の[@trainlcd](https://x.com/trainlcd)でもお知らせしています。`,
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
