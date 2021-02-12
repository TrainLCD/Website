import Head from 'next/head';
import styles from '../styles/pages/PrivacyPolicy.module.css';

const PrivacyPolicy: React.FC = () => {
  return (
    <main className={styles.main}>
      <Head>
        <title>Privacy Policy - TrainLCD</title>
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
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#03a9f4" />
        <meta name="msapplication-TileColor" content="#03a9f4" />
        <meta property="og:title" content="Privacy Policy" />
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
        <aside className={styles.meta}>
          <p>Last updated: March 30, 2020</p>
          <p>TinyKitten(Tsubasa SEKIGUCHI)</p>
          <a className={styles.link} href="/privacy-policy">
            日本語版
          </a>
        </aside>
      </header>
      <p className={styles.text}>
        In the following, customers who use the application
        &ldquo;TrainLCD&ldquo; (hereinafter referred to as &ldquo;this
        application&ldquo;) managed and operated by TinyKitten (hereafter
        referred to as TinyKitten), the sole owner of the business owner
        (hereinafter referred to as &ldquo;user&ldquo;) ) And TinyKitten. When
        using this application, please agree to the following and use it. In
        addition, TinyKitten shall be able to change the following contents as
        appropriate.
      </p>
      <p className={styles.text}>
        The privacy policy for the handling of user&lsquo;s personal information
        in this application provided by TinyKitten is as follows.
      </p>
      <h3 className={styles.heading}>1.Personal information</h3>
      <p className={styles.text}>
        “Personal information” refers to “personal information” as defined in
        the Personal Information Protection Law, and is information about living
        individuals, including the name, date of birth, address, telephone
        number, contact information, etc. And information that can identify a
        specific individual (such as personal identification information) and
        information that can identify a specific individual by describing the
        information, such as data related to fingerprints and voiceprints, and
        the insurer number on a health insurance card. Refers to the location
        information obtained from the smartphone.
      </p>
      <h3 className={styles.heading}>
        2.Method of collecting personal information
      </h3>
      <p className={styles.text}>
        TinyKitten never asks for personal information such as name, date of
        birth, address, telephone number, e-mail address, bank account number,
        credit card number, driver&lsquo;s license number, etc. when registering
        for use. However, the location information of the user is temporarily
        acquired due to the characteristics of this application, but is not
        stored at all on the server.
      </p>
      <h3 className={styles.heading}>
        3.Purpose of collecting and using personal information
      </h3>
      <p className={styles.text}>
        TinyKitten collects and uses personal information for the following
        purposes:
      </p>
      <ol className={styles.list}>
        <li>To provide and operate this application</li>
      </ol>
      <h3 className={styles.heading}>4.Change of purpose of use</h3>
      <ol className={styles.list}>
        <li>
          TinyKitten will change the purpose of use of personal information only
          if it is reasonably deemed that the purpose of use is relevant to
          before the change.
        </li>
        <li>
          If the purpose of use is changed, the purpose after the change shall
          be notified to the user or published on this website by the method
          prescribed by TinyKitten.
        </li>
      </ol>
      <h3 className={styles.heading}>5.Changes in Privacy Policy</h3>
      <ol className={styles.list}>
        <li>
          The contents of this policy are subject to change without notice to
          the user, except for laws and regulations and other matters stipulated
          otherwise in this policy.
        </li>
        <li>
          Except as otherwise provided by TinyKitten, the revised Privacy Policy
          will take effect from the time it is posted on this website.
        </li>
      </ol>
      <h3 className={styles.heading}>6.Contact for Inquiries</h3>
      <p className={styles.text}>
        For inquiries regarding this policy, please contact the following
        contact.
      </p>
      <ul className={styles.list}>
        <li>Name: TinyKitten(Tsubasa SEKIGUCHI)</li>
        <li>E-mail address: ts@tinykitten.me</li>
      </ul>
    </main>
  );
};

export default PrivacyPolicy;
