import styled from 'styled-components';
import AppHead from '../components/Head';
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
} from '../components/PrivacyPolicyElements';

const Subtitle = styled.h2`
  font-size: 1rem;
  line-height: 1.5;
  font-weight: normal;
`;

const ExternalLink = styled.a`
  color: #333;
`;

const PrivacyPolicy: React.FC = () => {
  return (
    <Container>
      <AppHead
        title="プライバシーポリシー - TrainLCD"
        description="TrainLCDのプライバシーポリシーです。"
        url="https://trainlcd.tinykitten.me/privacy-policy"
        ogType="article"
      />
      <HeadingContainer>
        <Title>Privacy Policy</Title>
        <Subtitle>プライバシーポリシー(個人情報保護方針)</Subtitle>
        <HeadingMetaContainer>
          <p>令和2年3月30日 制定</p>
          <p>令和4年7月8日 改定</p>
          <p>屋号TinyKitten(関口 翼)</p>
          <InternalLink href="/privacy-policy-en">
            English version available here.
          </InternalLink>
        </HeadingMetaContainer>
      </HeadingContainer>
      <Paragraph>
        以下では、個人事業主屋号TinyKitten（以下TinyKittenといいます。）が管理、運営するアプリ「TrainLCD」（以下「本アプリ」といいます。）を利用するお客さま（以下「利用者様」といいます。）とTinyKittenとの間に適用される条件等を定めています。利用者様が本アプリを利用する際には、以下の内容に同意の上、ご利用いただくようお願いします。なお、TinyKittenは、適宜、以下の内容を変更することができるものとします。
      </Paragraph>
      <Paragraph>
        以下のとおり、TinyKittenの提供する本アプリにおける、利用者様の個人情報の取扱いについて、プライバシーポリシーを定めます。
      </Paragraph>
      <HeadingText>第1条（個人情報）</HeadingText>
      <Paragraph>
        「個人情報」とは，個人情報保護法にいう「個人情報」を指すものとし，生存する個人に関する情報であって，当該情報に含まれる氏名，生年月日，住所，電話番号，連絡先その他の記述等により特定の個人を識別できる情報及び容貌，指紋，声紋にかかるデータ，及び健康保険証の保険者番号などの当該情報単体から特定の個人を識別できる情報（個人識別情報）及び利用者様のスマートフォンから取得した位置情報を指します。
      </Paragraph>
      <HeadingText>第2条（個人情報の収集方法）</HeadingText>
      <Paragraph>
        TinyKittenは，ユーザーが利用登録をする際に氏名，生年月日，住所，電話番号，メールアドレス，銀行口座番号，クレジットカード番号，運転免許証番号などの個人情報をお尋ねすることは一切ありません。ただし、利用者様の位置情報は本アプリの特性上一時的に取得いたしますが、サーバー上で一切保管しません。
      </Paragraph>
      <HeadingText>第3条（個人情報を収集・利用する目的）</HeadingText>
      <Paragraph>
        TinyKittenが個人情報を収集・利用する目的は，以下のとおりです。
      </Paragraph>
      <OrderedList>
        <li>本アプリの提供・運営のため</li>
      </OrderedList>
      <HeadingText>第4条（利用目的の変更）</HeadingText>
      <OrderedList>
        <li>
          TinyKittenは，利用目的が変更前と関連性を有すると合理的に認められる場合に限り，個人情報の利用目的を変更するものとします。
        </li>
        <li>
          利用目的の変更を行った場合には，変更後の目的について，TinyKitten所定の方法により，ユーザーに通知し，または本ウェブサイト上に公表するものとします。
        </li>
      </OrderedList>
      <HeadingText>第5条（プライバシーポリシーの変更）</HeadingText>
      <OrderedList>
        <li>
          本ポリシーの内容は，法令その他本ポリシーに別段の定めのある事項を除いて，ユーザーに通知することなく，変更することができるものとします。
        </li>
        <li>
          TinyKittenが別途定める場合を除いて，変更後のプライバシーポリシーは，本ウェブサイトに掲載したときから効力を生じるものとします。
        </li>
      </OrderedList>
      <HeadingText>第6条（お問い合わせ窓口）</HeadingText>
      <Paragraph>
        本ポリシーに関するお問い合わせは，下記の窓口までお願いいたします。
      </Paragraph>
      <UnorderedList>
        <li>名前: TinyKitten(関口 翼)</li>
        <li>Eメールアドレス： ts@tinykitten.me</li>
      </UnorderedList>
      <HeadingText>第7条（Google Analyticsの利用について）</HeadingText>
      <Paragraph>
        当サイトおよび本アプリでは、サイトおよびアプリの利用状況を把握するためにGoogle
        Analyticsを利用しています。Google
        Analyticsは、サイト側ではクッキーを利用して利用者様の情報を収集し、
        アプリ側ではアプリの各起動ごとに自動的に割り当てられた割り当てられたIDを収集しますが、
        ユーザーの個人情報とは関連付けられません。Google
        Analyticsの利用規約及びプライバシーポリシーに関する説明については、Google
        Analyticsのサイトをご覧ください。
        <br />
        なお、Google
        Analyticsのサービス利用による損害については、TinyKittenは責任を負わないものとします。
      </Paragraph>
      <HeadingText>第8条（Sentryの利用について）</HeadingText>
      <Paragraph>
        本アプリでは、アプリの安定性を把握するためにFunctional
        Software社のサービスである
        <ExternalLink href="https://sentry.io/" target="_blank">
          Sentry
        </ExternalLink>
        を利用しています。
        本アプリのご利用中に生じたエラーについて必要最低限の情報がFunctional
        Software社のサーバーに送信されます。TinyKittenは、Functional
        Software社からその分析結果を受け取り、利用者様のエラー状況を把握します。Sentryにより収集、記録、分析された利用者様の情報には、特定の個人を識別する情報は一切含まれません。Sentryの
        <ExternalLink href="https://sentry.io/terms/" target="_blank">
          利用規約
        </ExternalLink>
        及び
        <ExternalLink href="https://sentry.io/privacy/" target="_blank">
          プライバシーポリシー
        </ExternalLink>
        に関する説明については、Sentryのサイトをご覧ください。
      </Paragraph>
      <HeadingText>第9条（フィードバック機能の利用について）</HeadingText>
      <Paragraph>
        本アプリの「フィードバック」機能では、必要最低限の情報がTinyKittenが独自に開発したシステムに送信されます。
        <br />
        フィードバック機能により収集、記録、分析された利用者様の情報には、特定の個人を識別する情報は一切含まれません。
        <br />
        また、システムにより収集、記録、分析された情報は、TinyKittenの定める一定の期間保管されます。
      </Paragraph>
    </Container>
  );
};

export default PrivacyPolicy;
