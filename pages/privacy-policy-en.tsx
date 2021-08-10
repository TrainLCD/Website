import AppHead from '../components/Head';
import styles from '../styles/pages/PrivacyPolicy.module.css';

const PrivacyPolicy: React.FC = () => {
  return (
    <main className={styles.main}>
      <AppHead
        title="Privacy Policy - TrainLCD"
        description="TrainLCD privacy policy."
        url="https://trainlcd.tinykitten.me/privacy-policy-en/"
        ogType="article"
      />
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
      <h3 className={styles.heading}>7.About the use of Google Analytics</h3>
      <p className={styles.text}>
        This site and this application use Google Analytics to understand the
        usage status of the site and application. Google Analytics uses cookies
        to collect user information on the site side, and collects the assigned
        ID automatically assigned to each launch of the application on the
        application side, but with the user&lsquo;s personal information Is not
        associated. For a description of the Google Analytics Terms of Service
        and Privacy Policy, please visit the Google Analytics website.
        <br />
        TinyKitten shall not be liable for any damages caused by using the
        Google Analytics service.
      </p>
      <h3 className={styles.heading}>
        8.About the use of Firebase Crashlytics
      </h3>
      <p className={styles.text}>
        This app uses Firebase Crashlytics to understand the stability of the
        app. Firebase Crashlytics collects an automatically assigned ID for each
        launch of your app when the app crashes, but it is not associated with
        your personal information. For a description of the Firebase Crashlytics
        Terms of Service and Privacy Policy, please visit the Firebase
        Crashlytics website. <br />
        TinyKitten shall not be liable for any damages caused by using the
        Firebase Crashlytics service.
      </p>
    </main>
  );
};

export default PrivacyPolicy;
