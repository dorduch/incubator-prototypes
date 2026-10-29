/* Playable chat preview. Messages are stored as i18n keys (not text), so the whole
   conversation re-renders in either language. State + mission progress live in localStorage. */
(() => {
  "use strict";
  const { $, $$, esc } = RH;
  const HE = RH.he;

  RH.i18n({
    en: {
      online: "online", typing: "typing…", rec: "recording audio…", sendingPhoto: "sending a photo…",
      skip: "Skip ⏭", skipAria: "Skip ahead: show all of Vesper's messages now", ffhint: "tap to fast-forward", typingAria: "Vesper is typing",
      logAria: "Conversation with Vesper", qrAria: "Quick replies", msgPh: "Message", msgAria: "Message Vesper", sendAria: "Send",
      "sys.fiction": "Vesper is a fictional game character. Demo conversation.",
      "sys.next": "⏩ Demo: skipping to the next morning",
      "sys.skip46": "⏩ Demo: Days 4–6 are locked in this preview. Jumping to the birthday.",
      "day.1": "Day 1 · Monday", "day.2": "Day 2 · Tuesday", "day.3": "Day 3 · Wednesday", "day.7": "Day 7 · Your birthday 🎂",
      "teaser.4": "Day 4 · The Double Agent", "teaser.5": "Day 5 · Burn Notice", "teaser.6": "Day 6 · The Safehouse", teaserSub: "Locked · in the full game",
      i1: "Noa.", i2: "Don't panic. And please don't block this number, I've had a long week.",
      i3: "I'm Vesper. Someone who knows you annoyingly well hired me for your 30th. 🎂",
      voice1: "This message will not self-destruct. I just like saying that. Seven days, Noa. Starting now.",
      i4: "Full disclosure, because I play fair: it was <b>Maya</b>. 💛 Reply STOP anytime and I'll disappear.",
      i5: "Seven days. One mission each morning. Ready?",
      "qr.intro.in": "Ok… I'm in 🕵️", "qr.intro.in.say": ["Good. I knew we'd get along."],
      "qr.intro.maya": "MAYA?! 😂", "qr.intro.maya.say": ["She's very proud of herself. Don't tell her I said so."],
      "qr.intro.who": "Wait, how does this work?", "qr.intro.who.say": ["Every morning I send a mission. You solve it, I get the stamp. Stuck? Ask me for a hint."],
      c1: "Mission 1. This came in this morning, encrypted. It's about you.", c2: "Turn the wheel until it talks. Bring me the last word.",
      "n.done": "Done ✅ Stamp: {code}", "n.opened": "I OPENED IT 😭😭😭",
      cd1: "HADEKEL. 📍", cd2: "The street with the squeaky gate and the lemon tree. You used to count the cracks on the way to school.",
      cd3: "Stamp <b>{code}</b> logged. That's Day 1. Sleep well, Agent.",
      "qr.afterCipher.how": "How do you know that?!", "qr.afterCipher.how.say": ["I know a lot of things. Most of them came from someone who loves you."],
      "qr.afterCipher.next": "Too easy. Next.", "qr.afterCipher.next.say": ["Confident. Let's fix that tomorrow."],
      m1: "Morning, Agent. Found this in an old shoebox. Look closely.", polaroid: "Exhibit B · one bench, one island, too many ducks",
      m2: "Mission 2. A city that doesn't exist, and one bench that's very much yours.", m3: "Three clues. You'll need all of them.",
      md1: "Linden Park. The bench facing the island. 🦆🦆🦆", md2: "Three ducks. You know which joke. I'm not putting it in writing.", md3: "Stamp <b>{code}</b> logged. Day 2, done.",
      "qr.afterMap.joke": "Tell me the ending 😂", "qr.afterMap.joke.say": ["Absolutely not. That joke is above my clearance."],
      "qr.afterMap.next": "What's next?", "qr.afterMap.next.say": ["Eager. Good. See you in the morning."],
      p1: "Day 3. Every agent needs an ID, and I need yours.", p2: "Three poses, three seconds each. The photos never leave your phone. I only get the stamp.",
      pd1: "Agent Noa. Cleared. 📸", pd2: "That eyebrow work is frankly professional.", pd3: "Stamp <b>{code}</b> logged. Three for three.",
      "qr.afterPhoto.why": "So… what's it all for?", "qr.afterPhoto.why.say": ["Patience was never your thing, was it?"],
      "qr.afterPhoto.over": "Wait, is it over?", "qr.afterPhoto.over.say": ["Not even close."],
      r1: "Happy birthday, Noa. 🎂", r2: "Someone left something in the vault for you. She's been planning this for weeks.", r3: "Open it somewhere you're allowed to scream a little.",
      rd1: "So. Now you know. 🎶", rd2: "Mission complete, Agent Noa. Happy birthday.", rd3: "Go say thank you to Maya. And save me a dance. — V.",
      "qr.end.ty": "Thank you Vesper 🥹", "qr.end.ty.say": ["It was an honour. This number will now self-destruct.", "(It won't. But it's dramatic.)"],
      "qr.end.again": "Can I play again?", "qr.end.again.say": ["Tap ↺ Reset demo and I'll pretend we've never met."],
      banter: ["Noted. The mission is still waiting, though. Tap the card above.", "I'd love to chat, but I'm on the clock. The link is right up there.", "Interesting. Filed. Now go solve it.", "You're stalling. I can tell. I can always tell."],
      acks: ["I'll take that as a yes.", "Noted. Moving on.", "Bold. I respect it."],
      after: ["Still here. Still fictional.", "Happy birthday, Noa. Go enjoy it.", "The file is closed, but I'm proud of you."],
      patience: "Patience. I'll message you first.", rightWord: "Ha. Right word. But do it on the wheel, I want the stamp.",
      mayaQ: "No comment. Professional discretion.", hello: "Hello, Noa. The mission is still waiting.",
      stop: "Understood. In the real game I'd go quiet now, and Maya would get a gentle heads-up. (This is a demo, so I'll stay.)",
      hints: { cipher: ["Every message I send starts with your name. Start there.", "Line the first word up with N-O-A, then read the rest."], map: ["Clue 1: same side of the river as Hadekel St.", "Use the magnifier. Count ducks."], photo: ["No camera? Use the stand-in. I won't tell.", "Anything yellow works. Bananas count."], reveal: ["It's open. Go. I'll wait here."] },
      voiceAria: "Play voice note from Vesper", voiceStop: "Voice note playing", transcript: "Transcript", voiceMuted: "Sound is off. Unmute (top right) to hear it.",
      "g.cipher.t": "Mission 1 · The Wheel", "g.cipher.d": "A message only you can read. Turn the wheel until it talks.",
      "g.map.t": "Mission 2 · Find the Place", "g.map.d": "Port Velour, 1:5000. Three clues, one bench.",
      "g.photo.t": "Mission 3 · Agent ID", "g.photo.d": "Spy kit photo booth. Three poses, three seconds.",
      "g.reveal.t": "Day 7 · The Vault", "g.reveal.d": "Clearance granted. Someone left something for you.",
      solved: "SOLVED", opened: "OPENED", live: "IN PROGRESS", open: "OPEN", locked: "LOCKED", full: "FULL GAME", stampLbl: "Stamp {code}", assistedLbl: " · with hints",
      tl: { 1: ["🔐", "Day 1 · The Wheel"], 2: ["🗺️", "Day 2 · Find the Place"], 3: ["📸", "Day 3 · Agent ID"], 4: ["🕶️", "Day 4 · The Double Agent"], 5: ["🔥", "Day 5 · Burn Notice"], 6: ["🏚️", "Day 6 · The Safehouse"], 7: ["🎁", "Day 7 · The Vault"] },
      tlSub: { 4: "A message that isn't from Vesper…", 5: "Someone is sabotaging the mission.", 6: "The last clue before the birthday." },
    },
    he: {
      online: "מחוברת", typing: "מקלידה…", rec: "מקליטה הודעה קולית…", sendingPhoto: "שולחת תמונה…",
      skip: "דילוג ⏭", skipAria: "דילוג: להציג עכשיו את כל ההודעות של וספר", ffhint: "הקישי כדי להריץ קדימה", typingAria: "וספר מקלידה",
      logAria: "השיחה עם וספר", qrAria: "תשובות מהירות", msgPh: "הודעה", msgAria: "הודעה לוספר", sendAria: "שליחה",
      "sys.fiction": "וספר היא דמות בדיונית במשחק. שיחת דמו.",
      "sys.next": "⏩ דמו: מדלגים לבוקר שאחרי",
      "sys.skip46": "⏩ דמו: ימים 4–6 נעולים בתצוגה הזאת. קופצים ישר ליום ההולדת.",
      "day.1": "יום 1 · יום שני", "day.2": "יום 2 · יום שלישי", "day.3": "יום 3 · יום רביעי", "day.7": "יום 7 · יום ההולדת שלך 🎂",
      "teaser.4": "יום 4 · הסוכן הכפול", "teaser.5": "יום 5 · הכיסוי נחשף", "teaser.6": "יום 6 · דירת המסתור", teaserSub: "נעול · במשחק המלא",
      i1: "נועה.", i2: "אל תיבהלי. ובבקשה אל תחסמי את המספר, היה לי שבוע ארוך.",
      i3: "אני וספר. מישהי שמכירה אותך טוב באופן מעצבן שכרה אותי לכבוד יום ההולדת ה־30 שלך. 🎂",
      voice1: "ההודעה הזאת לא תשמיד את עצמה. אני פשוט אוהבת להגיד את זה. שבעה ימים, נועה. מתחילים עכשיו.",
      i4: "גילוי נאות, כי אני משחקת הוגן: זאת <b>מאיה</b>. 💛 אפשר לכתוב STOP בכל רגע, ואני נעלמת.",
      i5: "שבעה ימים. משימה אחת כל בוקר. מוכנה?",
      "qr.intro.in": "אוקיי… אני בפנים 🕵️", "qr.intro.in.say": ["יופי. ידעתי שנסתדר."],
      "qr.intro.maya": "מאיה?! 😂", "qr.intro.maya.say": ["היא מאוד גאה בעצמה. אל תגלי לה שאמרתי."],
      "qr.intro.who": "רגע, איך זה עובד?", "qr.intro.who.say": ["כל בוקר אני שולחת משימה. את פותרת, ואני מקבלת חותמת. נתקעת? תבקשי ממני רמז."],
      c1: "משימה 1. זה הגיע הבוקר, מוצפן. וזה עלייך.", c2: "סובבי את הגלגל עד שהוא מדבר. תביאי לי את המילה האחרונה.",
      "n.done": "סיימתי ✅ חותמת: {code}", "n.opened": "פתחתי 😭😭😭",
      cd1: "הדקל. 📍", cd2: "הרחוב עם השער שחורק ועץ הלימון. היית סופרת את הסדקים במדרכה בדרך לבית הספר.",
      cd3: "החותמת <b>{code}</b> נרשמה. זהו, יום 1 מאחורינו. לילה טוב, סוכנת.",
      "qr.afterCipher.how": "איך את יודעת את זה?!", "qr.afterCipher.how.say": ["אני יודעת הרבה דברים. רובם הגיעו ממישהי שאוהבת אותך."],
      "qr.afterCipher.next": "קל מדי. הבא.", "qr.afterCipher.next.say": ["בטוחה בעצמך. נטפל בזה מחר."],
      m1: "בוקר טוב, סוכנת. מצאתי את זה בקופסת נעליים ישנה. תסתכלי טוב.", polaroid: "מוצג ב׳ · ספסל אחד, אי אחד, יותר מדי ברווזים",
      m2: "משימה 2. עיר שלא קיימת, וספסל אחד שהוא לגמרי שלך.", m3: "שלושה רמזים. תצטרכי את כולם.",
      md1: "גן הטיליה. הספסל מול האי. 🦆🦆🦆", md2: "שלושה ברווזים. את יודעת איזו בדיחה. אני לא מעלה את זה על הכתב.", md3: "החותמת <b>{code}</b> נרשמה. יום 2, סגור.",
      "qr.afterMap.joke": "נו, תגידי כבר את הסוף 😂", "qr.afterMap.joke.say": ["בשום פנים. הבדיחה הזאת מעל הסיווג שלי."],
      "qr.afterMap.next": "מה הלאה?", "qr.afterMap.next.say": ["יש התלהבות. יופי. נתראה בבוקר."],
      p1: "יום 3. לכל סוכנת יש תעודה, ואני צריכה את שלך.", p2: "שלוש פוזות, שלוש שניות לכל אחת. התמונות לא יוצאות מהטלפון. אני מקבלת רק את החותמת.",
      pd1: "הסוכנת נועה. מאושרת. 📸", pd2: "העבודה על הגבה, בכנות, ברמה מקצועית.", pd3: "החותמת <b>{code}</b> נרשמה. שלוש משלוש.",
      "qr.afterPhoto.why": "אז… בשביל מה כל זה?", "qr.afterPhoto.why.say": ["סבלנות אף פעם לא הייתה הצד החזק שלך, נכון?"],
      "qr.afterPhoto.over": "רגע, זה נגמר?", "qr.afterPhoto.over.say": ["אפילו לא קרוב."],
      r1: "יום הולדת שמח, נועה. 🎂", r2: "מישהי השאירה לך משהו בכספת. היא מתכננת את זה כבר שבועות.", r3: "תפתחי את זה במקום שמותר בו לצרוח קצת.",
      rd1: "אז עכשיו את יודעת. 🎶", rd2: "המשימה הושלמה, הסוכנת נועה. מזל טוב.", rd3: "לכי להגיד תודה למאיה. ותשמרי לי ריקוד. — V.",
      "qr.end.ty": "תודה וספר 🥹", "qr.end.ty.say": ["היה לי לכבוד. המספר הזה יושמד עכשיו.", "(לא באמת. אבל זה דרמטי.)"],
      "qr.end.again": "אפשר לשחק שוב?", "qr.end.again.say": ["הקישי על ↺ איפוס הדמו, ואני אעשה כאילו מעולם לא נפגשנו."],
      banter: ["רשמתי. אבל המשימה עדיין מחכה. הקישי על הכרטיס למעלה.", "הייתי שמחה לפטפט, אבל אני במשמרת. הקישור ממש שם למעלה.", "מעניין. תויק. עכשיו לכי לפתור.", "את מורחת זמן. אני רואה. אני תמיד רואה."],
      acks: ["אני אקח את זה כ״כן״.", "רשמתי. ממשיכות.", "נועז. אני מכבדת."],
      after: ["עדיין פה. עדיין בדיונית.", "מזל טוב, נועה. לכי תיהני.", "התיק סגור, אבל אני גאה בך."],
      patience: "סבלנות. אני אכתוב לך ראשונה.", rightWord: "חה. המילה הנכונה. אבל תעשי את זה בגלגל, אני רוצה את החותמת.",
      mayaQ: "אין תגובה. דיסקרטיות מקצועית.", hello: "היי נועה. המשימה עדיין מחכה.",
      stop: "הבנתי. במשחק האמיתי הייתי משתתקת עכשיו, ומאיה הייתה מקבלת עדכון עדין. (זה דמו, אז אני נשארת.)",
      hints: { cipher: ["כל הודעה שלי נפתחת בשם שלך. תתחילי משם.", "תיישרי את המילה הראשונה ל־נ־ו־ע־ה, ואז תקראי את השאר."], map: ["רמז 1: באותו צד של הנהר כמו רחוב הדקל.", "תשתמשי בזכוכית המגדלת. תספרי ברווזים."], photo: ["אין מצלמה? יש כפילה. אני לא אספר.", "כל דבר צהוב עובד. גם בננה."], reveal: ["זה פתוח. לכי. אני מחכה פה."] },
      voiceAria: "ניגון הודעה קולית מוספר", voiceStop: "ההודעה הקולית מתנגנת", transcript: "תמלול", voiceMuted: "הצליל כבוי. הפעילי אותו (למעלה) כדי לשמוע.",
      "g.cipher.t": "משימה 1 · הגלגל", "g.cipher.d": "הודעה שרק את יכולה לקרוא. סובבי את הגלגל עד שהוא מדבר.",
      "g.map.t": "משימה 2 · מצאי את המקום", "g.map.d": "פורט ולור, 1:5000. שלושה רמזים, ספסל אחד.",
      "g.photo.t": "משימה 3 · תעודת סוכנת", "g.photo.d": "תא צילום של ערכת ריגול. שלוש פוזות, שלוש שניות.",
      "g.reveal.t": "יום 7 · הכספת", "g.reveal.d": "הסיווג אושר. מישהי השאירה לך משהו.",
      solved: "נפתר", opened: "נפתח", live: "בתהליך", open: "פתוח", locked: "נעול", full: "במשחק המלא", stampLbl: "חותמת {code}", assistedLbl: " · עם רמזים",
      tl: { 1: ["🔐", "יום 1 · הגלגל"], 2: ["🗺️", "יום 2 · מצאי את המקום"], 3: ["📸", "יום 3 · תעודת סוכנת"], 4: ["🕶️", "יום 4 · הסוכן הכפול"], 5: ["🔥", "יום 5 · הכיסוי נחשף"], 6: ["🏚️", "יום 6 · דירת המסתור"], 7: ["🎁", "יום 7 · הכספת"] },
      tlSub: { 4: "הודעה שלא הגיעה מוספר…", 5: "מישהו מחבל במשימה.", 6: "הרמז האחרון לפני יום ההולדת." },
    },
  });
  RH.i18n();

  const STORE = "rh-chat-v3", DOMAIN = "rabbithole.example";
  const cipherTxt = HE ? ["צירט", "דלפ"] : ["STF", "DTZ"];
  const ART = {
    cipher: `<svg viewBox="0 0 300 112" preserveAspectRatio="xMidYMid slice"><rect width="300" height="112" fill="#16121c"/><g transform="translate(150 56)" fill="none"><circle r="46" stroke="#ff3b4e" stroke-width="2"/><circle r="32" stroke="#ffb547" stroke-width="1.5" stroke-dasharray="4 5"/><circle r="6" fill="#ff3b4e"/></g><text x="24" y="64" fill="#ffb547" font-family="monospace" font-size="20" font-weight="700" letter-spacing="3">${cipherTxt[0]}</text><text x="214" y="64" fill="#75738a" font-family="monospace" font-size="20" font-weight="700" letter-spacing="3">${cipherTxt[1]}</text></svg>`,
    map: `<svg viewBox="0 0 300 112" preserveAspectRatio="xMidYMid slice"><rect width="300" height="112" fill="#efe6d2"/><path d="M190 0 C170 40 210 70 180 112" stroke="#9cc9d9" stroke-width="18" fill="none"/><g stroke="#fff" stroke-width="6"><path d="M0 30H300M0 80H300M70 0V112M250 0V112"/></g><rect x="20" y="44" width="110" height="56" rx="10" fill="#b9d8a6"/><ellipse cx="76" cy="72" rx="30" ry="16" fill="#9cc9d9"/><ellipse cx="80" cy="70" rx="8" ry="5" fill="#b9d8a6"/><circle cx="58" cy="70" r="2.4" fill="#fff6c9"/><circle cx="60" cy="76" r="2.4" fill="#fff6c9"/><circle cx="55" cy="74" r="2.4" fill="#fff6c9"/><circle cx="236" cy="56" r="26" fill="none" stroke="#2a2318" stroke-width="4"/><path d="M254 74l18 18" stroke="#2a2318" stroke-width="6" stroke-linecap="round"/></svg>`,
    photo: `<svg viewBox="0 0 300 112" preserveAspectRatio="xMidYMid slice"><rect width="300" height="112" fill="#1a1622"/><g transform="rotate(-4 150 56)"><rect x="70" y="14" width="160" height="84" rx="4" fill="#f1e8d5"/><g fill="#0c2a2a"><rect x="78" y="22" width="44" height="58"/><rect x="128" y="22" width="44" height="58"/><rect x="178" y="22" width="44" height="58"/></g><g fill="#7fe0d0"><circle cx="100" cy="46" r="10"/><circle cx="150" cy="46" r="10"/><circle cx="200" cy="46" r="10"/></g><rect x="88" y="42" width="24" height="6" fill="#111"/><circle cx="210" cy="70" r="6" fill="#ffd23f"/><text x="150" y="92" text-anchor="middle" fill="#a8132a" font-family="monospace" font-size="8" font-weight="700" letter-spacing="2">FIELD DOSSIER</text></g></svg>`,
    reveal: `<svg viewBox="0 0 300 112" preserveAspectRatio="xMidYMid slice"><defs><radialGradient id="rg" cx=".5" cy=".5" r=".6"><stop offset="0" stop-color="#5a1d2a"/><stop offset="1" stop-color="#0b0b10"/></radialGradient></defs><rect width="300" height="112" fill="url(#rg)"/><circle cx="150" cy="56" r="42" fill="#2a2d3c" stroke="#8f93a8" stroke-width="3"/><circle cx="150" cy="56" r="14" fill="none" stroke="#ffb547" stroke-width="3"/><path d="M150 24v18M150 70v18M118 56h18M164 56h18" stroke="#ffb547" stroke-width="3"/><text x="150" y="108" text-anchor="middle" fill="#ffb547" font-family="monospace" font-size="9" font-weight="700" letter-spacing="3">EYES ONLY</text></svg>`,
  };
  const POLAROID = `<svg viewBox="0 0 220 170" aria-hidden="true"><defs><linearGradient id="pk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f7d9a8"/><stop offset=".45" stop-color="#e9c38e"/><stop offset=".46" stop-color="#8fb59a"/><stop offset="1" stop-color="#6f9a7d"/></linearGradient><radialGradient id="sun" cx=".82" cy=".12" r=".5"><stop offset="0" stop-color="#fff6d8" stop-opacity=".9"/><stop offset="1" stop-color="#fff6d8" stop-opacity="0"/></radialGradient></defs><rect width="220" height="170" fill="url(#pk)"/><ellipse cx="128" cy="112" rx="96" ry="34" fill="#86b4c4"/><ellipse cx="140" cy="104" rx="30" ry="12" fill="#7fa76f"/><path d="M128 104c4-24 8-30 12-34 4 4 8 12 10 34z" fill="#4f7a46"/><g fill="#fff6c9" stroke="#6b5a2e" stroke-width=".8"><ellipse cx="72" cy="120" rx="7" ry="4"/><ellipse cx="88" cy="128" rx="7" ry="4"/><ellipse cx="64" cy="132" rx="7" ry="4"/></g><g fill="#fff6c9" stroke="#6b5a2e" stroke-width=".8"><circle cx="77" cy="116" r="3"/><circle cx="93" cy="124" r="3"/><circle cx="69" cy="128" r="3"/></g><g fill="#7a5532"><rect x="8" y="118" width="42" height="6" rx="2"/><rect x="8" y="106" width="42" height="5" rx="2"/><rect x="12" y="124" width="4" height="16"/><rect x="42" y="124" width="4" height="16"/></g><rect width="220" height="170" fill="url(#sun)"/><rect width="220" height="170" fill="#c98a4b" opacity=".12"/></svg>`;

  const GAMES = {
    cipher: { href: "games/cipher.html", slug: "m/the-wheel", stage: 1, day: 1, code: "RH-1-WHEEL" },
    map: { href: "games/map.html", slug: "m/find-the-place", stage: 3, day: 2, code: "RH-2-DUCKS" },
    photo: { href: "games/photo.html", slug: "m/agent-id", stage: 5, day: 3, code: "RH-3-AGENT" },
    reveal: { href: "games/reveal.html", slug: "vault", stage: 7, day: 7, code: "RH-GIFT-30" },
  };
  const ORDER = RH.ORDER;
  const BEATS = {
    intro: { stage: 0, await: "intro", items: [{ type: "sys", k: "sys.fiction" }, { type: "day", day: 1 }, { k: "i1" }, { k: "i2" }, { k: "i3" }, { type: "voice", k: "voice1" }, { k: "i4" }, { k: "i5" }] },
    sendCipher: { stage: 1, await: "wait", items: [{ k: "c1" }, { type: "link", link: "cipher" }, { k: "c2" }] },
    cipherDone: { stage: 2, await: "afterCipher", items: [{ k: "cd1" }, { k: "cd2" }, { k: "cd3", p: { code: GAMES.cipher.code } }] },
    sendMap: { stage: 3, await: "wait", items: [{ type: "sys", k: "sys.next" }, { type: "day", day: 2 }, { k: "m1" }, { type: "image", k: "polaroid" }, { k: "m2" }, { type: "link", link: "map" }, { k: "m3" }] },
    mapDone: { stage: 4, await: "afterMap", items: [{ k: "md1" }, { k: "md2" }, { k: "md3", p: { code: GAMES.map.code } }] },
    sendPhoto: { stage: 5, await: "wait", items: [{ type: "sys", k: "sys.next" }, { type: "day", day: 3 }, { k: "p1" }, { type: "link", link: "photo" }, { k: "p2" }] },
    photoDone: { stage: 6, await: "afterPhoto", items: [{ k: "pd1" }, { k: "pd2" }, { k: "pd3", p: { code: GAMES.photo.code } }] },
    sendReveal: { stage: 7, await: "wait", items: [{ type: "teaser", day: 4 }, { type: "teaser", day: 5 }, { type: "teaser", day: 6 }, { type: "sys", k: "sys.skip46" }, { type: "day", day: 7 }, { k: "r1" }, { k: "r2" }, { type: "link", link: "reveal" }, { k: "r3" }] },
    revealDone: { stage: 8, await: "end", items: [{ k: "rd1" }, { k: "rd2" }, { k: "rd3" }] },
  };
  // Quick replies. kw maps free text (EN or HE) onto an option.
  const CHOICES = {
    intro: { next: "sendCipher", opts: [
      { id: "in", kw: /\b(ok|okay|yes|yep|sure|in|ready|go|fine|let'?s)\b|כן|יאללה|יאלה|בטח|מוכנה|אוקיי|סבבה|בפנים/ },
      { id: "maya", kw: /maya|מאיה/ },
      { id: "who", kw: /\b(who|what|how|why)\b|מי |איך|למה|מה / }] },
    afterCipher: { next: "sendMap", opts: [{ id: "how", kw: /\b(how|who|creepy|what)\b|איך|מי |מה / }, { id: "next", kw: /\b(easy|next|more|go|ok|okay)\b|קל|הבא|עוד|יאללה/ }] },
    afterMap: { next: "sendPhoto", opts: [{ id: "joke", kw: /\b(joke|ending|duck|ducks|tell)\b|בדיחה|סוף|ברווז/ }, { id: "next", kw: /\b(next|more|go|ok|okay|what)\b|הלאה|הבא|עוד|מה / }] },
    afterPhoto: { next: "sendReveal", opts: [{ id: "why", kw: /\b(why|what|for|gift|present)\b|למה|בשביל|מתנה/ }, { id: "over", kw: /\b(over|done|end|finished)\b|נגמר|סוף|זהו/ }] },
    end: { next: null, opts: [{ id: "ty", kw: /\b(thank|thanks|ty|love|amazing|wow)\b|תודה|אוהבת|מדהים|וואו/ }, { id: "again", kw: /\b(again|replay|restart|reset|more)\b|שוב|מחדש|עוד פעם/ }] },
  };
  const DAY_START = { 1: 9 * 60 + 41, 2: 8 * 60 + 12, 3: 8 * 60 + 30, 7: 7 * 60 + 45 };

  const fresh = () => ({ v: 3, msgs: [], queue: [], stage: -1, awaiting: null, hint: 0, banter: 0, seen: {}, clock: DAY_START[1] });
  let state = Object.assign(fresh(), RH.ls.json(STORE, {}));
  if (state.v !== 3) state = fresh();
  let idSeq = state.msgs.reduce((a, m) => Math.max(a, m.id), 0);
  let timers = [], pumpT = 0, pumping = false;
  const later = (fn, ms) => { const t = setTimeout(fn, ms); timers.push(t); return t; };
  const save = () => RH.ls.set(STORE, JSON.stringify(state));
  const pick = (key, ctr) => { const arr = RH.t(key); const i = state[ctr] % arr.length; state[ctr]++; return arr[i]; };
  // Array-valued keys (banter, hints, multi-line replies) resolve to one entry via idx/sub
  const pickText = m => { if (m.idx == null) return RH.t(m.k, m.p); let v = RH.t(m.k); if (m.sub) v = v[m.sub]; return Array.isArray(v) ? v[m.idx % v.length] : v; };
  const clock = m => { const h = Math.floor(m / 60) % 24, mm = String(m % 60).padStart(2, "0"); return HE ? `${String(h).padStart(2, "0")}:${mm}` : `${(h % 12) || 12}:${mm} ${h < 12 ? "AM" : "PM"}`; };

  const body = $("#chatBody"), list = $("#msgs"), typingRow = $("#typing"), statusEl = $("#status");
  const choicesEl = $("#choices"), input = $("#chatInput"), sendBtn = $("#sendBtn"), skipBtn = $("#skipBtn");

  /* ---------- rendering ---------- */
  const TICK1 = '<svg viewBox="0 0 17 11" aria-hidden="true"><path d="M2 6l3 3 6.5-7" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const TICK2 = '<svg viewBox="0 0 17 11" aria-hidden="true"><path d="M1 6l3 3 6.5-7M7 8.4l.6.6L14 2" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const STATUS_LBL = { sent: HE ? "נשלחה" : "Sent", delivered: HE ? "נמסרה" : "Delivered", read: HE ? "נקראה" : "Read" };
  const ticks = s => `<span class="ticks ${s === "read" ? "read" : ""}" role="img" aria-label="${STATUS_LBL[s]}">${s === "sent" ? TICK1 : TICK2}</span>`;
  const WAVE = [6, 10, 16, 22, 14, 9, 18, 26, 20, 12, 8, 15, 24, 28, 18, 10, 7, 13, 21, 25, 16, 9, 12, 19, 14, 8, 6, 11, 17, 9];

  function html(m, prev, isNew) {
    const nw = isNew ? " new" : "";
    if (m.type === "day") return `<div class="day-stick" data-mid="${m.id}"><span class="chip-day${nw}">${RH.t("day." + m.day)}</span></div>`;
    if (m.type === "sys") return `<div class="chip-sys${nw}" data-mid="${m.id}">${RH.t(m.k)}</div>`;
    if (m.type === "teaser") return `<div class="teaser row${nw}" data-mid="${m.id}"><span class="lk" aria-hidden="true">🔒</span><span><b>${RH.t("teaser." + m.day)}</b>${RH.t("teaserSub")}</span></div>`;
    const first = !prev || prev.from !== m.from || ["day", "sys", "teaser"].includes(prev.type);
    const cls = `row ${m.from}${first ? " first" : ""}${nw}`;
    const meta = `<span class="meta">${clock(m.tm)}${m.from === "n" ? " " + ticks(m.status) : ""}</span>`;
    if (m.type === "link") {
      const g = GAMES[m.link], done = RH.prog()[m.link];
      return `<div class="${cls}" data-mid="${m.id}"><div class="bub has-lp">
        <a class="lp" href="${g.href}">
          <div class="lp-art">${ART[m.link]}${done ? `<span class="done">✓ ${RH.t(m.link === "reveal" ? "opened" : "solved")}</span>` : ""}</div>
          <div class="lp-meta"><small>${DOMAIN}</small><b>${RH.t(`g.${m.link}.t`)}</b><span>${RH.t(`g.${m.link}.d`)}</span></div>
        </a>
        <a class="lp-url" href="${g.href}" tabindex="-1">https://${DOMAIN}/${g.slug}</a>${meta}</div></div>`;
    }
    if (m.type === "voice") {
      return `<div class="${cls}" data-mid="${m.id}"><div class="bub" style="width:84%"><div class="voice">
        <button type="button" class="vplay" data-voice="${m.id}" aria-label="${RH.t("voiceAria")}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4v16l13-8z" fill="currentColor"/></svg></button>
        <div class="wave" aria-hidden="true">${WAVE.map(h => `<i style="height:${h}px"></i>`).join("")}</div><span class="vdur">0:05</span></div>
        <div class="transcript"><b>${RH.t("transcript")}</b>${RH.t(m.k)}</div>${meta}</div></div>`;
    }
    if (m.type === "image") {
      return `<div class="${cls}" data-mid="${m.id}"><div class="bub has-img"><figure class="polaroid" style="margin:4px 4px 2px">${POLAROID}<figcaption>${RH.t(m.k)}</figcaption></figure>${meta}</div></div>`;
    }
    const text = m.text != null ? esc(m.text) : pickText(m);   // typed text is escaped; authored lines are trusted HTML
    return `<div class="${cls}" data-mid="${m.id}"><div class="bub"><p>${text}${meta}</p></div></div>`;
  }
  function renderAll() {
    list.innerHTML = state.msgs.map((m, i) => html(m, state.msgs[i - 1], false)).join("");
    renderTimeline(); toBottom(); updateDayStick();
  }
  function append(m) {
    list.insertAdjacentHTML("beforeend", html(m, state.msgs[state.msgs.length - 2], true));
    toBottom(); updateDayStick();
  }
  // While a day label is pinned, give it a full-width tray so it doesn't sit on top of a bubble.
  function updateDayStick() {
    const edge = body.getBoundingClientRect().top + (parseFloat(getComputedStyle(body).paddingTop) || 0);
    for (const stick of $$(".day-stick", list)) {
      stick.classList.toggle("is-stuck", stick.getBoundingClientRect().top <= edge + 0.5);
    }
  }
  body.addEventListener("scroll", updateDayStick, { passive: true });
  function repaintTicks(m) {
    const t = list.querySelector(`[data-mid="${m.id}"] .ticks`);
    if (t) t.outerHTML = ticks(m.status);
  }
  // The newest message must never hide behind the quick replies: always pin to the bottom
  function toBottom() { requestAnimationFrame(() => { body.scrollTop = body.scrollHeight; }); }
  if ("ResizeObserver" in window) new ResizeObserver(toBottom).observe(body);
  choicesEl.addEventListener("transitionend", toBottom);

  function renderTimeline() {
    const p = RH.prog(), TL = RH.t("tl"), SUB = RH.t("tlSub");
    const live = ORDER.find(k => !p[k] && state.stage >= GAMES[k].stage);
    $("#timeline").innerHTML = [1, 2, 3, 4, 5, 6, 7].map(d => {
      const k = ORDER.find(x => GAMES[x].day === d);
      if (!k) return `<li class="teaser"><span class="ic" aria-hidden="true">${TL[d][0]}</span><span class="tx"><b>${TL[d][1]}</b><small>${SUB[d]}</small></span><span class="st">🔒 ${RH.t("full")}</span></li>`;
      const done = p[k];
      const st = done ? "✓ " + RH.t(k === "reveal" ? "opened" : "solved") : k === live ? RH.t("live") : state.stage >= GAMES[k].stage ? RH.t("open") : "🔒 " + RH.t("locked");
      const sub = done ? RH.t("stampLbl", { code: done.code }) + (done.assisted ? RH.t("assistedLbl") : "") : RH.t(`g.${k}.d`);
      return `<li class="${done ? "done" : k === live ? "live" : ""}"><span class="ic" aria-hidden="true">${TL[d][0]}</span><span class="tx"><b>${TL[d][1]}</b><small>${esc(sub)}</small></span><span class="st">${st}</span></li>`;
    }).join("");
  }
  function setTyping(mode) {
    typingRow.classList.toggle("show", !!mode);
    statusEl.textContent = RH.t(mode === "rec" ? "rec" : mode === "photo" ? "sendingPhoto" : mode ? "typing" : "online");
    statusEl.classList.toggle("typing", !!mode);
    if (mode) toBottom();
  }
  function ui() {
    const set = !state.queue.length && !pumping && CHOICES[state.awaiting];
    choicesEl.classList.toggle("show", !!set);
    choicesEl.innerHTML = set ? set.opts.map(o => `<button type="button" data-choice="${o.id}">${esc(RH.t(`qr.${state.awaiting}.${o.id}`))}</button>`).join("") : "";
    skipBtn.classList.toggle("show", pumping || state.queue.length > 0);
    skipBtn.tabIndex = skipBtn.classList.contains("show") ? 0 : -1;
    toBottom();
  }

  /* ---------- story engine ---------- */
  function add(m) {
    m.id = ++idSeq;
    if (m.type === "day") state.clock = DAY_START[m.day] || state.clock;
    m.tm = state.clock; if (m.type !== "day" && m.type !== "sys" && m.type !== "teaser") state.clock += (state.msgs.length % 2);
    state.msgs.push(m); save(); append(m);
    return m;
  }
  function play(beatKey, prefix = []) {
    const b = BEATS[beatKey];
    state.stage = b.stage; state.awaiting = b.await; state.hint = 0;
    state.queue.push(...prefix, ...b.items);
    save(); ui(); renderTimeline(); pump();
  }
  const say = keysOrTexts => { state.queue.push(...keysOrTexts); save(); pump(); };
  function markRead() {
    let changed = false;
    state.msgs.forEach(m => { if (m.from === "n" && m.status !== "read") { m.status = "read"; changed = true; repaintTicks(m); } });
    if (changed) save();
  }
  function pump() {
    if (pumping) return;
    if (!state.queue.length) { ui(); checkProgress(); return; }
    pumping = true; ui();
    const last = state.msgs[state.msgs.length - 1];
    const reading = last && last.from === "n" ? 550 : 0;           // Vesper "reads" before typing
    const item = state.queue[0];
    const instant = ["day", "sys", "teaser"].includes(item.type);
    const plain = item.k && !item.type ? String(pickText(item)).replace(/<[^>]+>/g, "") : "";
    let d = instant ? 420 : item.type === "link" ? 900 : item.type === "voice" ? 1500 : item.type === "image" ? 1200 : Math.max(520, Math.min(1500, 320 + plain.length * 13));
    if (RH.reduced) d = Math.min(d, 300);
    pumpT = setTimeout(() => {
      markRead();
      if (!instant) setTyping(item.type === "voice" ? "rec" : item.type === "image" ? "photo" : "typing");
      pumpT = setTimeout(() => {
        setTyping(false);
        state.queue.shift();
        add(Object.assign({ from: instant ? "sys" : "v" }, item));
        if (!instant && !document.hidden) RH.sfx("pop");
        pumping = false;
        pumpT = setTimeout(pump, 180);
      }, d);
    }, reading);
  }
  // Skip ⏭ / tap-to-fast-forward: flush everything Vesper has queued right now
  function fastForward() {
    if (!pumping && !state.queue.length) return;
    clearTimeout(pumpT); setTyping(false); markRead();
    while (state.queue.length) { const it = state.queue.shift(); add(Object.assign({ from: ["day", "sys", "teaser"].includes(it.type) ? "sys" : "v" }, it)); }
    pumping = false; save(); RH.sfx("pop"); ui(); renderTimeline(); checkProgress();
  }
  skipBtn.addEventListener("click", fastForward);
  body.addEventListener("click", e => { if (!e.target.closest("a,button,input")) fastForward(); });

  function sendNoa(m) {
    m = add(Object.assign({ from: "n", status: "sent" }, m));
    RH.sfx("send");
    later(() => { if (m.status === "sent") { m.status = "delivered"; save(); repaintTicks(m); } }, 400);
    later(() => { if (!pumping && !state.queue.length && m.status !== "read") { m.status = "read"; save(); repaintTicks(m); } }, 1800);
    return m;
  }
  function choose(setKey, opt) {
    const set = CHOICES[setKey], key = opt && `qr.${setKey}.${opt.id}.say`;
    const items = opt ? RH.dict.en[key].map((_, i) => ({ k: key, idx: i })) : [{ k: "acks", idx: state.banter++ }];
    state.awaiting = null;
    if (set.next) play(set.next, items);
    else { state.awaiting = "done"; say(items); }
  }
  function handleText(text) {
    const t = text.toLowerCase();
    if (state.stage >= 0 && /\bstop\b|עצור|תפסיקי|די כבר/.test(t)) return say([{ k: "stop" }]);
    const set = CHOICES[state.awaiting];
    if (set) return choose(state.awaiting, set.opts.find(o => o.kw.test(t)));
    const game = ORDER.find(k => GAMES[k].stage === state.stage);
    let item;
    if (state.stage < 0) item = { k: "patience" };
    else if (state.awaiting === "done") item = { k: "after", idx: state.banter++ };
    else if (/hadekel|הדקל/.test(t.replace(/\s/g, "")) && game === "cipher") item = { k: "rightWord" };
    else if (/\b(hint|help|stuck|clue|idea)\b|\?$|רמז|עזרה|תקועה|נתקעתי/.test(t) && game) item = { k: "hints", sub: game, idx: state.hint++ };
    else if (/maya|מאיה/.test(t)) item = { k: "mayaQ" };
    else if (/^(hi|hey|hello|yo|hiya)\b|^היי|^הי\b|^שלום|^מה קורה/.test(t)) item = { k: "hello" };
    else item = { k: "banter", idx: state.banter++ };
    say([item]);
  }
  /* ---------- progress from the mini-games ---------- */
  function checkProgress() {
    if (pumping || state.queue.length) return;
    const p = RH.prog();
    const game = ORDER.find(k => GAMES[k].stage === state.stage);
    if (!game || !p[game] || state.seen[game]) return;
    state.seen[game] = true;
    sendNoa(game === "reveal" ? { k: "n.opened" } : { k: "n.done", p: { code: p[game].code } });
    play(game + "Done");
  }

  /* ---------- voice note: animated waveform + synthesized morse ---------- */
  list.addEventListener("click", e => {
    const b = e.target.closest("[data-voice]"); if (!b) return;
    const bub = b.closest(".bub"); if (bub.classList.contains("playing")) return;
    if (RH.muted) RH.toast(RH.t("voiceMuted"));
    const a = RH.audio();
    let dur = 5;
    if (a) { RH.tone(180, 4.6, { type: "sine", vol: 0.04, attack: 0.3 }); dur = Math.max(3.2, RH.morse("V NOA", { unit: 0.085 }) + 0.4); }
    bub.classList.add("playing"); b.setAttribute("aria-label", RH.t("voiceStop"));
    const bars = $$(".wave i", bub), t0 = performance.now(), dEl = $(".vdur", bub);
    const step = () => {
      const f = Math.min(1, (performance.now() - t0) / (dur * 1000));
      bars.forEach((x, i) => x.classList.toggle("on", i / bars.length < f));
      dEl.textContent = `0:0${Math.min(5, Math.floor(f * dur))}`;
      if (f < 1) requestAnimationFrame(step);
      else { bub.classList.remove("playing"); bars.forEach(x => x.classList.remove("on")); dEl.textContent = "0:05"; b.setAttribute("aria-label", RH.t("voiceAria")); }
    };
    requestAnimationFrame(step);
  });

  /* ---------- inputs ---------- */
  choicesEl.addEventListener("click", e => {
    const b = e.target.closest("[data-choice]"); if (!b) return;
    const key = state.awaiting, opt = CHOICES[key] && CHOICES[key].opts.find(o => o.id === b.dataset.choice);
    if (!opt) return;
    sendNoa({ k: `qr.${key}.${opt.id}` });
    choose(key, opt);
  });
  input.addEventListener("input", () => { sendBtn.disabled = !input.value.trim(); });
  $("#composer").addEventListener("submit", e => {
    e.preventDefault();
    const text = input.value.trim().slice(0, 200); if (!text) return;
    input.value = ""; sendBtn.disabled = true;
    sendNoa({ text });
    handleText(text);
  });

  function start() { if (state.stage < 0 && !state.queue.length && !pumping) play("intro"); }
  function refresh() { renderAll(); ui(); checkProgress(); }
  addEventListener("storage", e => { if (e.key === RH.PROG) refresh(); });
  addEventListener("pageshow", e => { if (e.persisted) refresh(); });
  document.addEventListener("visibilitychange", () => { if (!document.hidden) { renderTimeline(); checkProgress(); } });

  $("#resetBtn").addEventListener("click", () => {
    timers.forEach(clearTimeout); timers = []; clearTimeout(pumpT); pumping = false;
    RH.ls.del(STORE); RH.ls.del(RH.PROG);
    state = fresh(); idSeq = 0;
    setTyping(false); renderAll(); ui();
    $("#chat").scrollIntoView({ behavior: RH.reduced ? "auto" : "smooth", block: "center" });
    later(start, 400);
  });

  // boot: resume any half-played beat, otherwise start when the chat scrolls into view
  renderAll();
  if (state.queue.length) pump(); else { ui(); checkProgress(); }
  if (state.stage < 0) {
    if (location.hash === "#demo" || !("IntersectionObserver" in window)) start();
    else {
      const io = new IntersectionObserver(es => { if (es.some(x => x.isIntersecting)) { io.disconnect(); start(); } }, { threshold: 0.35 });
      io.observe($("#chat"));
    }
  }
})();
