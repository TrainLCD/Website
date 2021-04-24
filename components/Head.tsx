import Head from 'next/head';

type Props = {
  title: string;
  description: string;
  url: string;
  ogType: 'website' | 'article';
};

const AppHead: React.FC<Props> = ({
  title,
  description,
  url,
  ogType,
}: Props) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <meta name="theme-color" content="#03A9F4" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="manifest" href="/manifest.json" />
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#03a9f4" />
    <meta name="msapplication-TileColor" content="#03a9f4" />
    <meta property="og:title" content="TrainLCD" />
    <meta property="og:type" content={ogType} />
    <meta property="og:url" content={url} />
    <meta
      property="og:image"
      content="https://trainlcd.tinykitten.me/ogp.202102161436.png"
    />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:description" content={description} />
    <meta property="og:site_name" content="TrainLCD" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@tinykitten8" />
    <meta name="twitter:creator" content="@tinykitten8" />
    <meta
      name="twitter:description"
      content="TrainLCDは、位置情報と連動して電車のLCDを再現するアプリです。"
    />
    <meta name="twitter:app:country" content="JP" />
    <meta name="twitter:app:name:iphone" content="TrainLCD" />
    <meta name="twitter:app:id:iphone" content="1486355943" />
    <meta name="twitter:app:name:ipad" content="TrainLCD" />
    <meta name="twitter:app:id:ipad" content="1486355943" />
    <meta name="twitter:app:name:googleplay" content="TrainLCD" />
    <meta name="twitter:app:id:googleplay" content="me.tinykitten.trainlcd" />
    <meta property="fb:app_id" content="596269604527027" />
    <meta name="apple-itunes-app" content="app-id=1486355943" />
  </Head>
);

export default AppHead;
