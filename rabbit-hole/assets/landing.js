/* Landing page: copy (EN/HE), hero chat loop, brief form -> Day 1 preview -> approve, pricing, FAQ */
(() => {
  "use strict";
  const { $, $$, esc } = RH;
  const HE = RH.he;

  RH.i18n({
    en: {
      doc: "Rabbit Hole — Turn their birthday into a 7-day mystery", navAria: "Main", homeAria: "Rabbit Hole home",
      navHow: "How it works", navPricing: "Pricing", navFaq: "FAQ", navDemo: "Play the demo",
      heroEyebrow: "A 7-day birthday mystery",
      heroH1: "Turn their birthday into a <em>week-long mystery</em>.",
      heroLede: "Agent Vesper, an AI game master, texts your friend one puzzle a day, <b>built from their own life</b>. The last clue reveals <span class=\"redact\" id=\"redact\">your gift</span>.",
      heroCta1: "Start a mystery · from $79", heroCta2: "Play the 2-minute demo",
      meta1: "📅 7 days, 1 mission a day", meta2: "🧩 Puzzles from their life", meta3: "🎁 Ends on your gift",
      sampleLbl: "Sample · loops", online: "online", typing: "typing…",
      howEyebrow: "How it works", howH2: "Five minutes from you. A week of mystery for them.",
      s1h: "Tell us about them", s1p: "A name, the street they grew up on, an inside joke, and the gift. That's the whole brief.",
      s2h: "Preview and approve", s2p: "See Day 1 exactly as they'll get it, cipher and all. Nothing goes out until you say so.",
      s3h: "Vesper runs the week", s3p: "A message every morning, a mini-game to solve, hints when they're stuck. Day 7 opens the vault: your gift.",
      formEyebrow: "Step 1 · The brief", formH2: "Tell us about your friend", formLede: "The more specific, the better the puzzles. You'll preview Day 1 before anything is sent.",
      fName: "Friend's first name", fNamePh: "e.g. Noa", fYou: "Your first name", fYouPh: "e.g. Maya", fYouH: "Vesper tells them who sent the game on Day 1. No creepy anonymous stuff.",
      fNick: "Nickname", fNickPh: "e.g. Noodle", fStreet: "Street they grew up on", fStreetPh: "e.g. Hadekel", fStreetH: "This becomes their Day 1 cipher.",
      fStory: "Story", fJokes: "An inside joke", fJokesPh: "e.g. Three ducks walk into a falafel stand… nobody else knows the ending",
      fGift: "The gift, and how it's revealed", fGiftPh: "e.g. Concert tickets. The final answer is the seat number.",
      fSubmit: "Preview their Day 1 →", fErr: "Vesper needs at least their name, your name, a street and the gift.", fErrStreet: "Use letters for the street, so Vesper can turn it into a cipher.",
      summary: "Story: <b>{story}</b> · Plan: <b>{plan}</b> · <a href=\"#pricing\">change</a>",
      stories: { spy: "🕵️ Spy thriller", haunted: "🕯️ Haunted archive", heist: "⏳ Time heist" },
      plans: { field: "Field Agent $79", full: "Full Operation $149" },
      pvTitle: "Day 1 preview", pvStamp: "PREVIEW · NOT SENT", pvFor: "for {name}",
      pvExplain: "This is what lands on their phone on the morning of Day 1. Here's the cipher Vesper made from their street:",
      pvSee: "What they'll see", pvTry: "Try it: turn the wheel", pvMinus: "Shift back", pvPlus: "Shift forward",
      pvApprove: "Looks good — approve", pvEdit: "Edit details", pvApprovedStamp: "APPROVED",
      apTitle: "Case #{c} approved", apText: "Vesper makes first contact with {name} on the morning of Day 1. You'll get a daily update on their progress. (Demo: nothing was sent or saved.)",
      pv: [
        p => `${p.name}.`,
        () => "Don't panic. And please don't block this number, I've had a long week.",
        () => "I'm Vesper. Someone who knows you annoyingly well hired me for your birthday. 🎂",
        p => `Full disclosure, because I play fair: it was <b>${p.you}</b>. Reply STOP anytime and I'll vanish.`,
        p => p.nick ? `Seven days, ${p.nick}. One mission each morning. The last one opens a door.` : "Seven days. One mission each morning. The last one opens a door.",
        () => "Mission 1 is a street you know very well. 📍",
      ],
      priceEyebrow: "Pricing", priceH2: "One price. No subscription.",
      t1Name: "Field Agent", t1Price: "$79", perOp: "/ one mystery", t1a: "5 days, one mission each morning", t1b: "Cipher, map and photo mini-games", t1c: "Live in-character replies and hints", t1d: "Digital finale: a reveal page for your gift", t1Btn: "Choose Field Agent",
      badge: "MOST CHOSEN", t2Name: "Full Operation", t2Price: "$149", t2a: "7 days, timed to land on the birthday", t2b: "Everything in Field Agent, plus 2 bonus side-quests", t2c: "A video message from you, played inside the vault", t2d: "Physical finale help: hidden box, drop or meetup", t2e: "A keepsake case-file PDF afterwards", t2Btn: "Choose Full Operation",
      demoEyebrow: "Playable demo · You are the giftee", demoH2: "You're Noa. Your phone just buzzed.",
      demoLede: "Maya booked a Rabbit Hole for your 30th. Reply to Vesper, open each mission, solve it, come back. Days 1–3 are playable here.",
      demoBadge: "Demo · not a real app",
      sideLede: "Tap a quick reply or type anything. Vesper stays in character. Open a mission card, solve it, then tap <b>Back to chat</b>.",
      timelineAria: "7-day timeline", reset: "↺ Reset demo",
      faqEyebrow: "FAQ", faqH2: "Good questions",
      faq: [
        ["Is it creepy?", "<p>It shouldn't be, and we built it so it isn't. <b>Vesper says who sent the game in the first conversation on Day 1.</b> No anonymous stranger who knows your address.</p><p>Your friend can reply <b>STOP</b> at any point. Vesper goes quiet straight away and you get a gentle heads-up, so you can hand over the gift the normal way.</p>"],
        ["What about privacy?", "<p>We ask for the minimum: a first name, a street, a joke, the gift. <b>No surnames, no contacts, no tracking.</b></p><p>The brief and the chat are <b>deleted 30 days after the reveal</b>. Photo missions run in the browser, so <b>photos stay on their phone</b> and never reach us.</p>"],
        ["How does my friend get the messages?", "<p>They get one text with a private link. The game runs in a chat-style page in their browser. Nothing to install and no account to make.</p>"],
        ["What if they get stuck?", "<p>Every mission has three levels of hints and a skip button. They can also just ask Vesper. Nobody gets stuck on their own birthday.</p>"],
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
      heroLede: "הסוכנת וספר, מנחת משחק מבוססת AI, שולחת לחבר או לחברה שלכם חידה אחת ביום, <b>שבנויה מהחיים שלהם</b>. הרמז האחרון חושף את <span class=\"redact\" id=\"redact\">המתנה שלכם</span>.",
      heroCta1: "ליצור תעלומה · החל מ־₪249", heroCta2: "לשחק בדמו (2 דקות)",
      meta1: "📅 7 ימים, משימה ביום", meta2: "🧩 חידות מהחיים שלהם", meta3: "🎁 נגמר במתנה שלכם",
      sampleLbl: "דוגמה · בלופ", online: "מחוברת", typing: "מקלידה…",
      howEyebrow: "איך זה עובד", howH2: "חמש דקות שלכם. שבוע של תעלומה בשבילם.",
      s1h: "מספרים לנו עליהם", s1p: "שם, הרחוב שבו גדלו, בדיחה פנימית אחת, והמתנה. זה כל התדריך.",
      s2h: "רואים ומאשרים", s2p: "רואים את יום 1 בדיוק כמו שהם יקבלו אותו, כולל הצופן. שום דבר לא נשלח בלי האישור שלכם.",
      s3h: "וספר מנהלת את השבוע", s3p: "הודעה כל בוקר, מיני־משחק לפתור, רמזים כשנתקעים. ביום 7 נפתחת הכספת, ובה המתנה שלכם.",
      formEyebrow: "שלב 1 · התדריך", formH2: "ספרו לנו על החבר או החברה", formLede: "ככל שתהיו ספציפיים יותר, החידות ייצאו טובות יותר. לפני שמשהו נשלח, תראו את יום 1.",
      fName: "השם הפרטי שלהם", fNamePh: "למשל: נועה", fYou: "השם הפרטי שלכם", fYouPh: "למשל: מאיה", fYouH: "כבר ביום 1 וספר מספרת להם מי שלח את המשחק. בלי אנונימיות מלחיצה.",
      fNick: "כינוי", fNickPh: "למשל: נודל", fStreet: "הרחוב שבו גדלו", fStreetPh: "למשל: הדקל", fStreetH: "מזה וספר בונה את הצופן של יום 1.",
      fStory: "סיפור", fJokes: "בדיחה פנימית", fJokesPh: "למשל: שלושה ברווזים נכנסים לדוכן פלאפל… ורק אתם יודעים איך זה נגמר",
      fGift: "המתנה, ואיך לחשוף אותה", fGiftPh: "למשל: כרטיסים להופעה. התשובה האחרונה היא מספר המקום.",
      fSubmit: "← לתצוגה מקדימה של יום 1", fErr: "וספר צריכה לפחות את השם שלהם, את השם שלכם, רחוב ומתנה.", fErrStreet: "כתבו את שם הרחוב באותיות, כדי שוספר תוכל להצפין אותו.",
      summary: "סיפור: <b>{story}</b> · מסלול: <b>{plan}</b> · <a href=\"#pricing\">לשנות</a>",
      stories: { spy: "🕵️ מותחן ריגול", haunted: "🕯️ הארכיון הרדוף", heist: "⏳ שוד בזמן" },
      plans: { field: "סוכן שטח ₪249", full: "מבצע מלא ₪449" },
      pvTitle: "תצוגה מקדימה: יום 1", pvStamp: "תצוגה · לא נשלח", pvFor: "עבור {name}",
      pvExplain: "זה מה שיגיע אליהם לטלפון בבוקר של יום 1. וזה הצופן שוספר בנתה מהרחוב שלהם:",
      pvSee: "מה שהם יראו", pvTry: "נסו בעצמכם: סובבו את הגלגל", pvMinus: "הזזה אחורה", pvPlus: "הזזה קדימה",
      pvApprove: "נראה מעולה, מאשרים", pvEdit: "לערוך פרטים", pvApprovedStamp: "אושר",
      apTitle: "תיק מס׳ {c} אושר", apText: "וספר תיצור קשר עם {name} בבוקר של יום 1. תקבלו עדכון יומי על ההתקדמות. (דמו: שום דבר לא נשלח ולא נשמר.)",
      pv: [
        p => `${p.name}.`,
        p => p.g === "m" ? "אל תיבהל. ובבקשה אל תחסום את המספר הזה, היה לי שבוע ארוך." : "אל תיבהלי. ובבקשה אל תחסמי את המספר הזה, היה לי שבוע ארוך.",
        p => p.g === "m" ? "אני וספר. מישהו שמכיר אותך טוב באופן מעצבן שכר אותי לכבוד יום ההולדת שלך. 🎂" : "אני וספר. מישהו שמכיר אותך טוב באופן מעצבן שכר אותי לכבוד יום ההולדת שלך. 🎂",
        p => `גילוי נאות, כי אני משחקת הוגן: מי ששלח אותי זה <b>${p.you}</b>. אפשר לכתוב STOP בכל רגע, ואני נעלמת.`,
        p => p.nick ? `שבעה ימים, ${p.nick}. משימה אחת כל בוקר. האחרונה פותחת דלת.` : "שבעה ימים. משימה אחת כל בוקר. האחרונה פותחת דלת.",
        p => p.g === "m" ? "משימה 1 היא רחוב שאתה מכיר טוב מאוד. 📍" : "משימה 1 היא רחוב שאת מכירה טוב מאוד. 📍",
      ],
      priceEyebrow: "מחירים", priceH2: "מחיר אחד. בלי מנוי.",
      t1Name: "סוכן שטח", t1Price: "₪249", perOp: "/ לתעלומה", t1a: "5 ימים, משימה כל בוקר", t1b: "מיני־משחקים: צופן, מפה וצילום", t1c: "תשובות ורמזים בזמן אמת, בתוך הדמות", t1d: "סיום דיגיטלי: עמוד חשיפה למתנה", t1Btn: "לבחור סוכן שטח",
      badge: "הכי נבחר", t2Name: "מבצע מלא", t2Price: "₪449", t2a: "7 ימים, מתוזמן לנחות בדיוק ביום ההולדת", t2b: "כל מה שבסוכן שטח, ועוד 2 משימות צד", t2c: "הודעת וידאו מכם, שמתנגנת בתוך הכספת", t2d: "עזרה בסיום פיזי: קופסה מוסתרת, מסירה או מפגש", t2e: "קובץ PDF למזכרת עם כל התיק", t2Btn: "לבחור מבצע מלא",
      demoEyebrow: "דמו לשחק · את מקבלת המתנה", demoH2: "את נועה. הטלפון שלך רטט הרגע.",
      demoLede: "מאיה הזמינה לך Rabbit Hole ליום ההולדת ה־30. עני לוספר, פתחי כל משימה, פתרי וחזרי. ימים 1–3 פתוחים כאן למשחק.",
      demoBadge: "דמו · לא אפליקציה אמיתית",
      sideLede: "הקישי על תשובה מהירה או כתבי מה שבא לך. וספר לא יוצאת מהדמות. פתחי כרטיס משימה, פתרי, ואז הקישי <b>חזרה לצ׳אט</b>.",
      timelineAria: "ציר זמן של 7 ימים", reset: "↺ איפוס הדמו",
      faqEyebrow: "שאלות נפוצות", faqH2: "שאלות טובות",
      faq: [
        ["זה לא קצת מלחיץ? (קריפי?)", "<p>זה לא אמור להיות, ובנינו את זה בדיוק כדי שלא יהיה. <b>כבר בשיחה הראשונה ביום 1 וספר מגלה מי שלח את המשחק.</b> אין זר אנונימי שיודע איפה גרתם.</p><p>אפשר לכתוב <b>STOP</b> בכל שלב. וספר משתתקת מיד, ואתם מקבלים עדכון עדין, כדי לתת את המתנה בדרך הרגילה.</p>"],
        ["ומה עם פרטיות?", "<p>אנחנו מבקשים את המינימום: שם פרטי, רחוב, בדיחה ומתנה. <b>בלי שם משפחה, בלי אנשי קשר, בלי מעקב.</b></p><p>התדריך והצ׳אט <b>נמחקים 30 יום אחרי החשיפה</b>. משימות הצילום רצות בדפדפן, כך ש<b>התמונות נשארות בטלפון שלהם</b> ולא מגיעות אלינו.</p>"],
        ["איך ההודעות מגיעות אליהם?", "<p>הם מקבלים הודעת SMS אחת עם קישור פרטי. המשחק רץ בעמוד בסגנון צ׳אט בדפדפן. לא צריך להתקין כלום או לפתוח חשבון.</p>"],
        ["ומה אם הם נתקעים?", "<p>לכל משימה יש שלוש רמות של רמזים וכפתור דילוג. אפשר גם פשוט לבקש מוספר. אף אחד לא נתקע ביום ההולדת שלו.</p>"],
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

  /* ---------- brief form ---------- */
  let story = "spy", plan = "full", gender = "f";
  const STORIES = RH.t("stories");
  $("#storyChips").innerHTML = Object.keys(STORIES).map(k => `<button type="button" data-story="${k}" aria-pressed="${k === story}">${STORIES[k]}</button>`).join("");
  $("#storyChips").addEventListener("click", e => { const b = e.target.closest("[data-story]"); if (!b) return; story = b.dataset.story; $$("#storyChips button").forEach(x => x.setAttribute("aria-pressed", String(x === b))); summary(); RH.sfx("tap"); });
  $("#genderChips").addEventListener("click", e => { const b = e.target.closest("[data-g]"); if (!b) return; gender = b.dataset.g; $$("#genderChips button").forEach(x => x.setAttribute("aria-pressed", String(x === b))); RH.sfx("tap"); });
  function summary() { $("#formSummary").innerHTML = RH.t("summary", { story: STORIES[story], plan: RH.t("plans")[plan] }); }
  function renderPlan() { $$(".tier").forEach(el => el.classList.toggle("selected", el.dataset.tier === plan)); summary(); }
  $$("[data-pick]").forEach(b => b.addEventListener("click", () => {
    plan = b.dataset.pick; renderPlan(); RH.sfx("ok");
    $("#dossier").scrollIntoView({ behavior: RH.reduced ? "auto" : "smooth" });
    setTimeout(() => $("#f-name").focus({ preventScroll: true }), 600);
  }));
  renderPlan();

  // Sanitise free text: strip markup-ish and bidi/control characters, collapse whitespace, cap length
  const clean = (s, n = 32) => String(s || "").replace(/[<>{}\[\]\\`$]/g, "").replace(/[\u0000-\u001f\u007f‎‏‪-‮⁦-⁩]/g, "").replace(/\s+/g, " ").trim().slice(0, n);
  const HEB = "אבגדהוזחטיכלמנסעפצקרשת", LAT = "ABCDEFGHIJKLMNOPQRSTUVWXYZ", FIN = { "ך": "כ", "ם": "מ", "ן": "נ", "ף": "פ", "ץ": "צ" };
  const letters = s => {
    const heb = [...s].map(c => FIN[c] || c).filter(c => HEB.includes(c));
    const lat = [...s.toUpperCase()].filter(c => LAT.includes(c));
    return heb.length >= lat.length ? { A: HEB, L: heb, rtl: true } : { A: LAT, L: lat, rtl: false };
  };
  const mod = (n, m) => ((n % m) + m) % m;

  let pvShift = 0, pv = null;
  $("#dossierForm").addEventListener("submit", e => {
    e.preventDefault();
    const f = e.target, req = ["name", "you", "street", "gift"], missing = [];
    req.forEach(n => { const el = f.elements[n]; const bad = !clean(el.value); el.classList.toggle("err", bad); el.setAttribute("aria-invalid", String(bad)); if (bad) missing.push(el); });
    if (missing.length) { $("#formError").textContent = RH.t("fErr"); missing[0].focus(); RH.sfx("bad"); return; }
    const street = clean(f.elements.street.value), L = letters(street);
    if (L.L.length < 2) { $("#formError").textContent = RH.t("fErrStreet"); f.elements.street.classList.add("err"); f.elements.street.focus(); RH.sfx("bad"); return; }
    $("#formError").textContent = "";
    pv = { name: clean(f.elements.name.value, 24), you: clean(f.elements.you.value, 24), nick: clean(f.elements.nick.value, 24), street, L, g: gender };
    renderPreview();
    const p = $("#preview"); p.classList.remove("show"); void p.offsetWidth; p.classList.add("show");
    $("#approved").classList.remove("show"); $("#approveBtn").disabled = false;
    RH.sfx("pop");
    p.scrollIntoView({ behavior: RH.reduced ? "auto" : "smooth", block: "start" });
    p.focus({ preventScroll: true });
  });
  $$("#dossierForm .input").forEach(el => el.addEventListener("input", () => { el.classList.remove("err"); el.removeAttribute("aria-invalid"); }));

  function renderPreview() {
    const P = { name: esc(pv.name), you: esc(pv.you), nick: esc(pv.nick), g: pv.g };
    $("#pvFor").textContent = RH.t("pvFor", { name: pv.name });
    $("#pvMsgs").innerHTML = RH.t("pv").map((fn, i) => `<div class="row v ${i === 0 ? "first" : ""}" style="animation-delay:${i * 120}ms"><div class="bub"><p>${fn(P)}</p></div></div>`).join("") +
      `<div class="row v" style="animation-delay:${6 * 120}ms"><div class="bub has-lp" style="width:90%"><span class="lp" style="cursor:default"><span class="lp-meta"><small>rabbithole.example</small><b>${HE ? "משימה 1 · הגלגל" : "Mission 1 · The Wheel"}</b><span>${HE ? (pv.g === "m" ? "הודעה שרק אתה יכול לקרוא." : "הודעה שרק את יכולה לקרוא.") : "A message only you can read."}</span></span></span></div></div>`;
    pvShift = 0; paintCipher();
  }
  const SHIFT = 3;
  function paintCipher() {
    const { A, L, rtl } = pv.L, n = A.length;
    const enc = L.map(c => A[mod(A.indexOf(c) + SHIFT, n)]);
    const dec = enc.map(c => A[mod(A.indexOf(c) - pvShift, n)]);
    $("#pvCipher").className = "tiles" + (rtl ? " rtl" : "");
    $("#pvCipher").innerHTML = enc.map(c => `<span>${c}</span>`).join("");
    const hit = mod(pvShift, n) === SHIFT;
    $("#pvDecoded").className = "tiles dec" + (rtl ? " rtl" : "") + (hit ? " hit" : "");
    $("#pvDecoded").innerHTML = dec.map(c => `<span>${c}</span>`).join("");
    $("#pvShift").textContent = mod(pvShift, n);
    if (hit) RH.sfx("ok");
  }
  $("#pvMinus").addEventListener("click", () => { pvShift--; RH.sfx("tick"); paintCipher(); });
  $("#pvPlus").addEventListener("click", () => { pvShift++; RH.sfx("tick"); paintCipher(); });
  $("#editBtn").addEventListener("click", () => { $("#dossier").scrollIntoView({ behavior: RH.reduced ? "auto" : "smooth" }); setTimeout(() => $("#f-name").focus({ preventScroll: true }), 500); });
  $("#approveBtn").addEventListener("click", () => {
    const c = "RH-" + String(1000 + Math.floor(Math.random() * 9000));
    $("#apTitle").textContent = RH.t("apTitle", { c });
    $("#apText").textContent = RH.t("apText", { name: pv.name });
    const a = $("#approved"); a.classList.add("show"); RH.slam($(".stamp", a));
    $("#approveBtn").disabled = true;
    RH.sfx("win"); RH.confetti({ n: 90, y: .6 });
    a.focus({ preventScroll: true });
    a.scrollIntoView({ behavior: RH.reduced ? "auto" : "smooth", block: "nearest" });
  });

  /* ---------- FAQ accordions ---------- */
  $("#faqList").innerHTML = RH.t("faq").map(([q, a], i) => `<details id="faq-${i}"><summary>${q}</summary><div class="a">${a}</div></details>`).join("");
})();
