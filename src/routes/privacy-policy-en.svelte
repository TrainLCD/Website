<script>
  import Header from "../components/header.svelte";
</script>

<style>
.main {
    color: #333;
    max-width: 1024px;
    margin: 48px auto 0 auto;
    padding: 32px;
    line-height: 1.5;
}
.link {
    font-weight: bold;
    color: #333;
}
.alignRight {
    text-align: right;
}
.policyHeading {
    text-align: center;
}
.meta {
    margin-top: 32px;
}
.title {
    font-size: 3rem;
    margin-bottom: 8px;
}
.text {
    line-height: 2;
    margin: 24px 0;
}
.heading {
    font-size: 1.5rem;
    margin: 24px 0;
}
.list {
    margin-left: 32px;
}
.list li {
    margin-bottom: 12px;
}

</style>

<svelte:head>
  <title>Privacy Policy - TrainLCD</title>
</svelte:head>
<Header />

<main class="main">
    <header class="policyHeading">
        <h1 class="title">Privacy Policy</h1>
        <aside class="meta alignRight">
            <p>Last updated: March 30, 2020</p>
            <p>TinyKitten(Tsubasa SEKIGUCHI)</p>
            <a class="link" href="/privacy-policy">日本語版</a>
        </aside>
    </header>
    <p class="text">
        In the following, customers who use the application "TrainLCD" (hereinafter referred to as "this application") managed and operated by TinyKitten (hereafter referred to as TinyKitten), the sole owner of the business owner (hereinafter referred to as "user") ) And TinyKitten. When using this application, please agree to the following and use it. In addition, TinyKitten shall be able to change the following contents as appropriate.
    </p>
    <p class="text">
    The privacy policy for the handling of user's personal information in this application provided by TinyKitten is as follows.
    </p>
    <h3 class="heading">1.Personal information</h3>
    <p class="text">
    “Personal information” refers to “personal information” as defined in the Personal Information Protection Law, and is information about living individuals, including the name, date of birth, address, telephone number, contact information, etc. And information that can identify a specific individual (such as personal identification information) and information that can identify a specific individual by describing the information, such as data related to fingerprints and voiceprints, and the insurer number on a health insurance card. Refers to the location information obtained from the smartphone.
    </p>
    <h3 class="heading">2.Method of collecting personal information</h3>
    <p class="text">
    TinyKitten never asks for personal information such as name, date of birth, address, telephone number, e-mail address, bank account number, credit card number, driver's license number, etc. when registering for use. However, the location information of the user is temporarily acquired due to the characteristics of this application, but is not stored at all on the server.
    </p>
    <h3>3.Purpose of collecting and using personal information</h3>
    <p class="text">TinyKitten collects and uses personal information for the following purposes:</p>
    <ol class="list">
        <li>To provide and operate this application</li>
    </ol>
    <h3 class="heading">3.Change of purpose of use</h3>
    <ol class="list">
        <li>TinyKitten will change the purpose of use of personal information only if it is reasonably deemed that the purpose of use is relevant to before the change.</li>
        <li>If the purpose of use is changed, the purpose after the change shall be notified to the user or published on this website by the method prescribed by TinyKitten.</li>
    </ol>
    <h3 class="heading">4.Changes in Privacy Policy</h3>
    <ol class="list">
        <li>The contents of this policy are subject to change without notice to the user, except for laws and regulations and other matters stipulated otherwise in this policy.</li>
        <li>Except as otherwise provided by TinyKitten, the revised Privacy Policy will take effect from the time it is posted on this website.</li>
    </ol>
    <h3 class="heading">5.Contact for Inquiries</h3>
    <p class="text">For inquiries regarding this policy, please contact the following contact.</p>
    <ul class="list">
    <li>Name: TinyKitten(Tsubasa SEKIGUCHI)</li>
    <li>E-mail address: ts@tinykitten.me</li>
    </ul>
</main>
