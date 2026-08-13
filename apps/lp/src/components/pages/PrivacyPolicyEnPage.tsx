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
            <p>Last updated: August 13, 2026</p>
            <p>TinyKitten(Tsubasa SEKIGUCHI)</p>
            <a className={styles.internalLink} href="/privacy-policy">
              日本語版
            </a>
          </aside>
        </header>
        <p className={styles.paragraph}>
          The following sets out the terms that apply between TinyKitten and customers who use the application “TrainLCD” (hereinafter referred to as “this application”) and this website (hereinafter referred to as “this site”), which are managed and operated by TinyKitten (hereafter referred to as TinyKitten), a sole proprietorship (such customers being hereinafter referred to as “user”). When using this application or this site, please agree to the following and use it. In addition, TinyKitten shall be able to change the following contents as appropriate.
        </p>
        <p className={styles.paragraph}>
          The privacy policy for the handling of user’s personal information in this application and this site provided by TinyKitten is as follows.
        </p>
        <h3 className={styles.headingText}>1. Personal information</h3>
        <p className={styles.paragraph}>
          “Personal information” refers to “personal information” as defined in the Personal Information Protection Law, and is information about living individuals, including the name, date of birth, address, telephone number, contact information, etc. and information that can identify a specific individual (such as personal identification information) and information that can identify a specific individual by describing the information, such as data related to fingerprints and voiceprints, and the insurer number on a health insurance card. It also includes the location information obtained from the smartphone.
        </p>
        <h3 className={styles.headingText}>2. Method of collecting personal information</h3>
        <p className={styles.paragraph}>
          TinyKitten never asks for personal information such as name, date of birth, address, telephone number, e-mail address, bank account number, credit card number, driver’s license number, etc. when using this application. No account registration is required to use this application.
        </p>
        <p className={styles.paragraph}>
          The information that TinyKitten obtains in providing this application is as follows:
        </p>
        <ol className={styles.list}>
          <li>Location information obtained from the user’s device (Article 4)</li>
          <li>An anonymous identifier generated automatically for each installation (Article 5)</li>
          <li>Information about errors that occur while using this application (Article 11)</li>
          <li>Content voluntarily submitted by the user through the “Feedback” function (Article 15)</li>
        </ol>
        <h3 className={styles.headingText}>3. Purpose of collecting and using personal information</h3>
        <p className={styles.paragraph}>
          TinyKitten collects and uses personal information for the following purposes:
        </p>
        <ol className={styles.list}>
          <li>To provide and operate this application and this site</li>
          <li>To investigate defects in this application and to maintain and improve its quality</li>
          <li>To respond to inquiries and comments from users</li>
        </ol>
        <h3 className={styles.headingText}>4. Handling of location information</h3>
        <p className={styles.paragraph}>
          Due to the nature of this application, it obtains location information (latitude and longitude) from the user’s device. Location information is handled as follows:
        </p>
        <ol className={styles.list}>
          <li>
            Location information is used solely to determine the nearest station, and to determine the station the user is currently traveling through and the direction of travel.
          </li>
          <li>
            While the navigation function is in use, location information is also obtained in the background, but only while this application is running.
          </li>
          <li>
            The location information obtained is temporarily sent to servers managed by TinyKitten in order to determine the station, but it is not stored on the server.
          </li>
          <li>
            Location information is never used for advertising or for tracking the behavior of users, nor is it provided to third parties for such purposes.
          </li>
          <li>
            The collection of location information can be stopped at any time from the settings of the device. Even if permission to use location information is not granted, functions that do not require location information, such as “Auto Mode”, remain available.
          </li>
        </ol>
        <h3 className={styles.headingText}>5. Handling of the device identifier</h3>
        <p className={styles.paragraph}>
          Instead of requiring account registration, this application stores an anonymous identifier, generated automatically for each installation, on the device. It is used to authenticate communication with the server and to limit the number of times certain functions may be used. This identifier is not associated with any information that identifies a specific individual, such as a name or an e-mail address. The identifier is lost when this application is deleted.
        </p>
        <h3 className={styles.headingText}>6. Provision of personal information to third parties</h3>
        <p className={styles.paragraph}>
          Except as required by law, TinyKitten will not provide personal information to third parties without obtaining the user’s prior consent. However, information may be sent to the external services set out in Article 10 and the following articles, to the extent necessary to provide this application and this site.
        </p>
        <h3 className={styles.headingText}>7. Change of purpose of use</h3>
        <ol className={styles.list}>
          <li>
            TinyKitten will change the purpose of use of personal information only if it is reasonably deemed that the purpose of use is relevant to before the change.
          </li>
          <li>
            If the purpose of use is changed, the purpose after the change shall be notified to the user or published on this website by the method prescribed by TinyKitten.
          </li>
        </ol>
        <h3 className={styles.headingText}>8. Changes in Privacy Policy</h3>
        <ol className={styles.list}>
          <li>
            The contents of this policy are subject to change without notice to the user, except for laws and regulations and other matters stipulated otherwise in this policy.
          </li>
          <li>
            Except as otherwise provided by TinyKitten, the revised Privacy Policy will take effect from the time it is posted on this website.
          </li>
        </ol>
        <h3 className={styles.headingText}>9. Contact for inquiries</h3>
        <p className={styles.paragraph}>
          For inquiries regarding this policy, please contact the following contact.
        </p>
        <ul className={styles.list}>
          <li>Name: TinyKitten(Tsubasa SEKIGUCHI)</li>
          <li>E-mail address: trainlcd@tinykitten.me</li>
        </ul>
        <h3 className={styles.headingText}>10. About the use of Google Analytics</h3>
        <p className={styles.paragraph}>
          This site uses Google Analytics to understand the usage status of the site. Google Analytics uses cookies to collect user information, but the user’s personal information is not associated. For a description of the Google Analytics Terms of Service and Privacy Policy, please visit the Google Analytics website.
          <br />
          TinyKitten shall not be liable for any damages caused by using the Google Analytics service. This application does not use Google Analytics.
        </p>
        <h3 className={styles.headingText}>11. Use of Sentry</h3>
        <p className={styles.paragraph}>
          This application uses
          <a
            href="https://sentry.io/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.externalLink}
          >
            Sentry
          </a>
          , a service provided by Functional Software, to understand the stability of the application. TinyKitten receives the results of this analysis from Functional Software to understand the user’s error status. The information collected, recorded, and analyzed by Sentry does not contain any personally identifiable information; please visit Sentry’s site for a description of Sentry’s
          <a
            href="https://sentry.io/terms/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.externalLink}
          >
            Terms of Use
          </a>
          and
          <a
            href="https://sentry.io/privacy/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.externalLink}
          >
            Privacy Policy
          </a>
          .
        </p>
        <h3 className={styles.headingText}>12. Use of Cloudflare</h3>
        <p className={styles.paragraph}>
          The backend of this application and this site run on services provided by Cloudflare, Inc. Communication between this application or this site and the server therefore passes through that company’s network. For a description of how information is handled by Cloudflare, please see the
          <a
            href="https://www.cloudflare.com/privacypolicy/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.externalLink}
          >
            Cloudflare Privacy Policy
          </a>
          .
        </p>
        <h3 className={styles.headingText}>13. Automatic announcement function</h3>
        <p className={styles.paragraph}>
          The “automatic announcement” function of this application speaks either by synthesizing the audio on the server side (hereinafter referred to as “remote synthesis”) or by using the speech synthesis function built into the device. Which of the two is used depends on the environment and on settings distributed by TinyKitten. As of the revision date of this policy, the iOS version uses remote synthesis by default, and the Android version uses the speech synthesis function built into the device by default.
        </p>
        <p className={styles.paragraph}>
          When remote synthesis is used, the announcement text (sentences containing station names, line names and the like) is sent to the speech synthesis service provided by OpenAI, L.L.C. The information sent contains no location information and nothing that identifies the user. The synthesized audio is stored for a certain period of time on servers managed by TinyKitten, in order to avoid synthesizing the same announcement text repeatedly.
          <br />
          When the speech synthesis function built into the device is used, no information is sent externally for the purpose of speech.
        </p>
        <h3 className={styles.headingText}>14. AI destination consultation function</h3>
        <p className={styles.paragraph}>
          In order to generate a response, the “Ask AI about your destination” function of this application sends the following information to the AI services provided by OpenAI, L.L.C. and Cloudflare, Inc.:
        </p>
        <ol className={styles.list}>
          <li>The text entered by the user and the recent conversation within this function</li>
          <li>
            Information about the station the user is currently traveling through, used to narrow down the stations to suggest (the location information itself is not sent)
          </li>
          <li>The display language setting of this application</li>
        </ol>
        <p className={styles.paragraph}>
          The conversation sent is used only to generate a response and is not stored on TinyKitten’s servers. The conversation history is held only on the user’s device and can be erased at any time from within this application. In order to operate this function properly, the number of uses per day is limited using the anonymous identifier described in Article 5.
          <br />
          Please do not enter your name, contact information, or any other information that can identify a specific individual into this function.
        </p>
        <h3 className={styles.headingText}>15. Use of Feedback Function</h3>
        <p className={styles.paragraph}>
          The “Feedback” feature of this application sends the following information to TinyKitten’s proprietary system:
        </p>
        <ol className={styles.list}>
          <li>The text entered by the user</li>
          <li>Any screenshot voluntarily attached by the user</li>
          <li>
            Information about the device, such as the model name, the name and version of the OS, and the language setting
          </li>
          <li>The version of this application and the anonymous identifier described in Article 5</li>
        </ol>
        <p className={styles.paragraph}>
          This information does not contain anything that identifies a specific individual, unless the user includes personal information in the text or the attached screenshot.
        </p>
        <p className={styles.paragraph}>
          The information submitted is used to investigate defects and to improve this application, and is stored for a period of time determined by TinyKitten. It is also classified and summarized using the AI service provided by Cloudflare, Inc., and is forwarded to a private GitHub repository and a Discord channel managed by TinyKitten in order to track how it is handled. Attached screenshots are stored at a unique URL that is difficult to guess, but any third party who knows that URL is able to view them.
        </p>
      </main>
    </div>
    <Footer />
  </>
);

export default PrivacyPolicyEnPage;
