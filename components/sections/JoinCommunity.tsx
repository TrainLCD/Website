import styles from '../../styles/components/sections/JoinCommunity.module.css';
import { isJa } from '../../utils/isJa';

const JoinCommunity: React.FC = () => {
  return (
    <div className={styles.root}>
      {isJa && <h1 className={styles.title}>COMMUNITY</h1>}
      <h2 className={styles.subtitle}>
        {isJa ? 'コミュニティに参加しよう！' : 'Join our community!'}
      </h2>
      <p className={styles.text}>
        {isJa
          ? 'アプリを気に入っていっていただけましたか？ではぜひTrainLCD Discordコミュニティに参加しましょう！'
          : 'Did you like the app? Join the TrainLCD Discord community!'}
        <br />
        {isJa
          ? `TrainLCDコミュニティではアプリへの早期アクセスや、自分の意見をいち早くアプリに反映させることが出来ます！`
          : `In the TrainLCD community, you can access the app early and reflect your opinion in the app as soon as possible!`}
      </p>
      <div className={styles.invite}>
        <iframe
          src="https://discord.com/widget?id=679751900891185245&theme=dark"
          width="350"
          height="500"
          allowTransparency={true}
          frameBorder="0"
          sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        ></iframe>
      </div>
    </div>
  );
};

export default JoinCommunity;
