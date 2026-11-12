/* Landing page: copy (EN/HE), hero chat loop, the entry into the agent builder, pricing, FAQ */
(() => {
  "use strict";
  const { $, $$ } = RH;

  RH.i18n({
    en: {
      doc: "Rabbit Hole — Turn their birthday into a 7-day mystery", navAria: "Main", homeAria: "Rabbit Hole home",
      navHow: "How it works", navPricing: "Pricing", navFaq: "FAQ", navDemo: "Play the demo",
      heroEyebrow: "A 7-day birthday mystery",
      heroH1: "Turn their birthday into a <em>week-long mystery</em>.",
      heroLede: "A personal AI agent, made just for them, texts your friend one challenge a day, <b>built from their own life</b>. The last clue reveals <span class=\"redact\" id=\"redact\">your gift</span>.",
      heroCta1: "Start a mystery · from $79", heroCta2: "Play the 2-minute demo",
      meta1: "📅 7 days, 1 mission a day", meta2: "🧩 Puzzles from their life", meta3: "🎁 Ends on your gift",
      sampleLbl: "Sample · loops", online: "online", typing: "typing…",
      howEyebrow: "How it works", howH2: "Five minutes from you. A week of mystery for them.",
      s1h: "Tell Vesper about them", s1p: "Five minutes of stories: a habit, a memory, a place. You check every detail before it's used.",
      s2h: "Meet their agent", s2p: "Three characters made for them. Chat with one and play the whole week before you approve.",
      s3h: "Their agent runs the week", s3p: "A message every morning, a challenge to solve, hints when they're stuck. Day 7 opens the vault: your gift.",
      formEyebrow: "Step 1 · Meet Vesper", formH2: "Tell Vesper about your friend", formLede: "A five-minute chat about who they are. Vesper builds an agent only they could get, and you see the whole week before anything is sent.",
      b1h: "Stories, not forms", b1p: "A habit, a memory, a place, what they're into. Vesper asks once more when an answer is thin.",
      b2h: "You check every fact", b2p: "The agent can only say what you confirmed. Anything off limits stays off limits.",
      b3h: "Meet their agent", b3p: "Three characters made for them. Pick one, chat with it, then play the whole week yourself.",
      b4h: "The gift stays sealed", b4p: "The agent never sees it. It appears only on the last day.",
      fSubmit: "Start with Vesper →", summary: "Plan: <b>{plan}</b> · <a href=\"#pricing\">change</a>",
      plans: { field: "Field Agent $79", full: "Full Operation $149" },
      priceEyebrow: "Pricing", priceH2: "One price. No subscription.",
      t1Name: "Field Agent", t1Price: "$79", perOp: "/ one mystery", t1a: "7 days, one mission each morning", t1b: "Cipher, map and photo mini-games", t1c: "Live in-character replies and hints", t1d: "Digital finale: a reveal page for your gift", t1Btn: "Choose Field Agent",
      badge: "RECOMMENDED", t2Name: "Full Operation", t2Price: "$149", t2a: "7 days, timed to land on the birthday", t2b: "Everything in Field Agent, plus 2 bonus side-quests", t2c: "A video message from you, played inside the vault", t2d: "Physical finale help: hidden box, drop or meetup", t2e: "A keepsake case-file PDF afterwards", t2Btn: "Choose Full Operation",
      demoEyebrow: "Playable demo · You are the giftee", demoH2: "You're Noa. Your phone just buzzed.",
      demoLede: "Maya booked a Rabbit Hole for your 30th. Reply to Vesper, open each mission, solve it, come back. Days 1–3 are playable here.",
      demoBadge: "Demo · not a real app",
      sideLede: "Tap a quick reply or type anything. Vesper stays in character. Open a mission card, solve it, then tap <b>Back to chat</b>.",
      timelineAria: "7-day timeline", reset: "↺ Reset demo",
      faqEyebrow: "FAQ", faqH2: "Good questions",
      faq: [
        ["Is it creepy?", "<p>It shouldn't be, and we built it so it isn't. <b>Their agent says who sent the game in its very first message.</b> No anonymous stranger who knows your address.</p><p>Your friend can reply <b>STOP</b> at any point. The agent goes quiet straight away and you get a gentle heads-up, so you can hand over the gift the normal way.</p>"],
        ["What about privacy?", "<p>We ask for first names and a few stories. <b>No surnames, no addresses, no contacts, no tracking.</b> You check every detail before the agent can use it.</p><p>The brief and the chat are <b>deleted 30 days after the reveal</b>. Photo missions run in the browser, so <b>photos stay on their phone</b> and never reach us.</p>"],
        ["How does my friend get the messages?", "<p>Every morning their agent texts them, with a private link to that day's mission. They reply right there by text. Nothing to install and no account to make.</p>"],
        ["What if they get stuck?", "<p>Every mission has three levels of hints and a skip button. They can also just ask their agent. Nobody gets stuck on their own birthday.</p>"],
        ["What if they're busy that week?", "<p>Missions wait. They can play Tuesday's mission on Thursday. The finale only opens once the earlier missions are solved (or skipped).</p>"],
        ["Can I follow along?", "<p>Yes. You get a short daily update: what they solved, how many hints they used, and their best replies (with their permission).</p>"],
      ],
      footL: "© Rabbit Hole · A birthday mystery, run by Agent Vesper", foot: "Prototype, demo content — all characters fictional",
      loop: [
        ["v", "Noa."], ["v", "Don't panic. Someone who loves you hired me for your birthday 🎂"], ["n", "wait WHAT 😳"],
        ["v", "<span class='lp-mini'>🔐 <b>Mission 1 · The Wheel</b></span>"], ["n", "HADEKEL?!"], ["v", "Correct. Day 1 done ✅ See you tomorrow, Agent."],
      ],
    },
    he: {
      doc: "Rabbit Hole — הופכים יום הולדת לתעלומה של שבוע", navAria: "ראשי", homeAria: "Rabbit Hole, דף הבית",
      navHow: "איך זה עובד", navPricing: "מחירים", navFaq: "שאלות", navDemo: "לשחק בדמו",
      heroEyebrow: "תעלומת יום הולדת של 7 ימים",
      heroH1: "הופכים את יום ההולדת שלהם ל<em>תעלומה של שבוע שלם</em>.",
      heroLede: "סוכן AI אישי, שנבנה רק בשבילם, שולח לחבר או לחברה שלכם אתגר אחד ביום, <b>שבנוי מהחיים שלהם</b>. הרמז האחרון חושף את <span class=\"redact\" id=\"redact\">המתנה שלכם</span>.",
      heroCta1: "ליצור תעלומה · החל מ־₪249", heroCta2: "לשחק בדמו (2 דקות)",
      meta1: "📅 7 ימים, משימה ביום", meta2: "🧩 חידות מהחיים שלהם", meta3: "🎁 נגמר במתנה שלכם",
      sampleLbl: "דוגמה · בלופ", online: "מחוברת", typing: "מקלידה…",
      howEyebrow: "איך זה עובד", howH2: "חמש דקות שלכם. שבוע של תעלומה בשבילם.",
      s1h: "מספרים לוספר עליהם", s1p: "חמש דקות של סיפורים: הרגל, זיכרון, מקום. אתם מאשרים כל פרט לפני שמשתמשים בו.",
      s2h: "מכירים את הסוכן שלהם", s2p: "שלוש דמויות שנבנו בשבילם. מדברים עם אחת ומשחקים את כל השבוע לפני שמאשרים.",
      s3h: "הסוכן מנהל את השבוע", s3p: "הודעה כל בוקר, אתגר לפתור, רמזים כשנתקעים. ביום 7 נפתחת הכספת, ובה המתנה שלכם.",
      formEyebrow: "שלב 1 · מכירים את וספר", formH2: "ספרו לוספר על החבר או החברה", formLede: "שיחה של חמש דקות על מי שהם. וספר בונה סוכן שרק הם יכולים לקבל, ואתם רואים את כל השבוע לפני שמשהו נשלח.",
      b1h: "סיפורים, לא טפסים", b1p: "הרגל, זיכרון, מקום, מה שמעניין אותם עכשיו. וספר שואלת שוב כשתשובה דלה.",
      b2h: "אתם בודקים כל פרט", b2p: "הסוכן יכול להגיד רק מה שאישרתם. מה שאסור, נשאר אסור.",
      b3h: "מכירים את הסוכן שלהם", b3p: "שלוש דמויות שנבנו בשבילם. בוחרים אחת, מדברים איתה, ומשחקים את כל השבוע בעצמכם.",
      b4h: "המתנה נשארת חתומה", b4p: "הסוכן לא רואה אותה אף פעם. היא מופיעה רק ביום האחרון.",
      fSubmit: "← מתחילים עם וספר", summary: "מסלול: <b>{plan}</b> · <a href=\"#pricing\">לשנות</a>",
      plans: { field: "סוכן שטח ₪249", full: "מבצע מלא ₪449" },
      priceEyebrow: "מחירים", priceH2: "מחיר אחד. בלי מנוי.",
      t1Name: "סוכן שטח", t1Price: "₪249", perOp: "/ לתעלומה", t1a: "7 ימים, משימה כל בוקר", t1b: "מיני־משחקים: צופן, מפה וצילום", t1c: "תשובות ורמזים בזמן אמת, בתוך הדמות", t1d: "סיום דיגיטלי: עמוד חשיפה למתנה", t1Btn: "לבחור סוכן שטח",
      badge: "מומלץ", t2Name: "מבצע מלא", t2Price: "₪449", t2a: "7 ימים, מתוזמן לנחות בדיוק ביום ההולדת", t2b: "כל מה שבסוכן שטח, ועוד 2 משימות צד", t2c: "הודעת וידאו מכם, שמתנגנת בתוך הכספת", t2d: "עזרה בסיום פיזי: קופסה מוסתרת, מסירה או מפגש", t2e: "קובץ PDF למזכרת עם כל התיק", t2Btn: "לבחור מבצע מלא",
      demoEyebrow: "דמו לשחק · את מקבלת המתנה", demoH2: "את נועה. הטלפון שלך רטט הרגע.",
      demoLede: "מאיה הזמינה לך Rabbit Hole ליום ההולדת ה־30. עני לוספר, פתחי כל משימה, פתרי וחזרי. ימים 1–3 פתוחים כאן למשחק.",
      demoBadge: "דמו · לא אפליקציה אמיתית",
      sideLede: "הקישי על תשובה מהירה או כתבי מה שבא לך. וספר לא יוצאת מהדמות. פתחי כרטיס משימה, פתרי, ואז הקישי <b>חזרה לצ׳אט</b>.",
      timelineAria: "ציר זמן של 7 ימים", reset: "↺ איפוס הדמו",
      faqEyebrow: "שאלות נפוצות", faqH2: "שאלות טובות",
      faq: [
        ["זה לא קצת מלחיץ? (קריפי?)", "<p>זה לא אמור להיות, ובנינו את זה בדיוק כדי שלא יהיה. <b>כבר בהודעה הראשונה הסוכן מגלה מי שלח את המשחק.</b> אין זר אנונימי שיודע איפה גרתם.</p><p>אפשר לכתוב <b>STOP</b> בכל שלב. הסוכן משתתק מיד, ואתם מקבלים עדכון עדין, כדי לתת את המתנה בדרך הרגילה.</p>"],
        ["ומה עם פרטיות?", "<p>אנחנו מבקשים שמות פרטיים וכמה סיפורים. <b>בלי שם משפחה, בלי כתובות, בלי אנשי קשר, בלי מעקב.</b> אתם מאשרים כל פרט לפני שהסוכן יכול להשתמש בו.</p><p>התדריך והצ׳אט <b>נמחקים 30 יום אחרי החשיפה</b>. משימות הצילום רצות בדפדפן, כך ש<b>התמונות נשארות בטלפון שלהם</b> ולא מגיעות אלינו.</p>"],
        ["איך ההודעות מגיעות אליהם?", "<p>כל בוקר הסוכן שולח להם הודעה, עם קישור פרטי למשימה של אותו יום. עונים שם, בהודעה. לא צריך להתקין כלום או לפתוח חשבון.</p>"],
        ["ומה אם הם נתקעים?", "<p>לכל משימה יש שלוש רמות של רמזים וכפתור דילוג. אפשר גם פשוט לבקש מהסוכן. אף אחד לא נתקע ביום ההולדת שלו.</p>"],
        ["ומה אם יש להם שבוע עמוס?", "<p>המשימות מחכות. אפשר לשחק במשימה של שלישי ביום חמישי. הסיום נפתח רק אחרי שהמשימות הקודמות נפתרו (או שדילגו עליהן).</p>"],
        ["אפשר לעקוב מהצד?", "<p>כן. תקבלו עדכון יומי קצר: מה הם פתרו, כמה רמזים לקחו, והתשובות הכי טובות שלהם (באישורם).</p>"],
      ],
      footL: "© Rabbit Hole · תעלומת יום הולדת בהנחיית הסוכנת וספר", foot: "אב־טיפוס, תוכן לדוגמה — כל הדמויות בדיוניות",
      loop: [
        ["v", "נועה."], ["v", "אל תיבהלי. מישהי שאוהבת אותך שכרה אותי ליום ההולדת שלך 🎂"], ["n", "רגע מה 😳"],
        ["v", "<span class='lp-mini'>🔐 <b>משימה 1 · הגלגל</b></span>"], ["n", "הדקל?!"], ["v", "נכון. יום 1 מאחורייך ✅ נתראה מחר, סוכנת."],
      ],
    },
  });

  // Hero: un-redact the gift after a beat
  setTimeout(() => { const r = $("#redact"); if (r) r.classList.add("revealed"); }, RH.reduced ? 0 : 1600);

  /* ---------- hero: looping sample chat ---------- */
  const loopEl = $("#loop"), loopStatus = $("#loopStatus");
  const bubble = (from, html, cls = "") => `<div class="row ${from} first ${cls}"><div class="bub"><p>${html}</p></div></div>`;
  const LOOP = RH.t("loop");
  if (RH.reduced) loopEl.innerHTML = LOOP.map(([f, h]) => bubble(f, h)).join("");
  else {
    let i = 0, timer = 0, visible = true;
    const step = () => {
      if (!visible) { timer = setTimeout(step, 800); return; }
      if (i === 0) loopEl.innerHTML = "";
      if (i >= LOOP.length) { loopEl.classList.add("fade"); timer = setTimeout(() => { loopEl.classList.remove("fade"); loopEl.innerHTML = ""; i = 0; step(); }, 2600); return; }
      const [from, html] = LOOP[i];
      if (from === "v") {
        loopStatus.textContent = RH.t("typing"); loopStatus.style.color = "";
        loopEl.insertAdjacentHTML("beforeend", `<div class="row v first" id="loopTyping"><div class="typing-bub"><i></i><i></i><i></i></div></div>`);
        timer = setTimeout(() => { $("#loopTyping")?.remove(); loopStatus.textContent = RH.t("online"); loopEl.insertAdjacentHTML("beforeend", bubble(from, html)); i++; timer = setTimeout(step, 700); }, 900);
      } else { loopEl.insertAdjacentHTML("beforeend", bubble(from, html)); i++; timer = setTimeout(step, 1000); }
    };
    if ("IntersectionObserver" in window) new IntersectionObserver(es => { visible = es[0].isIntersecting; }).observe(loopEl);
    timer = setTimeout(step, 500);
  }

  /* ---------- plan picker: carries the chosen plan and language into the builder ---------- */
  let plan = "full";
  function summary() {
    $("#formSummary").innerHTML = RH.t("summary", { plan: RH.t("plans")[plan] });
    $("#builderLink").href = `builder.html?plan=${plan}&lang=${RH.lang}`;
  }
  function renderPlan() { $$(".tier").forEach(el => el.classList.toggle("selected", el.dataset.tier === plan)); summary(); }
  $$("[data-pick]").forEach(b => b.addEventListener("click", () => {
    plan = b.dataset.pick; renderPlan(); RH.sfx("ok");
    $("#dossier").scrollIntoView({ behavior: RH.reduced ? "auto" : "smooth" });
    setTimeout(() => $("#builderLink").focus({ preventScroll: true }), 600);
  }));
  renderPlan();

  /* ---------- FAQ accordions ---------- */
  $("#faqList").innerHTML = RH.t("faq").map(([q, a], i) => `<details id="faq-${i}"><summary>${q}</summary><div class="a">${a}</div></details>`).join("");
})();
