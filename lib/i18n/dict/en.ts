// English UI texts – translation of hu.ts (same structure, see the markup notes there).
import type { Dict } from "./hu";

const en: Dict = {
  lowerNames: true,

  meta: {
    siteTitle: "Online IQ test with instant results",
    siteDescription:
      "What's your IQ? 30 questions on pattern recognition, number sequences, verbal and logical reasoning. No sign-up, with an instant IQ estimate, percentile and a breakdown by area.",
    keywords: ["IQ test", "online IQ test", "IQ score", "intelligence test", "matrix test", "IQ scale"],
    ogTitle: "What's your IQ? · Online IQ test",
    ogDescription: "30 questions, about 12 minutes, instant results – no sign-up.",
    testTitle: "Take the IQ test",
    testDescription: "30 questions on pattern recognition, number sequences, verbal and logical reasoning. No time limit, with instant results.",
    scaleTitle: "IQ scale and percentile calculator",
    scaleDescription: "What does an IQ score mean? The bands of the IQ scale, population shares and a percentile calculator – explained clearly.",
    methodTitle: "Methodology – how we calculate IQ",
    methodDescription:
      "How the questions are built, difficulty weighting, age-group correction and the formula for projecting onto the IQ scale – plus the limits of an online test.",
    resultTitle: "Result",
    resultTitleIq: "IQ {iq}: {band}",
    resultDescription: "IQ estimate: {iq} ({band}). {correct}/{total} correct answers. Take the test yourself!",
    termsTitle: "Terms and Conditions",
    privacyTitle: "Privacy Policy",
    subscriptionTitle: "Manage subscription",
    demoTitle: "Payment (developer simulation)",
    thankYouTitle: "Payment successful",
  },

  brand: {
    tagline: "Online IQ test with instant results",
    home: "{brand} – home",
  },

  nav: {
    test: "The test",
    scale: "IQ scale",
    method: "Methodology",
    faq: "FAQ",
    main: "Main navigation",
    mobile: "Mobile navigation",
    open: "Open menu",
    close: "Close menu",
    start: "Start the test",
    startShort: "Test",
    language: "Language",
  },

  domains: {
    matrix: {
      name: "Pattern recognition",
      short: "Matrices",
      blurb: "Spotting visual rules in 3×3 grids of figures – the purest measure of fluid intelligence.",
    },
    numeric: {
      name: "Numerical reasoning",
      short: "Numbers",
      blurb: "The rules behind number sequences, ratios and short word problems solved by mental arithmetic.",
    },
    verbal: {
      name: "Verbal reasoning",
      short: "Words",
      blurb: "Analogies, opposites and odd ones out – recognising the relationships between concepts.",
    },
    logic: {
      name: "Logical reasoning",
      short: "Logic",
      blurb: "Orderings, time, spatial reasoning and syllogisms – step-by-step, rule-based thinking.",
    },
  },

  difficulty: { easy: "Easy", medium: "Medium", hard: "Hard" },

  ages: { u16: "under 16", none: "not specified" },

  bands: {
    top: {
      label: "Exceptionally high",
      text: "Only about 2% of the population achieve a result like this. You spot abstract rules quickly and reliably, even in complex situations.",
    },
    high: {
      label: "High",
      text: "You performed well above average: even the trickier questions that follow several rules at once come easily to you.",
    },
    above: {
      label: "Above average",
      text: "You did better than most people. You quickly see through new patterns and keep details in mind well.",
    },
    avg: { label: "Average", text: "Half of the population falls into this band. A stable, well-balanced thinking profile." },
    below: {
      label: "Below average",
      text: "The result of an online test depends on many things – tiredness, attention, time pressure. It's worth trying again when you're well rested.",
    },
    low: { label: "Low", text: "This result comes from a short online set of questions, so don't draw far-reaching conclusions from it." },
    vlow: {
      label: "Very low",
      text: "A short online set of questions is not suitable for a diagnosis. If you need a real assessment, a test administered by a professional is the way to go.",
    },
  },

  scaleBands: {
    vlow: {
      label: "Very low",
      desc: "Assessing this properly requires a standardised test administered by a professional – an online test isn't suitable for that.",
    },
    low: { label: "Low", desc: "In online tests, tiredness, lack of attention or a language barrier often pull the result down into this range." },
    below: { label: "Below average", desc: "Abstract thinking that is somewhat slower than average – a range that is perfectly sufficient for everyday life." },
    avg: { label: "Average", desc: "Half of the population falls here: this is the “normal” range, with a well-balanced thinking profile." },
    above: { label: "Above average", desc: "Fast pattern recognition and good working memory – new rules are grasped quickly." },
    high: { label: "High", desc: "Complex tasks that follow several rules at once also come easily." },
    top: { label: "Exceptional", desc: "About 2% of the population. Fast and reliable recognition of abstract rules, even in complicated situations." },
  },

  ordinal: "{n}th",

  charts: {
    bellHint: "Hover over (or tap) a band",
    bellShare: "· ~{share}% of the population",
    bellAria: "Normal distribution of IQ scores",
    bellYou: "You: {iq}",
    radarAria: "Results by area",
    gaugeLabel: "IQ estimate",
    betterThan: "Better than {p}% of the population",
  },

  home: {
    hero: {
      chip: "Online IQ test · instant results",
      title: ["What's", "your *IQ?*"],
      lead: "Every time you take the test, you get {total} fresh questions from a bank of {pool} – pattern recognition, number sequences, words and logic. At the end: an instant IQ estimate, your percentile and a breakdown by area – no sign-up needed.",
      cta: "Start the test",
      try: "Try a sample question",
      facts: { tasks: "questions", minutes: "minutes", areas: "skill areas" },
      scroll: "Scroll",
      ruleLabel: "Rule:",
      rules: { nested: "Two Latin squares", sum: "1st + 2nd = 3rd", rotate: "Rotation +90°", fill: "Fill by column" },
    },
    marquee: ["Patterns", "Number sequences", "Analogies", "Rotation", "Latin squares", "Syllogisms", "Spatial reasoning", "Odd one out", "Ratios", "Orderings"],
    domains: {
      eyebrow: "What does the test measure?",
      title: ["Four abilities,", "*one number.*"],
      lead: "The questions cover four complementary areas. At the end you don't just get an IQ score – you also see which area is your strength.",
      count: "{n} questions",
      word: { a: "dog", b: "puppy", c: "cat", tries: ["mouse", "milk", "kitten"] },
      people: ["Oliver", "Lily", "Emma", "Jack"],
      sorted: "older → younger",
      unsorted: "unsorted statements",
    },
    steps: {
      eyebrow: "How does it work?",
      title: ["Three steps,", "about twelve minutes."],
      items: [
        {
          title: "Choose your age group",
          text: "A single click. We fine-tune the reference group based on your age – no sign-up or user account needed.",
        },
        {
          title: "Solve the {total} questions",
          text: "No time limit. You can also use the keyboard (A–F, arrow keys), go back, and jump to any question.",
        },
        {
          title: "Get your result",
          text: "Right after unlocking: an IQ estimate with your percentile, a breakdown by area, and the solution to every question with an explanation.",
        },
      ],
    },
    tryIt: {
      eyebrow: "Sample question",
      title: ["Which figure fits", "in place of the question mark?"],
      lead: "An easy warm-up – {n} questions of this type are waiting for you in the test.",
      correct: "Exactly! That's the right answer.",
      wrong: "Not quite – the correct answer is {letter}.",
      explain:
        "Each row keeps the same shape and fill, and the size grows from left to right: small, medium, large. The missing item is the large, empty star.",
      full: "On to the full test",
      again: "Again",
      hint: "Watch what changes along the rows and down the columns – shape, size, fill – then pick one of the six options.",
    },
    scale: {
      eyebrow: "The IQ scale",
      title: ["The average is 100.", "Most people score 85 to 115."],
      lead: "IQ isn't an absolute measure but a relative one: it shows where you stand within the population's distribution. The scale has a mean of 100 and a standard deviation of 15 – so about two-thirds of people fall between 85 and 115.",
      link: "Detailed IQ scale and percentile calculator →",
    },
    preview: {
      eyebrow: "Your result",
      title: ["Not just a number –", "*a complete profile.*"],
      sample: "Sample result",
      sampleChip: "{band} · {ord} percentile",
      points: [
        { t: "IQ estimate and percentile", d: "Where you stand compared with the population – in a single, easy-to-grasp number." },
        { t: "Breakdown by area", d: "Patterns, numbers, words, logic: see where your strengths lie." },
        { t: "Solutions with explanations", d: "The correct answer to all 30 questions, with the reasoning." },
        { t: "Shareable link", d: "Send it to your friends in one click – they can try it too." },
      ],
      price:
        "Taking the test is free. You can unlock the full result with {days}-day full access for *{trial}*; unless you cancel, it's {monthly} per month from day {nextDay} – cancel anytime.",
    },
    faq: {
      eyebrow: "FAQ",
      title: ["Frequently asked", "questions."],
      lead: "Everything worth knowing before you start – short and honest.",
    },
    final: {
      eyebrow: "Ready?",
      title: "Twelve minutes, and *you'll know.*",
      text: "{total} questions, no time limit, no sign-up. Taking the test is free; the detailed result is available with {days}-day full access ({trial}).",
      cta: "Let's go!",
    },
  },

  faq: [
    {
      q: "How much does it cost?",
      a: "Taking the test is free and doesn't require sign-up. You can unlock the detailed result with {days}-day full access, which costs {trial}; during this time you can take unlimited tests and see every result. If you don't cancel within the first {days} days, access continues from day {nextDay} as a monthly subscription at {monthly} until you cancel – you can cancel at any time, in one click. You can pay by card, Apple Pay or Google Pay.",
    },
    {
      q: "How do I cancel my subscription?",
      a: "Anytime, in a few clicks: click the “Manage / cancel subscription” link at the bottom of the page and cancel on Stripe's secure customer portal. If you cancel during the trial, you won't be charged again; you keep access until the end of the period you've already paid for.",
    },
    {
      q: "How long does it take?",
      a: "The 30 questions take 10–15 minutes on average. There's no time limit and time doesn't count towards your score – better to think the questions through than to rush.",
    },
    {
      q: "How accurate is an online IQ test?",
      a: "A short online set of questions gives a good estimate of how you perform on tasks that measure abstract reasoning, but it's no substitute for a standardised assessment administered by a psychologist (e.g. WAIS). Treat the result as indicative.",
    },
    {
      q: "How do you calculate IQ?",
      a: "Each correct answer earns points weighted by its difficulty (easy 1, medium 1.5, hard 2). We compare this score with an assumed population distribution – with a small correction by age group – and then project it onto the usual scale with a mean of 100 and a standard deviation of 15. The details are on the Methodology page.",
    },
    {
      q: "Can I go back to an earlier question?",
      a: "Yes. During the test you can go back at any time, skip questions and jump to any question from the top bar. Before submitting, you also see a summary of the questions you skipped.",
    },
    {
      q: "What happens to my answers?",
      a: "Your answers are used only for scoring: when you pay, they are attached to the payment transaction in a short, encoded form, and we calculate your result from that. We don't ask for your name or a user account; your card details are handled by Stripe and we never see them. For the payment, Stripe asks for an email address for the receipt. For subscribers we also set a cookie so the browser recognises the active subscription.",
    },
    {
      q: "Can I take it more than once?",
      a: "Of course. Each time you get a different selection from the bank of 90 questions, and questions you haven't seen yet get priority – across three attempts in a row, not a single question repeats. You will get more practised with the question types, though, so a repeat result is typically a little higher.",
    },
    {
      q: "Is it suitable for children?",
      a: "The questions make sense from age 12. Results for under-16s are calculated with a small age-group correction, but for children especially, an online test is only meant as a playful indication. Only adults (or users acting with the consent of their legal guardian) can pay and subscribe.",
    },
  ],

  footer: {
    blurb: "90 original questions across four skill areas – no sign-up.",
    pages: "Pages",
    takeTest: "Take the IQ test",
    important: "Important",
    disclaimer:
      "The result is an indicative estimate, not a medical or psychological diagnosis. Card details are handled by Stripe; we never see or store them.",
    legal: "Legal",
    terms: "Terms",
    privacy: "Privacy Policy",
    subscription: "Manage / cancel subscription",
    operator: "Operator",
    companyId: "Company ID (IČO)",
    taxId: "Tax ID (DIČ)",
    contact: "Contact",
  },

  test: {
    runner: {
      elapsed: "Time elapsed",
      exit: "Exit",
      questions: "Questions",
      questionN: "Question {n}",
      answeredMark: " (answered)",
      answeredCount: "{a} / {total} answered",
      paging: "Navigation",
      back: "Back",
      keysAnswer: "answer ·",
      keysPage: "navigate",
      summary: "Summary",
      next: "Next",
      skip: "Skip",
    },
    intro: {
      eyebrow: "Before you start",
      title: "Find a quiet *corner.*",
      lead: "Turn off notifications and solve the questions without help. Pen and paper are allowed – calculators and internet searches are not.",
      rules: {
        tasks: "questions, picked from a bank of {pool}",
        minutes: "minutes is the average completion time",
        noLimit: "no time limit, time doesn't count",
        back: "you can go back and skip questions",
      },
      pendingTitle: "The result of a completed test is waiting for you.",
      pendingText: "You answered {a} / {total} questions. You can unlock the result anytime.",
      pendingCta: "Unlock result",
      savedTitle: "You have an unfinished test.",
      savedText: "You've already answered {a} / {total} questions. Pick up where you left off.",
      savedCta: "Continue",
      age: "Age group",
      ageHint: "– for the reference group (optional)",
      tip: "Tip: answer with the {a}–{f} keys and move between questions with the arrow keys.",
      startNew: "Start a new test",
      start: "Start",
    },
    question: {
      difficulty: "Difficulty: {d}",
      pickMissing: "Choose the missing item:",
    },
    review: {
      eyebrow: "Summary",
      allDone: "You've answered *every question.*",
      open: { one: "{n} question is *still open.*", other: "{n} questions are *still open.*" },
      allDoneText: "If you like, you can still review your answers – just click a number.",
      openText: "Skipped questions count as wrong answers. If you're unsure, it's worth guessing.",
      unanswered: " – unanswered",
      answerLetter: " – answer {l}",
      toSkipped: "Go to skipped questions",
      toQuestions: "Back to the questions",
      submit: "Submit",
    },
    analyzing: {
      title: "Scoring in progress…",
      steps: ["Checking answers", "Weighting by difficulty", "Comparing with your age group", "Calculating percentile", "Building your profile"],
    },
  },

  paywall: {
    eyebrow: "Scoring complete",
    title: "Your result is *ready.*",
    summary: "You answered {a} / {total} questions{time}. Unlock it and see where you stand.",
    summaryTime: " in {t}",
    preview: "Your result",
    cancelled: "The payment was cancelled – you haven't been charged. You can try again anytime.",
    includes: "Full access includes:",
    perks: [
      { t: "IQ estimate and percentile", d: "Exactly where you stand compared with the population." },
      { t: "Breakdown by area", d: "Patterns, numbers, words, logic – which one is your strength." },
      { t: "Solutions to all {total} questions", d: "The correct answers with the reasoning, next to your own answers." },
      { t: "Unlimited new tests", d: "While your access is active, you'll see every further result right away too." },
    ],
    accessName: "Payment",
    consent:
      "I accept the [Terms and Conditions](terms) and the [Privacy Policy](privacy), request that the service start immediately, and acknowledge that I thereby lose my 14-day right of withdrawal.",
    consentNeeded: "Please accept the statement above to continue.",
    card: "Debit or credit card",
    loading: "One moment…",
    close: "Cancel",
    busy: "Redirecting…",
    continue: "Continue to payment",
    hostedNote: "In the next step, you'll enter your payment details on Stripe's secure payment page – your card details never reach us.",
    trust: ["256-bit SSL", "Payment via Stripe", "Cancel anytime"],
    renewal:
      "If you don't cancel within the first {days} days, your subscription continues from day {nextDay} at {monthly} per month until you cancel. You can cancel at any time, in one click, on the [Manage subscription](subscription) page.",
    restart: "I'd rather start a new test",
    unknownError: "Unknown error.",
    member: {
      title: "You have an active subscription",
      text: "While your subscription is active, all your results can be opened free of charge.",
      cta: "Open result",
      manage: "Manage subscription",
    },
  },

  result: {
    eyebrow: "Your result",
    verdict: { top: "Outstanding", strong: "Strong", avg: "Average", grow: "Room to grow" },
    shareText: "My IQ estimate on the TestMyAbilities test is {iq}. What's yours?",
    shareTitle: "My IQ result",
    copied: "Link copied!",
    share: "Share result",
    again: "Take it again",
    stats: { correct: "correct answers", time: "completion time", percentile: "percentile", age: "age group" },
    topShare: "You're roughly in the top {top}%.",
    strongest: "Your strongest area: {domain}.",
    bell: {
      eyebrow: "Where do you stand?",
      title: ["Within the population's", "distribution."],
      lead: "The shaded area shows what share of the population scores lower than you: about {p}%.",
    },
    domains: { eyebrow: "Breakdown by area", title: ["This is where you're", "*strongest.*"] },
    solutions: { eyebrow: "Solutions", title: ["Every question,", "with the reasoning."] },
    subBanner:
      "Your subscription is active – you'll also see the results of your next tests instantly, until you cancel. [Manage / cancel subscription](sub)",
    disclaimer:
      "*Important:* this is an estimate based on a short online set of questions. It is no substitute for a standardised intelligence assessment administered by a psychologist, and must not be used as the basis for medical or employment decisions. Details of the calculation are on the [Methodology](method) page.",
    review: {
      all: "All",
      wrong: "Wrong / skipped",
      right: "Correct",
      ok: "correct",
      skipped: "skipped",
      bad: "wrong",
      matrixItem: "Matrix: which figure fits in place of the question mark?",
      you: "you:",
      good: "correct:",
    },
    locked: {
      eyebrow: "Result",
      unpaidTitle: "The payment hasn't come through yet.",
      invalidTitle: "There's no result for this link.",
      unpaidText:
        "If you've just paid, refresh the page in a few seconds. If you cancelled the payment, you can try again anytime on the test page.",
      invalidText: "The link may have been damaged while copying. If you've already taken the test, you can unlock your result on the test page.",
      back: "Back to the test",
      open: "Open the test",
    },
  },

  scalePage: {
    eyebrow: "IQ scale",
    title: ["What does", "*an IQ score mean?*"],
    lead: "IQ shows where you stand within the population's distribution. Drag the slider to see what percentage each score corresponds to.",
    bandsEyebrow: "The bands",
    bandsTitle: ["The IQ scale,", "band by band."],
    topics: [
      {
        t: "Why is the average exactly 100?",
        d: "IQ is a relative measure. Tests are calibrated on a large sample so that average performance is worth 100 points and one standard deviation is worth 15 points. That way any score translates directly into the percentage of the population it beats.",
      },
      {
        t: "What does it measure – and what not?",
        d: "IQ tests measure abstract reasoning, pattern recognition, working memory and verbal-logical reasoning. They don't measure creativity, emotional intelligence, diligence or professional knowledge – even though these matter at least as much.",
      },
      {
        t: "The Flynn effect",
        d: "Over the 20th century, raw test scores in developed countries rose by about 3 points per decade. That's why norms have to be recalculated regularly – an IQ measured against an old norm comes out too high.",
      },
    ],
    cta: "Measure yours",
    calc: {
      eyebrow: "Percentile calculator",
      iqValue: "IQ score",
      percentile: "percentile",
      ofHundred: "people score lower than this",
    },
  },

  methodPage: {
    eyebrow: "Methodology",
    title: ["How your answers become", "*a single number.*"],
    lead: "A transparent, verifiable calculation – and honest words about what an online IQ test is good for, and what it isn't.",
    tasks: {
      title: "The questions",
      p1: "The question bank consists of {pool} original questions, {total} of which come up each time you take the test. For each of the test's {total} slots, {variants} variants were created from the same area and of the same difficulty – so every selection has the same structure and the results are comparable.",
      pairNote: "The number pair: questions per test / questions in the bank.",
      p2: "Matrix questions (Raven-style 3×3 grids of figures) are the purest measure of fluid intelligence, so they make up nearly half of the questions. Difficulty roughly increases as you go: each test has {easy} easy, {medium} medium and {hard} hard questions, and the areas alternate.",
      p3: "Your browser remembers which questions you've already seen and favours unseen ones the next time – so across three attempts in a row, not a single question repeats.",
    },
    scoring: {
      title: "Scoring",
      p1: "Each correct answer earns points weighted by its difficulty; skipped and wrong answers score 0.",
      points: "{d} = {w} pt",
      p2: "We divide the weighted score by the maximum achievable (giving a value between 0 and 1), then project it onto the usual IQ scale:",
      formula: "s  = weighted score / maximum\nz  = (s − ({mean} + correction)) / {sd}\nIQ = 100 + 15 · z        (clamped between {min} and {max})",
      p3: "The mean of {mean} and the standard deviation of {sd} describe the estimated population distribution for this question set. The percentile comes from the cumulative distribution function of the normal distribution: an IQ of 115, for example, is roughly the 84th percentile.",
    },
    age: {
      title: "Age-group correction",
      p1: "Fluid reasoning performance peaks in the mid-twenties and then declines slowly. That's why the results of older test-takers and those under 16 are measured against a slightly lower expected average.",
    },
    limits: {
      title: "Limitations",
      items: [
        "The measurement error of a 30-question online test is much larger than that of a 1–2-hour assessment administered by a psychologist. The result is best read as a band of ±8–10 points.",
        "The norm is estimated rather than based on a representative sample – so the exact figure is indicative.",
        "Retaking the test pushes the result upwards because of the learning effect.",
        "The result is not a diagnosis and is not suitable as a basis for educational, employment or medical decisions.",
      ],
    },
    payment: {
      title: "Payment and privacy",
      p1: "Taking the test is free; the detailed result is available with {days}-day full access ({trial}; unless you cancel, {monthly}/month from day {nextDay}, cancel anytime). Scoring happens on the server; the correct answers never reach your browser. When you pay, your answers are attached to the Stripe payment transaction in a short, encoded form, and the result page calculates your result from that – we don't store them in a separate database.",
      p2: "The state of an unfinished test is kept only by your own browser, so that you can continue. We don't ask for your name or a user account; card details are handled by Stripe and we never see them.",
      cta: "Start the test",
    },
  },

  subscriptionPage: {
    eyebrow: "Subscription",
    title: ["Manage your", "*subscription.*"],
    lead: "Here you can see the status of your subscription and cancel it. Your cancellation is registered immediately; you keep access until the end of the period you've already paid for.",
    status: "Status",
    trialing: "Trial period – ends on {date}. If you don't cancel by then, you'll be charged {monthly} per month afterwards.",
    active: "Active. Next charge: {date}, {amount}.",
    canceling: "Cancelled. Your access lasts until {date}; there will be no further charges.",
    pastDue: "The latest charge failed. Please update your payment method in the customer portal.",
    none: "There's no active subscription on this device.",
    manage: "Manage / cancel subscription",
    manageHint: "Stripe's secure customer portal will open: there you can cancel your subscription, change your card and download your invoices.",
    noDevice: "Subscribed on another device or browser? Sign in with the email address you used at checkout – we'll send you a 6-digit code, and your results will open here too.",
    help: "Got a question, or can't manage to cancel? Email us: {email}",
    portalError: "The customer portal isn't available right now. Please try again in a minute, or email us: {email}",
    demoNote: "Developer mode: no Stripe key is configured, so there's no real subscription here.",
  },

  demoPay: {
    chip: "Developer mode – no real payment",
    title: "Simulate payment",
    text: "No Stripe key is configured, so this page stands in for the Stripe checkout page. Once STRIPE_SECRET_KEY is set, the real card payment appears here.",
    item: "IQ test result",
    pay: "Simulate successful payment",
    cancel: "Cancel payment",
  },

  thankYou: {
    title: "Thank you!",
    lead: "Your payment was successful.",
    unlocked: "Your full result is now unlocked – see where you stand.",
    cta: "See my result",
    cancel: "You can cancel your subscription at any time, in one click, on the [Manage subscription](subscription) page.",
  },

  cookies: {
    title: "Cookies",
    text: "We use essential cookies to keep you signed in and remember your language. With your consent, we also use analytics and advertising cookies (Google Analytics, Google Ads) to understand how the site is used and how well our ads work. [Privacy Policy](privacy)",
    accept: "Accept",
    reject: "Reject",
    settings: "Cookie settings",
  },

  notFound: {
    title: "This page doesn't exist.",
    text: "There may be a typo in the address, or the page has been removed.",
    home: "Back to the home page",
  },

  legal: {
    updated: "Effective: {date}",
    draftNote: "",
    toc: "Contents",
  },

  stripe: {
    subName: "TestMyAbilities subscription",
    subDesc: "Unlimited IQ tests and detailed results. Renews monthly, cancel anytime.",
    trialName: "{days}-day full access",
    submitNote:
      "Today you'll be charged {trial} for the {days}-day full access. If you don't cancel within the first {days} days, {monthly} per month will be charged automatically from day {nextDay} until you cancel. You can cancel anytime via the “Manage / cancel subscription” link at the bottom of the website.",
  },

  auth: {
    title: "Sign in",
    intro: "Enter the email address linked to your subscription and we'll send you a 6-digit sign-in code.",
    email: "Email address",
    sendCode: "Send code",
    sent: "If there's a subscription linked to {email}, we've sent the code there. Check your spam folder too.",
    code: "Sign-in code",
    verify: "Sign in",
    resend: "Request a new code",
    otherEmail: "Use a different email address",
    haveAccount: "Already a subscriber?",
    login: "Sign in",
    backToPay: "Back to payment",
    signedIn: "You're signed in on this device.",
    logout: "Sign out",
    errors: {
      invalidEmail: "Please enter a valid email address.",
      rateLimited: "Too many attempts. Wait a few minutes and try again.",
      emailFailed: "We couldn't send the email. Please try again in a minute.",
      unavailable: "Sign-in isn't available right now. Please try again in a minute.",
      codeInvalid: "That code isn't right. Check it and try again.",
      codeExpired: "The code has expired. Request a new one.",
      codeLocked: "Too many wrong attempts. Request a new code.",
    },
  },

  email: {
    subject: "{code} – your sign-in code ({site})",
    intro: "Use this code to sign in to {site}:",
    validity: "The code is valid for {minutes} minutes.",
    ignore: "If you didn't request this, you can safely ignore this email.",
  },

  api: {
    invalid: "Invalid submission.",
    unavailable: "The payment page isn't available right now. Please try again in a minute.",
    notConfigured: "Payment hasn't been set up on this site yet.",
    notMember: "There's no active subscription on this device.",
  },
};

export default en;
