import styles from '../PrivacyPolicy.module.css';
import Footer from '../Footer';
import Header from '../Header';

const PrivacyPolicyEnPage = () => (
  <>
    <Header />
    <div className={styles.wrapper}>
      <main className={styles.container}>
        <header className={styles.headingContainer}>
          <h1 className={styles.title}>Privacy Policy</h1>
          <aside className={styles.headingMeta}>
            <p>Policy enacted: March 30, 2020</p>
            <p>Last updated: July 13, 2022</p>
            <p>TinyKitten(Tsubasa SEKIGUCHI)</p>
            <a className={styles.internalLink} href="/privacy-policy">
              日本語版
            </a>
          </aside>
        </header>
        <p className={styles.paragraph}>
          In the following, customers who use the application “TrainLCD” (hereinafter referred to as “this application”) managed and operated by TinyKitten (hereafter referred to as TinyKitten), the sole owner of the business owner (hereinafter referred to as “user”). When using this application, please agree to the following and use it. In addition, TinyKitten shall be able to change the following contents as appropriate.
        </p>
        <p className={styles.paragraph}>
          The privacy policy for the handling of user’s personal information in this application provided by TinyKitten is as follows.
        </p>
        <h3 className={styles.headingText}>1. Personal information</h3>
        <p className={styles.paragraph}>
          “Personal information” refers to “personal information” as defined in the Personal Information Protection Law, and is information about living individuals, including the name, date of birth, address, telephone number, contact information, etc. and information that can identify a specific individual (such as personal identification information) and information that can identify a specific individual by describing the information, such as data related to fingerprints and voiceprints, and the insurer number on a health insurance card. It also includes the location information obtained from the smartphone.
        </p>
        <h3 className={styles.headingText}>2. Method of collecting personal information</h3>
        <p className={styles.paragraph}>
          TinyKitten never asks for personal information such as name, date of birth, address, telephone number, e-mail address, bank account number, credit card number, driver’s license number, etc. when registering for use. However, the location information of the user is temporarily acquired due to the characteristics of this application, but is not stored at all on the server.
        </p>
        <h3 className={styles.headingText}>3. Purpose of collecting and using personal information</h3>
        <p className={styles.paragraph}>
          TinyKitten collects and uses personal information for the following purposes:
        </p>
        <ol className={styles.list}>
          <li>To provide and operate this application</li>
        </ol>
        <h3 className={styles.headingText}>4. Change of purpose of use</h3>
        <ol className={styles.list}>
          <li>
            TinyKitten will change the purpose of use of personal information only if it is reasonably deemed that the purpose of use is relevant to before the change.
          </li>
          <li>
            If the purpose of use is changed, the purpose after the change shall be notified to the user or published on this website by the method prescribed by TinyKitten.
          </li>
        </ol>
        <h3 className={styles.headingText}>5. Changes in Privacy Policy</h3>
        <ol className={styles.list}>
          <li>
            The contents of this policy are subject to change without notice to the user, except for laws and regulations and other matters stipulated otherwise in this policy.
          </li>
          <li>
            Except as otherwise provided by TinyKitten, the revised Privacy Policy will take effect from the time it is posted on this website.
          </li>
        </ol>
        <h3 className={styles.headingText}>6. Contact for inquiries</h3>
        <p className={styles.paragraph}>
          For inquiries regarding this policy, please contact the following contact.
        </p>
        <ul className={styles.list}>
          <li>Name: TinyKitten(Tsubasa SEKIGUCHI)</li>
          <li>E-mail address: trainlcd@tinykitten.me</li>
        </ul>
        <h3 className={styles.headingText}>7. About the use of Google Analytics</h3>
        <p className={styles.paragraph}>
          This site and this application use Google Analytics to understand the usage status of the site and application. Google Analytics uses cookies to collect user information on the site side, and collects the assigned ID automatically assigned to each launch of the application on the application side, but the user’s personal information is not associated. For a description of the Google Analytics Terms of Service and Privacy Policy, please visit the Google Analytics website.
          <br />
          TinyKitten shall not be liable for any damages caused by using the Google Analytics service.
        </p>
        <h3 className={styles.headingText}>8. Use of Sentry</h3>
        <p className={styles.paragraph}>
          This application uses
          <a
            href="https://sentry.io/"
            target="_blank"
            rel="noreferrer noopener"
            className={styles.externalLink}
          >
            Sentry
          </a>
          , a service provided by Functional Software, to understand the stability of the application. TinyKitten receives the results of this analysis from Functional Software to understand the user’s error status. The information collected, recorded, and analyzed by Sentry does not contain any personally identifiable information; please visit Sentry’s site for a description of Sentry’s
          <a
            href="https://sentry.io/terms/"
            target="_blank"
            rel="noreferrer noopener"
            className={styles.externalLink}
          >
            Terms of Use
          </a>
          and
          <a
            href="https://sentry.io/privacy/"
            target="_blank"
            rel="noreferrer noopener"
            className={styles.externalLink}
          >
            Privacy Policy
          </a>
          .
        </p>
        <h3 className={styles.headingText}>9. Use of Feedback Function</h3>
        <p className={styles.paragraph}>
          The "Feedback" feature of this application sends the minimum necessary information to TinyKitten’s proprietary system. The information collected, recorded, and analyzed by the feedback function does not contain any information that identifies you as a specific individual. The information collected, recorded, and analyzed by the system will be stored for a period of time determined by TinyKitten.
        </p>
      </main>
    </div>
    <Footer />
  </>
);

export default PrivacyPolicyEnPage;
