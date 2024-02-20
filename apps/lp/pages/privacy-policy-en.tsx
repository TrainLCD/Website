import styled from 'styled-components';
import Footer from '../components/Footer';
import AppHead from '../components/Head';
import Header from '../components/Header';
import {
  Container,
  HeadingContainer,
  HeadingMetaContainer,
  HeadingText,
  InternalLink,
  OrderedList,
  Paragraph,
  Title,
  UnorderedList,
  Wrapper,
} from '../components/PrivacyPolicyElements';

const ExternalLink = styled.a`
  color: #333;
`;

const PrivacyPolicy: React.FC = () => {
  return (
    <>
      <Header />
      <Wrapper>
        <Container>
          <AppHead
            title="Privacy Policy - TrainLCD"
            description="TrainLCD privacy policy."
            url="https://trainlcd.tinykitten.me/privacy-policy-en/"
            ogType="article"
          />
          <HeadingContainer>
            <Title>Privacy Policy</Title>
            <HeadingMetaContainer>
              <p>Policy enacted: March 30, 2020</p>
              <p>Last updated: July 13, 2022</p>
              <p>TinyKitten(Tsubasa SEKIGUCHI)</p>
              <InternalLink href="/privacy-policy">日本語版</InternalLink>
            </HeadingMetaContainer>
          </HeadingContainer>
          <Paragraph>
            In the following, customers who use the application
            &ldquo;TrainLCD&ldquo; (hereinafter referred to as &ldquo;this
            application&ldquo;) managed and operated by TinyKitten (hereafter
            referred to as TinyKitten), the sole owner of the business owner
            (hereinafter referred to as &ldquo;user&ldquo;) ) And TinyKitten.
            When using this application, please agree to the following and use
            it. In addition, TinyKitten shall be able to change the following
            contents as appropriate.
          </Paragraph>
          <Paragraph>
            The privacy policy for the handling of user&lsquo;s personal
            information in this application provided by TinyKitten is as
            follows.
          </Paragraph>
          <HeadingText>1.Personal information</HeadingText>
          <Paragraph>
            “Personal information” refers to “personal information” as defined
            in the Personal Information Protection Law, and is information about
            living individuals, including the name, date of birth, address,
            telephone number, contact information, etc. And information that can
            identify a specific individual (such as personal identification
            information) and information that can identify a specific individual
            by describing the information, such as data related to fingerprints
            and voiceprints, and the insurer number on a health insurance card.
            Refers to the location information obtained from the smartphone.
          </Paragraph>
          <HeadingText>2.Method of collecting personal information</HeadingText>
          <Paragraph>
            TinyKitten never asks for personal information such as name, date of
            birth, address, telephone number, e-mail address, bank account
            number, credit card number, driver&lsquo;s license number, etc. when
            registering for use. However, the location information of the user
            is temporarily acquired due to the characteristics of this
            application, but is not stored at all on the server.
          </Paragraph>
          <HeadingText>
            3.Purpose of collecting and using personal information
          </HeadingText>
          <Paragraph>
            TinyKitten collects and uses personal information for the following
            purposes:
          </Paragraph>
          <OrderedList>
            <li>To provide and operate this application</li>
          </OrderedList>
          <HeadingText>4.Change of purpose of use</HeadingText>
          <OrderedList>
            <li>
              TinyKitten will change the purpose of use of personal information
              only if it is reasonably deemed that the purpose of use is
              relevant to before the change.
            </li>
            <li>
              If the purpose of use is changed, the purpose after the change
              shall be notified to the user or published on this website by the
              method prescribed by TinyKitten.
            </li>
          </OrderedList>
          <HeadingText>5.Changes in Privacy Policy</HeadingText>
          <OrderedList>
            <li>
              The contents of this policy are subject to change without notice
              to the user, except for laws and regulations and other matters
              stipulated otherwise in this policy.
            </li>
            <li>
              Except as otherwise provided by TinyKitten, the revised Privacy
              Policy will take effect from the time it is posted on this
              website.
            </li>
          </OrderedList>
          <HeadingText>6.Contact for Inquiries</HeadingText>
          <Paragraph>
            For inquiries regarding this policy, please contact the following
            contact.
          </Paragraph>
          <UnorderedList>
            <li>Name: TinyKitten(Tsubasa SEKIGUCHI)</li>
            <li>E-mail address: trainlcd@tinykitten.me</li>
          </UnorderedList>
          <HeadingText>7.About the use of Google Analytics</HeadingText>
          <Paragraph>
            This site and this application use Google Analytics to understand
            the usage status of the site and application. Google Analytics uses
            cookies to collect user information on the site side, and collects
            the assigned ID automatically assigned to each launch of the
            application on the application side, but with the user&lsquo;s
            personal information Is not associated. For a description of the
            Google Analytics Terms of Service and Privacy Policy, please visit
            the Google Analytics website.
            <br />
            TinyKitten shall not be liable for any damages caused by using the
            Google Analytics service.
          </Paragraph>
          <HeadingText>8.Use of Sentry</HeadingText>
          <Paragraph>
            This application uses{' '}
            <ExternalLink href="https://sentry.io/" target="_blank">
              Sentry
            </ExternalLink>
            , a service provided by Functional Software, to understand the
            stability of the application. TinyKitten receives the results of
            this analysis from Functional Software to understand the
            user&lsquo;s error status. The information collected, recorded, and
            analyzed by Sentry does not contain any personally identifiable
            information; please visit Sentry&lsquo;s site for a description of
            Sentry&lsquo;s{' '}
            <ExternalLink href="https://sentry.io/terms/" target="_blank">
              Terms of Use
            </ExternalLink>{' '}
            and{' '}
            <ExternalLink href="https://sentry.io/privacy/" target="_blank">
              Privacy Policy
            </ExternalLink>
            .
          </Paragraph>
          <HeadingText>8.Use of Feedback Function</HeadingText>
          <Paragraph>
            The &quot;Feedback&quot; feature of this application sends the
            minimum necessary information to TinyKitten&lsquo;s proprietary
            system. The information collected, recorded, and analyzed by the
            feedback function does not contain any information that identifies
            you as a specific individual. The information collected, recorded,
            and analyzed by the system will be stored for a period of time
            determined by TinyKitten.
          </Paragraph>
        </Container>
      </Wrapper>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
