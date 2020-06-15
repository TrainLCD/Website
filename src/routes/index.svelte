<script>
  import Header from "../components/header.svelte";

  function onNextClick() {
    const nextElem = document.querySelector("#next");
    window.scrollTo({
      top: nextElem.getBoundingClientRect().top,
      behavior: "smooth"
    });
  }
</script>

<style>
section {
  box-sizing: border-box;
}

  .firstView {
    height: 100vh;
    background: #333;
    background-image: url('/images/bg.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
  }
  .firstViewContent {
    background: rgba(0, 0, 0, 0.75);
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #fff;
  }

  .appNameTitle {
    font-size: 2rem;
    margin-top: 32px;
  }
  
  .appDescription {
    margin-top: 12px;
    font-weight: normal;
  }

  .mockup {
    width: 75%;
  }

  .stores {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 32px;
  }

  .stores img {
    width: 120px;
    margin: 0 8px;
  }

  .arrow {
    position: absolute;
    bottom: 32px;
  }

  .heading {
    font-size: 1.5rem;
    color: #555;
    margin-bottom: 32px;
  }
  
  .section {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 24px;
    flex-direction: column;
  }

  .section:nth-child(even) {
    background: #fafafa;
  }

  .text, .subwayNotice {
    line-height: 1.5;
  }

  .text, .subwayNotice, figcaption {
    font-size: 0.9rem;
    text-align: center;
  }

  .text {
    text-rendering: optimizeLegibility;
  }
  
  figure {
    margin-bottom: 32px;
  }

  figcaption {
    padding-top: 24px;
    padding-bottom: 24px;
    color: #aaa;
  }

  .footer {
    background: #dedede;
    text-align: center;
    padding: 32px;
  }

  .privacyLink {
    margin-bottom: 12px;
  }

  .subwayNotice {
    color: #555;
    margin-top: 24px;
  }

  .footer, .footer a {
    color: #555;
    line-height: 1.5;
    display: block;
  }

  /* Oppa PC Style */
  @media (min-width: 800px) {
    .mockup {
      max-width: 30%;
    }

    .arrow {
      cursor: pointer;
    }

    .section {
      min-height: 75vh;
      padding: 64px;
    }
    .textBlock {
      text-align: center;
    }
    
    .text, .subwayNotice, figcaption {
      font-size: 1rem;
    }

    .arrow {
      bottom: 64px;
    }
  }
</style>

<svelte:head>
  <title>TrainLCD</title>
</svelte:head>
<Header />

<section class="firstView">
  <div class="firstViewContent">
    <img class="mockup" src="/images/mock.png" alt="Mockup" />
    <h1 class="appNameTitle">TrainLCD</h1>
    <h2 class="appDescription">電車のLCDを再現したスマホアプリです</h2>
    <div class="stores">
      <a
        href="https://apps.apple.com/jp/app/trainlcd/id1486355943"
        target="_blank"
        rel="noopener noreferrer">
        <img src="/images/appStore.svg" alt="App Store" />
      </a>
      <a
        href="https://play.google.com/store/apps/details?id=me.tinykitten.trainlcd"
        target="_blank"
        rel="noopener noreferrer">
        <img src="/images/googlePlay.png" alt="Google Play" />
      </a>
    </div>

  <img
    on:click={onNextClick}
    class="arrow"
    src="/images/arrow.svg"
    alt="Next" />

  </div>
</section>

<section id="next" class="about section">
  <h2 class="heading">TrainLCDとは</h2>
  <div class="textBlock">
    <p class="text">TrainLCDは、電車のLCDを再現したスマホアプリです</p>
    <p class="text"><b class="bold">満員電車</b>、<b class="bold">LCDのない路線</b>など、現在どこにいるか、どの駅を通るのかひと目で分かります。ぜひお試しください。</p>
    <p class="subwayNotice">※電波が届きづらい場所は動作保証外です。（地下区間など）</p>
  </div>
</section>

<section class="gallery section">
  <h2 class="heading">ギャラリー</h2>
  <figure>
    <iframe
      title="実際に使っている様子"
      width="560"
      height="315"
      src="https://www.youtube.com/embed/qJdLEh0O8Us"
      frameborder="0"
      style="max-width: 100%;"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen />
    <figcaption>実際に使っている様子</figcaption>
  </figure>
  <figure>
    <iframe
      title="元になった開発者のセッション"
      width="560"
      height="315"
      src="https://www.youtube.com/embed/zJ92TUjhdEw?start=15820"
      frameborder="0"
      style="max-width: 100%;"
      allow="accelerometer; autoplay; encrypted-media; gyroscope;
      picture-in-picture"
      allowfullscreen />
    <figcaption>元になった開発者のセッション</figcaption>
  </figure>
</section>

<footer class="footer">
  <a class="privacyLink" href="/privacy-policy">プライバシーポリシー</a>
  <a
    href="https://tinykitten.me"
    target="_blank"
    rel="noopener noreferrer">
    Product of TinyKitten
  </a>
  <p>&copy; TinyKitten 2020</p>
</footer>
