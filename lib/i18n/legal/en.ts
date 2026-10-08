import type { LegalTexts } from "./types";

// English legal texts – translation of hu.ts.

const en: LegalTexts = {
  terms: {
    title: "Terms and Conditions",
    lead: "These terms govern the use of the online IQ test available on the {site} website, together with the associated paid result and subscription. Please read them carefully before paying.",
    sections: [
      {
        h: "1. Provider details",
        p: [
          "- Company name: {company}",
          "- Registered office: {address}, {country}",
          "- Registration: {register}",
          "- Company ID number (IČO): {ico}",
          "- Tax ID number (DIČ): {dic}",
          "- Share capital: {capital}",
          "- Email: {email}",
          "- Website: {site}",
          "Hereinafter referred to as the “Provider”. The natural person using the website is hereinafter referred to as the “User”.",
        ],
      },
      {
        h: "2. The service",
        p: [
          "The website offers an online IQ test consisting of 30 questions that can be taken free of charge and without registration. After completing the test, the detailed result (IQ estimate, percentile, breakdown by area and the solutions to the questions with explanations) can be unlocked for a fee.",
          "The result is an *indicative estimate* based on a short online set of questions. It does not constitute a medical, psychological or other professional diagnosis and is not suitable as a basis for educational, employment, health or legal decisions.",
          "The paid service may be used by persons over the age of 18, and by minors only with the consent of their legal representative.",
        ],
      },
      {
        h: "3. Packages and prices",
        p: [
          "The detailed result is unlocked with *{days}-day full access*, which costs *{trial}* (charged immediately upon payment). Access includes the detailed result of the attempt concerned, plus an unlimited number of further tests and results for the duration of access.",
          "If the User does not cancel within the first {days} days, access *automatically converts into a subscription at {monthly} per month* once the {days} days have elapsed; the first monthly fee is charged on day {nextDay}, and thereafter monthly in advance until the User cancels.",
          "The prices shown are the final amounts actually payable by the User; there are no additional charges (e.g. delivery or handling fees). When converting prices stated in euros, the User's bank may apply its own exchange rate and fees.",
          "The Provider reserves the right to change its prices in the future. Such changes do not affect periods already paid for; the Provider will notify the User by email at least 30 days before the change takes effect, and the User may cancel the subscription free of charge before the new price takes effect.",
        ],
      },
      {
        h: "4. Conclusion of the contract and payment",
        p: [
          "On the payment screen, the User accepts these terms and the declaration concerning immediate performance of the digital content; the “Continue to payment” button then redirects the User to Stripe's secure payment page, where they enter their email address and payment details. Until the payment is submitted, the User may return to the website at any time and change their answers and the data entered.",
          "The contract between the Provider and the User is concluded upon successful payment, in the language in which the User uses the website. The Provider does not file the contract separately; Stripe sends a receipt for the payment by email to the address provided by the User. These terms are available on the website at all times and can be saved.",
          "Payments are processed by Stripe Payments Europe, Ltd. Accepted payment methods: bank card, Apple Pay, Google Pay. Card details are handled exclusively by Stripe; the Provider has no access to them.",
          "In the case of a subscription, the User authorises the Provider to charge the monthly fee, via Stripe, to the payment method provided at the end of the trial period and monthly thereafter, until the subscription is cancelled. If a charge fails, Stripe may retry it; in the event of persistent payment failure, the subscription ends.",
        ],
      },
      {
        h: "5. Performance and access",
        p: [
          "The detailed result is displayed immediately after successful payment and remains available later via the link to the result page.",
          "The unlimited access included in the subscription is provided by the website in the browser in which the subscription was taken out (for which a strictly necessary cookie is set). On other devices, the User can log in to the customer portal with their email address on the [Manage subscription](subscription) page.",
        ],
      },
      {
        h: "6. Cancelling the subscription",
        p: [
          "The subscription *can be cancelled at any time, without giving reasons*: via the [Manage / cancel subscription](subscription) link at the bottom of the website, in a few clicks on Stripe's customer portal, or by email to {email}.",
          "Cancellation takes effect at the end of the current (trial) period; until then, access continues and no further charges are made. If the User cancels the subscription during the trial period, the monthly fee is never charged.",
          "Except where required by law, the Provider does not refund the fee for a period that has already begun.",
        ],
      },
      {
        h: "7. Right of withdrawal",
        p: [
          "For contracts concluded at a distance, consumers are, as a general rule, entitled to a 14-day right of withdrawal (under Directive 2011/83/EU of the European Parliament and of the Council and Slovak Act No. 108/2024 Coll.).",
          "The service is digital content not supplied on a tangible medium. Before payment, the User *expressly requests that performance begin immediately* and acknowledges that they thereby lose their right of withdrawal. Accordingly, once performance (the display of the result) has begun, the User has no right of withdrawal. Irrespective of this, the subscription can be cancelled at any time in accordance with section 6.",
          "If performance has not begun for any reason (for example, the result did not appear after payment), the User may withdraw within 14 days of the conclusion of the contract by sending an unequivocal statement to {email}; in that case, the Provider will refund the full fee to the original payment method within 14 days at the latest.",
        ],
      },
      {
        h: "8. Warranty and liability",
        p: [
          "The Provider warrants that the digital content conforms to its description. If the result does not appear or is faulty, the User may report this to {email}; the Provider will remedy the defect within a reasonable time, failing which the User may request a price reduction or terminate the contract (in accordance with Directive (EU) 2019/770).",
          "The result is an estimate; the Provider is not liable for decisions made on the basis of the result. Except for damage caused intentionally or through gross negligence, and for breaches of contract resulting in injury to life, body or health, the Provider's liability is limited to the amount paid by the User for the service concerned.",
          "The Provider strives to keep the website continuously available but is not liable for temporary outages resulting from maintenance or from faults on the part of third parties (e.g. hosting or payment providers).",
        ],
      },
      {
        h: "9. Complaints and redress",
        p: [
          "You can send your complaint to {email}. The Provider will examine the complaint and respond in writing within 30 days at the latest.",
          "Supervisory authority: Slovenská obchodná inšpekcia (Slovak Trade Inspection), Bajkalská 21/A, 827 99 Bratislava, www.soi.sk. The Slovenská obchodná inšpekcia also acts as an alternative dispute resolution body for the out-of-court settlement of consumer disputes.",
          "Consumers living in other EU member states can obtain free help in cross-border disputes from the European Consumer Centre of their country (ECC-Net, https://www.eccnet.eu).",
        ],
      },
      {
        h: "10. Intellectual property",
        p: [
          "The questions, texts, figures, graphic elements and source code of the website are the intellectual property of the Provider (or its licensors). Copying, distributing or using them for commercial purposes without the Provider's prior written consent is prohibited. Sharing the link to your own result is permitted.",
        ],
      },
      {
        h: "11. Data protection",
        p: ["The processing of personal data is described in detail in the [Privacy Policy](privacy)."],
      },
      {
        h: "12. Governing law and amendments to these terms",
        p: [
          "The contract is governed by the law of the Slovak Republic. This does not deprive consumers of the protection afforded to them by provisions that cannot be derogated from by agreement under the law of their country of habitual residence; consumers may also bring proceedings before the courts of their place of residence.",
          "The Provider may amend these terms with effect for the future. Contracts already concluded are governed by the terms in force at the time of conclusion; in the case of a subscription, the Provider will give at least 30 days' notice of any material change by email, and the User may cancel the subscription free of charge.",
          "If any provision of these terms is invalid, this does not affect the validity of the remaining provisions.",
        ],
      },
    ],
  },

  privacy: {
    title: "Privacy Policy",
    lead: "This policy explains what personal data we process when you use the {site} website, for what purposes and for how long, and what rights you have. Data is processed in accordance with the General Data Protection Regulation (EU) 2016/679 (GDPR).",
    sections: [
      {
        h: "1. The controller",
        p: [
          "{company}, {address}, {country} · Company ID (IČO): {ico} · Registration: {register}",
          "Contact for data protection matters: {email}",
        ],
      },
      {
        h: "2. What data do we process, and why?",
        p: [
          "*Taking the test.* Your answers, the age group you selected and the time taken are stored by your own browser (localStorage) so that you can continue the test. No name, email address or user account is needed to take the test. This data only reaches us when you unlock your result.",
          "*Unlocking the result and payment.* When you unlock your result, your answers are attached to the payment transaction data in a short, encoded form so that the server can calculate the result from it. Payment is handled by Stripe: Stripe collects your card details (which we cannot access) and your email address for the receipt and for managing the subscription. From Stripe we receive the payment status, your email address, your country and a customer ID. Legal basis: performance of a contract (Art. 6(1)(b) GDPR) and compliance with accounting obligations (Art. 6(1)(c) GDPR).",
          "*Recognising your subscription.* If you subscribe, we set a signed, strictly necessary cookie (elm_sub) in your browser containing your Stripe customer ID, so that the browser recognises the active subscription. Legal basis: performance of a contract.",
          "*Communication.* If you email us, we process your name, email address and message in order to reply to your enquiry. Legal basis: legitimate interest or performance of a contract.",
          "*Technical logs.* While serving the website, the hosting provider may log technical data (IP address, time, browser type) for a short period for security and troubleshooting purposes. Legal basis: legitimate interest (Art. 6(1)(f) GDPR).",
          "No automated decision-making or profiling with legal effects concerning you takes place. The calculated IQ estimate is indicative only and is not used as the basis for any decision.",
        ],
      },
      {
        h: "3. Cookies and local storage",
        p: [
          "Strictly necessary cookies and local storage (listed below) do not require consent. Analytics and advertising cookies are only used if you consent to them (see below).",
          "- *lang* – the selected language (1 year)",
          "- *elm_sub* – recognising your subscription, for subscribers only (up to 400 days or until deleted)",
          "- *tma_consent* – remembers your cookie choice (180 days)",
          "- *localStorage* – the state of the test, the questions you have already seen and any result not yet unlocked (in your browser, until you delete it)",
          "- *sessionStorage* – after payment, the link to your result for the thank-you page (until you close the tab)",
          "*Analytics and advertising cookies – only with your consent.* If you click “Accept” in the cookie banner, we load the Google tag of Google Ireland Limited (Gordon House, Barrow Street, Dublin 4, Ireland) for two purposes: Google Analytics shows us how visitors use the website, and Google Ads conversion measurement shows whether our ads lead to purchases. Google then sets its own cookies (for example _ga and _ga_… for up to 2 years, _gcl_au for up to 90 days) and receives your IP address, browser and device data, the addresses of the pages you visit, the identifier of the ad click if you arrived from an ad and, for a purchase, its amount and the payment's transaction ID. Legal basis: your consent (Art. 6(1)(a) GDPR). Without your consent, the Google tag is not loaded at all. You can give or withdraw your consent at any time with the “Cookie settings” link in the footer; withdrawal does not affect the lawfulness of earlier processing. Google may also transfer data to the United States (EU–US Data Privacy Framework); its privacy policy: https://policies.google.com/privacy.",
        ],
      },
      {
        h: "4. Who receives the data?",
        p: [
          "- *Stripe Payments Europe, Ltd.* (1 Grand Canal Street Lower, Dublin 2, Ireland) – payment, subscription and invoicing. Stripe may also transfer certain data to the United States; this is based on the EU–US Data Privacy Framework and the European Commission's standard contractual clauses.",
          "- *Hosting provider* – operation of the website, as a processor.",
          "- *Google Ireland Limited* (Gordon House, Barrow Street, Dublin 4, Ireland) – Google Analytics and Google Ads conversion measurement, only with your consent (see section 3).",
          "We do not sell data. Apart from the consent-based Google measurement described in section 3, we do not pass data on to third parties for marketing purposes. We only disclose data to authorities where required to do so by law.",
        ],
      },
      {
        h: "5. How long do we keep the data?",
        p: [
          "- Payment and accounting data: 10 years, as required by Slovak accounting law.",
          "- Subscriber data: for as long as the subscription exists, and thereafter for the accounting retention period.",
          "- Correspondence: up to 3 years after the matter is closed (to enforce claims within the limitation period).",
          "- Technical logs: up to 30 days.",
        ],
      },
      {
        h: "6. Your rights",
        p: [
          "You may request access to the data we hold about you, and request its rectification or erasure, restriction of its processing, or data portability; you may also object to processing based on legitimate interest. Send your request to {email}; we will reply within one month at the latest.",
          "You can lodge a complaint with the Slovak data protection authority (Úrad na ochranu osobných údajov Slovenskej republiky – Office for Personal Data Protection of the Slovak Republic, Hraničná 12, 820 07 Bratislava, www.dataprotection.gov.sk), or with the data protection authority of your country of residence.",
        ],
      },
      {
        h: "7. Security and minors",
        p: [
          "Data is transmitted over an encrypted (HTTPS) connection; the correct answers and the scoring stay on the server, and cookies are protected with a cryptographic signature. Only adults, or users acting with the consent of their legal representative, can pay; we do not knowingly process the data of persons under 16 without parental consent.",
          "We may update this policy when the service changes; the current version is always available on this page.",
        ],
      },
    ],
  },
};

export default en;
