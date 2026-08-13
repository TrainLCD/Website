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
            <p>令和8年8月13日 改定</p>
            <p>屋号TinyKitten(関口 翼)</p>
            <a className={styles.internalLink} href="/privacy-policy-en">
              English version available here.
            </a>
          </aside>
        </header>
        <p className={styles.paragraph}>
          以下では、個人事業主屋号TinyKitten（以下TinyKittenといいます。）が管理、運営するアプリ「TrainLCD」（以下「本アプリ」といいます。）および本ウェブサイト（以下「本サイト」といいます。）を利用するお客さま（以下「利用者様」といいます。）とTinyKittenとの間に適用される条件等を定めています。利用者様が本アプリまたは本サイトを利用する際には、以下の内容に同意の上、ご利用いただくようお願いします。なお、TinyKittenは、適宜、以下の内容を変更することができるものとします。
        </p>
        <p className={styles.paragraph}>
          以下のとおり、TinyKittenの提供する本アプリおよび本サイトにおける、利用者様の個人情報の取扱いについて、プライバシーポリシーを定めます。
        </p>
        <h3 className={styles.headingText}>第1条（個人情報）</h3>
        <p className={styles.paragraph}>
          「個人情報」とは、個人情報保護法にいう「個人情報」を指すものとし、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日、住所、電話番号、連絡先その他の記述等により特定の個人を識別できる情報及び容貌、指紋、声紋にかかるデータ、及び健康保険証の保険者番号などの当該情報単体から特定の個人を識別できる情報（個人識別情報）及び利用者様のスマートフォンから取得した位置情報を指します。
        </p>
        <h3 className={styles.headingText}>第2条（個人情報の収集方法）</h3>
        <p className={styles.paragraph}>
          TinyKittenは、利用者様が本アプリを利用するにあたり、氏名、生年月日、住所、電話番号、メールアドレス、銀行口座番号、クレジットカード番号、運転免許証番号などの個人情報をお尋ねすることは一切ありません。本アプリのご利用にあたって、アカウントの登録は必要ありません。
        </p>
        <p className={styles.paragraph}>
          TinyKittenが本アプリの提供にあたり取得する情報は、以下のとおりです。
        </p>
        <ol className={styles.list}>
          <li>利用者様の端末から取得する位置情報（第4条）</li>
          <li>端末ごとに自動的に生成される匿名の識別子（第5条）</li>
          <li>本アプリの利用中に発生したエラーに関する情報（第11条）</li>
          <li>利用者様が「フィードバック」機能から任意で送信された内容（第15条）</li>
        </ol>
        <h3 className={styles.headingText}>第3条（個人情報を収集・利用する目的）</h3>
        <p className={styles.paragraph}>
          TinyKittenが個人情報を収集・利用する目的は、以下のとおりです。
        </p>
        <ol className={styles.list}>
          <li>本アプリおよび本サイトの提供・運営のため</li>
          <li>本アプリの不具合の調査、ならびに品質の維持および改善のため</li>
          <li>利用者様からのお問い合わせやご意見に対応するため</li>
        </ol>
        <h3 className={styles.headingText}>第4条（位置情報の取扱い）</h3>
        <p className={styles.paragraph}>
          本アプリは、その特性上、利用者様の端末から位置情報（緯度・経度）を取得します。位置情報の取扱いは以下のとおりです。
        </p>
        <ol className={styles.list}>
          <li>
            位置情報は、最寄り駅の判定、および乗車中の駅・進行方向の判定のためにのみ利用します。
          </li>
          <li>
            ナビゲーション機能をご利用いただいている間は、本アプリの起動中に限り、バックグラウンドにおいても位置情報を取得します。
          </li>
          <li>
            取得した位置情報は、駅の判定のために一時的にTinyKittenの管理するサーバーへ送信されますが、サーバー上に保管されることはありません。
          </li>
          <li>
            位置情報を、広告の配信や利用者様の行動の追跡（トラッキング）のために利用することは一切ありません。また、これらの目的で第三者へ提供することもありません。
          </li>
          <li>
            位置情報の取得は、端末の設定からいつでも停止することができます。位置情報の利用を許可されない場合でも、「オートモード」など位置情報を必要としない機能はご利用いただけます。
          </li>
        </ol>
        <h3 className={styles.headingText}>第5条（端末識別子の取扱い）</h3>
        <p className={styles.paragraph}>
          本アプリは、アカウントの登録を必要としない代わりに、インストールごとに自動的に生成される匿名の識別子を端末内に保存し、サーバーとの通信における認証、および一部機能の利用回数の制限のために利用します。この識別子は、氏名やメールアドレスなど特定の個人を識別できる情報とは関連付けられません。また、本アプリを削除した場合には、この識別子は失われます。
        </p>
        <h3 className={styles.headingText}>第6条（個人情報の第三者提供）</h3>
        <p className={styles.paragraph}>
          TinyKittenは、法令に基づく場合を除き、あらかじめ利用者様の同意を得ることなく、個人情報を第三者に提供することはありません。ただし、本アプリおよび本サイトの提供に必要な範囲において、第10条以下に定める外部サービスへ情報を送信する場合があります。
        </p>
        <h3 className={styles.headingText}>第7条（利用目的の変更）</h3>
        <ol className={styles.list}>
          <li>
            TinyKittenは、利用目的が変更前と関連性を有すると合理的に認められる場合に限り、個人情報の利用目的を変更するものとします。
          </li>
          <li>
            利用目的の変更を行った場合には、変更後の目的について、TinyKitten所定の方法により、ユーザーに通知し、または本ウェブサイト上に公表するものとします。
          </li>
        </ol>
        <h3 className={styles.headingText}>第8条（プライバシーポリシーの変更）</h3>
        <ol className={styles.list}>
          <li>
            本ポリシーの内容は、法令その他本ポリシーに別段の定めのある事項を除いて、ユーザーに通知することなく、変更することができるものとします。
          </li>
          <li>
            TinyKittenが別途定める場合を除いて、変更後のプライバシーポリシーは、本ウェブサイトに掲載したときから効力を生じるものとします。
          </li>
        </ol>
        <h3 className={styles.headingText}>第9条（お問い合わせ窓口）</h3>
        <p className={styles.paragraph}>
          本ポリシーに関するお問い合わせは、下記の窓口までお願いいたします。
        </p>
        <ul className={styles.list}>
          <li>名前: TinyKitten(関口 翼)</li>
          <li>Eメールアドレス： trainlcd@tinykitten.me</li>
        </ul>
        <h3 className={styles.headingText}>第10条（Google Analyticsの利用について）</h3>
        <p className={styles.paragraph}>
          本サイトでは、サイトの利用状況を把握するためにGoogle Analyticsを利用しています。Google Analyticsは、クッキーを利用して利用者様の情報を収集しますが、利用者様の個人情報とは関連付けられません。Google Analyticsの利用規約及びプライバシーポリシーに関する説明については、Google Analyticsのサイトをご覧ください。
          <br />
          なお、Google Analyticsのサービス利用による損害については、TinyKittenは責任を負わないものとします。また、本アプリではGoogle Analyticsを利用しておりません。
        </p>
        <h3 className={styles.headingText}>第11条（Sentryの利用について）</h3>
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
        <h3 className={styles.headingText}>第12条（Cloudflareの利用について）</h3>
        <p className={styles.paragraph}>
          本アプリのバックエンドおよび本サイトは、Cloudflare, Inc.の提供するサービス上で稼働しています。そのため、本アプリおよび本サイトとサーバーとの間の通信は、同社のネットワークを経由します。同社における情報の取扱いについては、
          <a
            href="https://www.cloudflare.com/privacypolicy/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.externalLink}
          >
            Cloudflareのプライバシーポリシー
          </a>
          をご覧ください。
        </p>
        <h3 className={styles.headingText}>第13条（自動アナウンス機能について）</h3>
        <p className={styles.paragraph}>
          本アプリの「自動アナウンス」機能における読み上げには、サーバー側で音声を合成する方式（以下「リモート合成」といいます。）と、端末に内蔵された音声合成機能を利用する方式があります。いずれの方式を利用するかは、ご利用の環境およびTinyKittenが配信する設定により決まります。本ポリシーの改定時点においては、iOS版はリモート合成を、Android版は端末に内蔵された音声合成機能を既定としています。
        </p>
        <p className={styles.paragraph}>
          リモート合成を利用する場合、読み上げる案内文（駅名や路線名などを含む文章）をOpenAI, L.L.C.の提供する音声合成サービスへ送信します。送信される情報に、位置情報や利用者様を識別する情報は一切含まれません。合成された音声は、同一の案内文を繰り返し合成することを避けるため、TinyKittenの管理するサーバーに一定の期間保管されます。
          <br />
          端末に内蔵された音声合成機能を利用する場合、読み上げのために外部へ情報が送信されることはありません。
        </p>
        <h3 className={styles.headingText}>第14条（AIによる行き先相談機能について）</h3>
        <p className={styles.paragraph}>
          本アプリの「AIに行き先を相談」機能では、応答を生成するために、以下の情報をOpenAI, L.L.C.およびCloudflare, Inc.の提供するAIサービスへ送信します。
        </p>
        <ol className={styles.list}>
          <li>利用者様が入力された文章、および本機能における直近の会話の内容</li>
          <li>
            提案する駅を絞り込むための、乗車中の駅に関する情報（位置情報そのものは送信されません）
          </li>
          <li>本アプリの表示言語の設定</li>
        </ol>
        <p className={styles.paragraph}>
          送信された会話の内容は、応答の生成のためにのみ利用し、TinyKittenのサーバーに保管することはありません。会話の履歴は利用者様の端末内にのみ保持され、本アプリの操作によりいつでも消去することができます。また、本機能の適正な運用のため、第5条の匿名の識別子を用いて1日あたりの利用回数を制限しています。
          <br />
          本機能に、氏名、連絡先その他の個人を特定できる情報を入力しないようお願いいたします。
        </p>
        <h3 className={styles.headingText}>第15条（フィードバック機能の利用について）</h3>
        <p className={styles.paragraph}>
          本アプリの「フィードバック」機能では、以下の情報がTinyKittenが独自に開発したシステムに送信されます。
        </p>
        <ol className={styles.list}>
          <li>利用者様が入力された本文</li>
          <li>利用者様が任意で添付されたスクリーンショット</li>
          <li>
            端末の機種名、OSの名称およびバージョン、言語設定などの端末に関する情報
          </li>
          <li>本アプリのバージョン、および第5条の匿名の識別子</li>
        </ol>
        <p className={styles.paragraph}>
          これらの情報には、特定の個人を識別する情報は含まれません。ただし、利用者様が本文またはスクリーンショットに個人情報を含めて送信された場合は、この限りではありません。
        </p>
        <p className={styles.paragraph}>
          送信された内容は、不具合の調査および本アプリの改善のために利用し、TinyKittenの定める一定の期間保管されます。また、内容の分類および要約のためにCloudflare, Inc.の提供するAIサービスを利用するほか、対応状況を管理する目的で、TinyKittenが管理する非公開のGitHubリポジトリおよびDiscordのチャンネルへ転送します。添付されたスクリーンショットは、推測が困難な固有のURLで保管されますが、当該URLを知る第三者は閲覧が可能です。
        </p>
      </main>
    </div>
    <Footer />
  </>
);

export default PrivacyPolicyPage;
