<script>
	import Header from '../components/header.svelte';
</script>

<svelte:head>
	<title>TrainLCD</title>
</svelte:head>

<style>
	section {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		min-height: 100vh;
		padding: 32px;
		box-sizing: border-box;
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

	/* Oppa PC Style */
	@media (min-width: 800px) {
		.mockup {
			max-width: 40%;
		}
	}
</style>

<Header />

<section>
	<img class="mockup" src="/images/mock.png" alt="Mockup"/>
	<h1 class="appNameTitle">TrainLCD</h1>
	<h2 class="appDescription">電車のLCDを再現したスマホアプリです</h2>
	<div class="stores">
		<img src="/images/appStore.svg" alt="App Store">
		<img src="/images/googlePlay.png" alt="Google Play">
	</div>
</section>

<footer id="next">
	<h3>The TinyKitten Project</h3>
	<p class="footerCopy">&copy; TinyKitten 2019</p>
</footer>
