import styles from '../PrivacyPolicy.module.css';
import Footer from '../Footer';
import Header from '../Header';

const PrivacyPolicyPage = () => (
  <>
    <Header />
    <div className={styles.wrapper}>
      <main className={styles.container}>
        <header className={styles.headingContainer}>
          <h1 className={styles.title}>Privacy Policy</h1>
          <h2 className={styles.subtitle}>プライバシーポリシー(個人情報保護方針)</h2>
          <aside className={styles.headingMeta}>
            <p>令和2年3月30日 制定</p>
            <p>令和4年7月13日 改定</p>
            <p>屋号TinyKitten(関口 翼)</p>
            <a className={styles.internalLink} href="/privacy-policy-en">
              English version available here.
            </a>
          </aside>
        </header>
        <p className={styles.paragraph}>
          以下では、個人事業主屋号TinyKitten（以下TinyKittenといいます。）が管理、運営するアプリ「TrainLCD」（以下「本アプリ」といいます。）を利用するお客さま（以下「利用者様」といいます。）とTinyKittenとの間に適用される条件等を定めています。利用者様が本アプリを利用する際には、以下の内容に同意の上、ご利用いただくようお願いします。なお、TinyKittenは、適宜、以下の内容を変更することができるものとします。
        </p>
        <p className={styles.paragraph}>
          以下のとおり、TinyKittenの提供する本アプリにおける、利用者様の個人情報の取扱いについて、プライバシーポリシーを定めます。
        </p>
        <h3 className={styles.headingText}>第1条（個人情報）</h3>
        <p className={styles.paragraph}>
          「個人情報」とは，個人情報保護法にいう「個人情報」を指すものとし，生存する個人に関する情報であって，当該情報に含まれる氏名，生年月日，住所，電話番号，連絡先その他の記述等により特定の個人を識別できる情報及び容貌，指紋，声紋にかかるデータ，及び健康保険証の保険者番号などの当該情報単体から特定の個人を識別できる情報（個人識別情報）及び利用者様のスマートフォンから取得した位置情報を指します。
        </p>
        <h3 className={styles.headingText}>第2条（個人情報の収集方法）</h3>
        <p className={styles.paragraph}>
          TinyKittenは，ユーザーが利用登録をする際に氏名，生年月日，住所，電話番号，メールアドレス，銀行口座番号，クレジットカード番号，運転免許証番号などの個人情報をお尋ねすることは一切ありません。ただし、利用者様の位置情報は本アプリの特性上一時的に取得いたしますが、サーバー上で一切保管しません。
        </p>
        <h3 className={styles.headingText}>第3条（個人情報を収集・利用する目的）</h3>
        <p className={styles.paragraph}>
          TinyKittenが個人情報を収集・利用する目的は，以下のとおりです。
        </p>
        <ol className={styles.list}>
          <li>本アプリの提供・運営のため</li>
        </ol>
        <h3 className={styles.headingText}>第4条（利用目的の変更）</h3>
        <ol className={styles.list}>
          <li>
            TinyKittenは，利用目的が変更前と関連性を有すると合理的に認められる場合に限り，個人情報の利用目的を変更するものとします。
          </li>
          <li>
            利用目的の変更を行った場合には，変更後の目的について，TinyKitten所定の方法により，ユーザーに通知し，または本ウェブサイト上に公表するものとします。
          </li>
        </ol>
        <h3 className={styles.headingText}>第5条（プライバシーポリシーの変更）</h3>
        <ol className={styles.list}>
          <li>
            本ポリシーの内容は，法令その他本ポリシーに別段の定めのある事項を除いて，ユーザーに通知することなく，変更することができるものとします。
          </li>
          <li>
            TinyKittenが別途定める場合を除いて，変更後のプライバシーポリシーは，本ウェブサイトに掲載したときから効力を生じるものとします。
          </li>
        </ol>
        <h3 className={styles.headingText}>第6条（お問い合わせ窓口）</h3>
        <p className={styles.paragraph}>
          本ポリシーに関するお問い合わせは，下記の窓口までお願いいたします。
        </p>
        <ul className={styles.list}>
          <li>名前: TinyKitten(関口 翼)</li>
          <li>Eメールアドレス： trainlcd@tinykitten.me</li>
        </ul>
        <h3 className={styles.headingText}>第7条（Google Analyticsの利用について）</h3>
        <p className={styles.paragraph}>
          当サイトおよび本アプリでは、サイトおよびアプリの利用状況を把握するためにGoogle Analyticsを利用しています。Google Analyticsは、サイト側ではクッキーを利用して利用者様の情報を収集し、 アプリ側ではアプリの各起動ごとに自動的に割り当てられた割り当てられたIDを収集しますが、 ユーザーの個人情報とは関連付けられません。Google Analyticsの利用規約及びプライバシーポリシーに関する説明については、Google Analyticsのサイトをご覧ください。
          <br />
          なお、Google Analyticsのサービス利用による損害については、TinyKittenは責任を負わないものとします。
        </p>
        <h3 className={styles.headingText}>第8条（Sentryの利用について）</h3>
        <p className={styles.paragraph}>
          本アプリでは、アプリの安定性を把握するためにFunctional Software社のサービスである
          <a
            href="https://sentry.io/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.externalLink}
          >
            Sentry
          </a>
          を利用しています。
          本アプリのご利用中に生じたエラーについて必要最低限の情報がFunctional Software社のサーバーに送信されます。TinyKittenは、Functional Software社からその分析結果を受け取り、利用者様のエラー状況を把握します。Sentryにより収集、記録、分析された利用者様の情報には、特定の個人を識別する情報は一切含まれません。Sentryの
          <a
            href="https://sentry.io/terms/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.externalLink}
          >
            利用規約
          </a>
          及び
          <a
            href="https://sentry.io/privacy/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.externalLink}
          >
            プライバシーポリシー
          </a>
          に関する説明については、Sentryのサイトをご覧ください。
        </p>
        <h3 className={styles.headingText}>第9条（フィードバック機能の利用について）</h3>
        <p className={styles.paragraph}>
          本アプリの「フィードバック」機能では、必要最低限の情報がTinyKittenが独自に開発したシステムに送信されます。
          <br />
          フィードバック機能により収集、記録、分析された利用者様の情報には、特定の個人を識別する情報は一切含まれません。
          <br />
          また、システムにより収集、記録、分析された情報は、TinyKittenの定める一定の期間保管されます。
        </p>
      </main>
    </div>
    <Footer />
  </>
);

export default PrivacyPolicyPage;
