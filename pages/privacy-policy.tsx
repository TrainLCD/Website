import Head from 'next/head';
import styles from '../styles/pages/PrivacyPolicy.module.css';

const PrivacyPolicy: React.FC = () => {
  return (
    <main className={styles.main}>
      <Head>
        <title>プライバシーポリシー - TrainLCD</title>
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <meta name="theme-color" content="#03A9F4" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#03a9f4" />
        <meta name="msapplication-TileColor" content="#03a9f4" />
        <meta property="og:title" content="プライバシーポリシー" />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content="https://trainlcd.tinykitten.me/privacy-policy"
        />
        <meta
          property="og:image"
          content="https://trainlcd.tinykitten.me/ogp.png"
        />
        <meta property="og:image:width" content="1266" />
        <meta property="og:image:height" content="585" />
        <meta
          property="og:description"
          content="TrainLCDは、位置情報と連動して電車のLCDを再現するアプリです。"
        />
        <meta property="og:site_name" content="TrainLCD" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@tinykitten8" />
        <meta name="twitter:creator" content="@tinykitten8" />
        <meta property="fb:app_id" content="596269604527027" />
      </Head>
      <header className={styles.policyHeading}>
        <h1 className={styles.title}>Privacy Policy</h1>
        <h2 className={styles.subtitle}>
          プライバシーポリシー(個人情報保護方針)
        </h2>
        <aside className={styles.meta}>
          <p>令和2年3月30日 制定</p>
          <p>屋号TinyKitten(関口 翼)</p>
          <a className={styles.link} href="/privacy-policy-en">
            English version available here.
          </a>
        </aside>
      </header>
      <p className={styles.text}>
        以下では、個人事業主屋号TinyKitten（以下TinyKittenといいます。）が管理、運営するアプリ「TrainLCD」（以下「本アプリ」といいます。）を利用するお客さま（以下「利用者」といいます。）とTinyKittenとの間に適用される条件等を定めています。利用者が本アプリを利用する際には、以下の内容に同意の上、ご利用いただくようお願いします。なお、TinyKittenは、適宜、以下の内容を変更することができるものとします。
      </p>
      <p className={styles.text}>
        以下のとおり、TinyKittenの提供する本アプリにおける、利用者の個人情報の取扱いについて、プライバシーポリシーを定めます。
      </p>
      <h3 className={styles.heading}>第1条（個人情報）</h3>
      <p className={styles.text}>
        「個人情報」とは，個人情報保護法にいう「個人情報」を指すものとし，生存する個人に関する情報であって，当該情報に含まれる氏名，生年月日，住所，電話番号，連絡先その他の記述等により特定の個人を識別できる情報及び容貌，指紋，声紋にかかるデータ，及び健康保険証の保険者番号などの当該情報単体から特定の個人を識別できる情報（個人識別情報）及び利用者のスマートフォンから取得した位置情報を指します。
      </p>
      <h3 className={styles.heading}>第2条（個人情報の収集方法）</h3>
      <p className={styles.text}>
        TinyKittenは，ユーザーが利用登録をする際に氏名，生年月日，住所，電話番号，メールアドレス，銀行口座番号，クレジットカード番号，運転免許証番号などの個人情報をお尋ねすることは一切ありません。ただし、利用者の位置情報は本アプリの特性上一時的に取得いたしますが、サーバー上で一切保管しません。
      </p>
      <h3 className={styles.heading}>第3条（個人情報を収集・利用する目的）</h3>
      <p className={styles.text}>
        TinyKittenが個人情報を収集・利用する目的は，以下のとおりです。
      </p>
      <ol className={styles.list}>
        <li className={styles.listItem}>本アプリの提供・運営のため</li>
      </ol>
      <h3 className={styles.heading}>第4条（利用目的の変更）</h3>
      <ol className={styles.list}>
        <li className={styles.listItem}>
          TinyKittenは，利用目的が変更前と関連性を有すると合理的に認められる場合に限り，個人情報の利用目的を変更するものとします。
        </li>
        <li className={styles.listItem}>
          利用目的の変更を行った場合には，変更後の目的について，TinyKitten所定の方法により，ユーザーに通知し，または本ウェブサイト上に公表するものとします。
        </li>
      </ol>
      <h3 className={styles.heading}>第5条（プライバシーポリシーの変更）</h3>
      <ol className={styles.list}>
        <li className={styles.listItem}>
          本ポリシーの内容は，法令その他本ポリシーに別段の定めのある事項を除いて，ユーザーに通知することなく，変更することができるものとします。
        </li>
        <li className={styles.listItem}>
          TinyKittenが別途定める場合を除いて，変更後のプライバシーポリシーは，本ウェブサイトに掲載したときから効力を生じるものとします。
        </li>
      </ol>
      <h3 className={styles.heading}>第6条（お問い合わせ窓口）</h3>
      <p className={styles.text}>
        本ポリシーに関するお問い合わせは，下記の窓口までお願いいたします。
      </p>
      <ul className={styles.list}>
        <li className={styles.listItem}>名前: TinyKitten(関口 翼)</li>
        <li className={styles.listItem}>Eメールアドレス： ts@tinykitten.me</li>
      </ul>
    </main>
  );
};

export default PrivacyPolicy;
