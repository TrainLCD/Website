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
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    padding: 32px;
    box-sizing: border-box;
  }

  figure {
      margin-bottom: 32px;
  }

  .horizonalCenter {
    align-items: center;
  }

  .verticalCenter {
    justify-content: center;
  }

  .mockup {
    max-width: 100%;
  }

  .appNameTitle {
    font-size: 2.5rem;
    color: #555;
    margin-top: 64px;
  }

  .appDescription {
    margin-top: 24px;
    font-weight: normal;
    color: #777;
  }

  .stores {
    display: flex;
    margin-top: 48px;
  }

  .stores img {
    height: 48px;
    margin: 0 12px;
  }

  footer {
    background: #333;
    padding: 32px;
    color: #aaa;
    letter-spacing: 1px;
    font-kerning: normal;
    text-align: center;
  }

  .footerCopy {
    margin-top: 6px;
  }

  a {
    text-decoration: none;
  }

  .footerLink {
    color: #aaa;
  }

  .arrow {
    position: absolute;
    left: auto;
    right: auto;
    bottom: 32px;
  }

  figcaption {
    text-align: center;
    margin-top: 12px;
    color: #888;
  }

  .heading {
    margin-top: 64px;
    font-size: 2rem;
    color: #555;
    border-bottom: 4px solid #555;
    padding-bottom: 12px;
    margin-bottom: 48px;
  }

  .footerLinks {
    color: #aaa;
    margin-bottom: 24px;
  }

  /* Oppa PC Style */
  @media (min-width: 800px) {
    .mockup {
      max-width: 40%;
    }

    .arrow {
      cursor: pointer;
    }
  }
</style>

<svelte:head>
  <title>TrainLCD</title>
</svelte:head>
<Header />

<section class="verticalCenter horizonalCenter">
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
</section>

<section id="next" class="horizonalCenter">
  <h1 class="heading">GALLERY</h1>
  <figure>
    <iframe
      title="実際に使っている様子"
      width="560"
      height="315"
      src="https://www.youtube.com/embed/T4y6MKApDXg"
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

<footer>
  <div class="footerLinks">
    <a class="footerLink" href="/privacy-policy">プライバシーポリシー</a>
  </div>
  <h3>
    <a
      class="footerLink"
      href="https://tinykitten.me"
      target="_blank"
      rel="noopener noreferrer">
      The TinyKitten Project
    </a>
  </h3>
  <p class="footerCopy">&copy; TinyKitten 2020</p>
</footer>
