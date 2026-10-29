/* Rabbit Hole — shared runtime: i18n/RTL, sound + haptics, confetti, hints, mission gating, toasts.
   Every page sets <html lang dir> in a tiny inline head script before paint; this file reads it. */
(function () {
  "use strict";
  const RH = (window.RH = {});
  const LS = (RH.ls = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
    del(k) { try { localStorage.removeItem(k); } catch (e) {} },
    json(k, d) { try { return JSON.parse(localStorage.getItem(k) || "null") || d; } catch (e) { return d; } },
  });
  RH.$ = (s, el = document) => el.querySelector(s);
  RH.$$ = (s, el = document) => [...el.querySelectorAll(s)];
  RH.esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  RH.reduced = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  RH.sleep = ms => new Promise(r => setTimeout(r, ms));

  /* ---------------- language ---------------- */
  RH.lang = document.documentElement.lang === "he" ? "he" : "en";
  RH.he = RH.lang === "he";
  RH.dict = { en: {}, he: {} };
  RH.t = (k, p) => {
    let s = RH.dict[RH.lang][k];
    if (s == null) s = RH.dict.en[k];
    if (s == null) return k;
    if (typeof s === "function") return s(p || {});
    return p ? String(s).replace(/\{(\w+)\}/g, (m, n) => (p[n] != null ? p[n] : m)) : s;
  };
  // Merge a page dictionary and translate [data-t*] attributes
  RH.i18n = (dict, root = document) => {
    if (dict) for (const l of ["en", "he"]) Object.assign(RH.dict[l], dict[l] || {});
    RH.$$("[data-t]", root).forEach(el => { el.textContent = RH.t(el.dataset.t); });
    RH.$$("[data-th]", root).forEach(el => { el.innerHTML = RH.t(el.dataset.th); });
    RH.$$("[data-t-aria]", root).forEach(el => el.setAttribute("aria-label", RH.t(el.dataset.tAria)));
    RH.$$("[data-t-ph]", root).forEach(el => el.setAttribute("placeholder", RH.t(el.dataset.tPh)));
    RH.$$("[data-t-title]", root).forEach(el => el.setAttribute("title", RH.t(el.dataset.tTitle)));
    const dt = document.documentElement.dataset.tDoc;
    if (dt) document.title = RH.t(dt);
  };
  RH.setLang = l => {
    LS.set("rh-lang", l);
    const u = new URL(location.href);
    u.searchParams.set("lang", l);
    location.replace(u.toString());
  };
  function mountLangToggles() {
    RH.$$("[data-langtoggle]").forEach(box => {
      box.className = "langtoggle";
      box.setAttribute("role", "group");
      box.setAttribute("aria-label", RH.he ? "שפה" : "Language");
      box.innerHTML =
        `<button type="button" lang="en" data-lang-btn="en" aria-pressed="${!RH.he}" aria-label="English">EN</button>` +
        `<button type="button" lang="he" data-lang-btn="he" aria-pressed="${RH.he}" aria-label="עברית">עברית</button>`;
      box.addEventListener("click", e => {
        const b = e.target.closest("[data-lang-btn]");
        if (b && b.dataset.langBtn !== RH.lang) RH.setLang(b.dataset.langBtn);
      });
    });
  }

  /* ---------------- sound (WebAudio synth) + haptics ---------------- */
  RH.muted = LS.get("rh-muted") === "1";
  let ac = null, master = null;
  const gestured = () => !navigator.userActivation || navigator.userActivation.hasBeenActive;
  function audio() {
    if (RH.muted || !gestured()) return null;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    if (!ac) { ac = new AC(); master = ac.createGain(); master.gain.value = 0.5; master.connect(ac.destination); }
    if (ac.state === "suspended") ac.resume();
    return ac;
  }
  RH.audio = () => { const a = audio(); return a ? { ac: a, out: master } : null; };
  function tone(f, dur, { type = "sine", vol = 0.25, at = 0, to = null, attack = 0.005 } = {}) {
    const a = audio(); if (!a) return;
    const t = a.currentTime + at, o = a.createOscillator(), g = a.createGain();
    o.type = type; o.frequency.setValueAtTime(f, t);
    if (to) o.frequency.exponentialRampToValueAtTime(to, t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(master); o.start(t); o.stop(t + dur + 0.05);
  }
  function noise(dur, { vol = 0.3, at = 0, hp = 800 } = {}) {
    const a = audio(); if (!a) return;
    const n = Math.floor(a.sampleRate * dur), buf = a.createBuffer(1, n, a.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 2.2);
    const s = a.createBufferSource(), f = a.createBiquadFilter(), g = a.createGain();
    f.type = "highpass"; f.frequency.value = hp; g.gain.value = vol;
    s.buffer = buf; s.connect(f); f.connect(g); g.connect(master); s.start(a.currentTime + at);
  }
  RH.tone = tone;
  const SFX = {
    tap: () => tone(660, 0.05, { type: "triangle", vol: 0.12 }),
    tick: () => tone(1800, 0.025, { type: "square", vol: 0.05 }),
    pop: () => tone(520, 0.09, { type: "sine", vol: 0.16, to: 880 }),
    send: () => tone(740, 0.08, { type: "sine", vol: 0.12, to: 1100 }),
    ok: () => { tone(880, 0.09, { type: "triangle", vol: 0.18 }); tone(1320, 0.14, { type: "triangle", vol: 0.16, at: 0.07 }); },
    bad: () => { tone(220, 0.16, { type: "sawtooth", vol: 0.1, to: 140 }); },
    hint: () => { tone(988, 0.12, { vol: 0.14 }); tone(1480, 0.2, { vol: 0.1, at: 0.08 }); },
    hot: () => { tone(900, 0.08, { type: "triangle", vol: 0.16 }); tone(1200, 0.08, { type: "triangle", vol: 0.16, at: 0.09 }); },
    warm: () => tone(620, 0.12, { type: "triangle", vol: 0.15 }),
    cold: () => tone(240, 0.22, { type: "sine", vol: 0.18, to: 180 }),
    shutter: () => { noise(0.08, { vol: 0.5, hp: 2000 }); noise(0.06, { vol: 0.35, at: 0.07, hp: 3000 }); },
    beep: () => tone(1040, 0.09, { type: "square", vol: 0.06 }),
    stamp: () => { noise(0.12, { vol: 0.6, hp: 120 }); tone(90, 0.18, { type: "sine", vol: 0.4, to: 50 }); },
    quack: () => { tone(420, 0.09, { type: "sawtooth", vol: 0.08, to: 300 }); tone(400, 0.09, { type: "sawtooth", vol: 0.08, to: 280, at: 0.14 }); },
    clunk: () => { noise(0.2, { vol: 0.5, hp: 60 }); tone(70, 0.35, { vol: 0.4, to: 40 }); },
    win: () => { [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.22, { type: "triangle", vol: 0.16, at: i * 0.09 })); tone(1568, 0.5, { vol: 0.08, at: 0.38 }); },
    fanfare: () => { [392, 523, 659, 784, 659, 784, 1047].forEach((f, i) => tone(f, i === 6 ? 0.8 : 0.18, { type: "triangle", vol: 0.15, at: i * 0.12 })); },
  };
  RH.sfx = name => { try { SFX[name] && SFX[name](); } catch (e) {} };
  RH.buzz = p => { if (!RH.muted && navigator.vibrate && navigator.userActivation && navigator.userActivation.hasBeenActive) try { navigator.vibrate(p); } catch (e) {} };
  // Morse: returns duration in seconds; calls onEnd when done
  RH.morse = (text, { unit = 0.075, f = 640 } = {}) => {
    const M = { A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.", G: "--.", H: "....", I: "..", J: ".---", K: "-.-", L: ".-..", M: "--", N: "-.", O: "---", P: ".--.", Q: "--.-", R: ".-.", S: "...", T: "-", U: "..-", V: "...-", W: ".--", X: "-..-", Y: "-.--", Z: "--.." };
    let t = 0;
    for (const ch of text.toUpperCase()) {
      if (ch === " ") { t += unit * 4; continue; }
      for (const s of M[ch] || "") { const d = s === "." ? unit : unit * 3; tone(f, d, { type: "sine", vol: 0.2, at: t, attack: 0.004 }); t += d + unit; }
      t += unit * 2;
    }
    return t;
  };
  function mountMute() {
    RH.$$("[data-mute]").forEach(b => {
      const paint = () => {
        b.setAttribute("aria-pressed", String(RH.muted));
        b.setAttribute("aria-label", RH.muted ? (RH.he ? "הפעלת צלילים" : "Unmute sounds") : (RH.he ? "השתקת צלילים" : "Mute sounds"));
        b.title = b.getAttribute("aria-label");
        b.innerHTML = RH.muted
          ? '<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16 9l5 6M21 9l-5 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'
          : '<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>';
      };
      paint();
      b.addEventListener("click", () => {
        RH.muted = !RH.muted; LS.set("rh-muted", RH.muted ? "1" : "0");
        RH.$$("[data-mute]").forEach(x => x.dispatchEvent(new Event("rh-paint")));
        if (!RH.muted) RH.sfx("tap");
      });
      b.addEventListener("rh-paint", paint);
    });
  }

  /* ---------------- toast ---------------- */
  let toastEl, toastT;
  RH.toast = (msg, ms = 2600) => {
    if (!toastEl) { toastEl = document.createElement("div"); toastEl.className = "toast"; toastEl.setAttribute("role", "status"); document.body.appendChild(toastEl); }
    toastEl.textContent = msg; toastEl.classList.add("show");
    clearTimeout(toastT); toastT = setTimeout(() => toastEl.classList.remove("show"), ms);
  };

  /* ---------------- confetti ---------------- */
  let cv, cx, parts = [], raf = 0;
  RH.confetti = ({ n = 140, x = 0.5, y = 0.45, drizzle = 0 } = {}) => {
    if (RH.reduced) return;
    if (!cv) {
      cv = document.createElement("canvas"); cv.className = "confetti"; cv.setAttribute("aria-hidden", "true");
      document.body.appendChild(cv); cx = cv.getContext("2d");
      const size = () => { const d = Math.min(devicePixelRatio || 1, 2); cv.width = innerWidth * d; cv.height = innerHeight * d; cx.setTransform(d, 0, 0, d, 0, 0); };
      size(); addEventListener("resize", size);
    }
    const C = ["#ff3b4e", "#ffb547", "#3ee08f", "#59d5ff", "#b28cff", "#f1e8d5"];
    for (let i = 0; i < n; i++) {
      const a = -Math.PI / 2 + (Math.random() - 0.5) * 2.2, s = 6 + Math.random() * 10;
      parts.push({ x: innerWidth * x, y: innerHeight * y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.4, w: 5 + Math.random() * 6, h: 8 + Math.random() * 8, c: C[i % C.length], life: 0, round: Math.random() < 0.2 });
    }
    for (let i = 0; i < drizzle; i++) parts.push({ x: Math.random() * innerWidth, y: -20 - Math.random() * innerHeight * 0.6, vx: (Math.random() - 0.5) * 1.5, vy: 1 + Math.random() * 2, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.2, w: 5 + Math.random() * 5, h: 8 + Math.random() * 6, c: C[i % C.length], life: 0, round: Math.random() < 0.2 });
    if (!raf) raf = requestAnimationFrame(tick);
  };
  function tick() {
    cx.clearRect(0, 0, innerWidth, innerHeight);
    parts = parts.filter(p => p.y < innerHeight + 40 && p.life < 420);
    for (const p of parts) {
      p.life++; p.vy += 0.22; p.vx *= 0.985; p.vy *= 0.985; p.x += p.vx + Math.sin(p.life / 9) * 0.6; p.y += p.vy; p.r += p.vr;
      cx.save(); cx.translate(p.x, p.y); cx.rotate(p.r); cx.fillStyle = p.c;
      if (p.round) { cx.beginPath(); cx.arc(0, 0, p.w / 2, 0, 7); cx.fill(); }
      else { cx.scale(1, Math.cos(p.life / 6)); cx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); }
      cx.restore();
    }
    raf = parts.length ? requestAnimationFrame(tick) : 0;
    if (!raf) cx.clearRect(0, 0, innerWidth, innerHeight);
  }

  /* ---------------- stamp slam ---------------- */
  RH.slam = el => {
    if (!el) return;
    el.classList.remove("slam"); void el.offsetWidth; el.classList.add("slam");
    setTimeout(() => { RH.sfx("stamp"); RH.buzz([25, 30, 50]); const m = el.closest("main") || document.body; m.classList.remove("shakescreen"); void m.offsetWidth; m.classList.add("shakescreen"); }, RH.reduced ? 0 : 260);
  };

  /* ---------------- progress + gating ---------------- */
  const PROG = (RH.PROG = "rh-progress-v2");
  RH.ORDER = ["cipher", "map", "photo", "reveal"];
  RH.prog = () => LS.json(PROG, {});
  RH.setProg = (k, v) => { const p = RH.prog(); if (v) p[k] = v; else delete p[k]; LS.set(PROG, JSON.stringify(p)); };
  const GATE = {
    en: { cipher: "Mission 1 · The Wheel", map: "Mission 2 · Find the Place", photo: "Mission 3 · Agent ID", reveal: "Day 7 · The Vault",
      title: "Locked, Agent.", body: n => `Vesper's files open in order. Finish ${n} first, then this one unlocks.`, go: n => `Go to ${n}`, back: "Back to chat", done: "SOLVED", next: "NEXT UP", lock: "LOCKED" },
    he: { cipher: "משימה 1 · הגלגל", map: "משימה 2 · מצאי את המקום", photo: "משימה 3 · תעודת סוכנת", reveal: "יום 7 · הכספת",
      title: "נעול, סוכנת.", body: n => `התיקים של וספר נפתחים לפי הסדר. קודם ${n}, ואז זה נפתח.`, go: n => `ל${n.replace(/^משימה/, "משימה")}`, back: "חזרה לצ׳אט", done: "נפתר", next: "הבא בתור", lock: "נעול" },
  };
  // Returns true if the page may run; otherwise replaces <main> with a friendly locked screen.
  RH.gate = (key, mainSel = "main") => {
    const p = RH.prog(), idx = RH.ORDER.indexOf(key);
    const missing = RH.ORDER.slice(0, idx).find(k => !p[k]);
    if (!missing) return true;
    const G = GATE[RH.lang], file = { cipher: "cipher.html", map: "map.html", photo: "photo.html" }[missing];
    const main = RH.$(mainSel);
    main.innerHTML = `<section class="locked" id="locked" aria-labelledby="lockedTitle">
      <div class="padlock" aria-hidden="true">🔒</div>
      <h1 id="lockedTitle">${G.title}</h1>
      <p>${RH.esc(G.body(G[missing]))}</p>
      <ol>${RH.ORDER.map(k => `<li class="${p[k] ? "ok" : k === missing ? "next" : ""}"><span>${G[k]}</span><b>${p[k] ? "✓ " + G.done : k === missing ? G.next : "🔒 " + G.lock}</b></li>`).join("")}</ol>
      <div class="actions"><a class="btn" href="${file}">${RH.esc(G.go(G[missing]))}</a><a class="btn ghost" href="../index.html#demo">${G.back}</a></div>
    </section>`;
    document.body.classList.add("is-locked");
    return false;
  };

  /* ---------------- progressive hints + skip ---------------- */
  // cfg: { root, hints:[3 strings], onSkip(), onHint(level) }
  RH.hints = cfg => {
    const root = cfg.root;
    const L = RH.he ? { hint: "רמז", more: "עוד רמז", none: "אין יותר רמזים", skip: "דילוג על המשימה", sure: "בטוחה? הקישי שוב לדילוג", lv: "רמז" }
                    : { hint: "Hint", more: "Next hint", none: "No more hints", skip: "Skip mission", sure: "Sure? Tap again to skip", lv: "HINT" };
    root.classList.add("hints");
    root.innerHTML = `<div class="hints-row">
        <button type="button" class="btn ghost sm hint-btn" id="hintBtn">💡 <span class="t">${L.hint}</span> <span class="lvl">0/3</span></button>
        <button type="button" class="linkbtn skip-btn" id="skipMission">${L.skip}</button>
      </div><ol class="hint-list" id="hintList" aria-live="polite"></ol>`;
    let level = 0, armed = 0;
    const btn = RH.$("#hintBtn", root), list = RH.$("#hintList", root), skip = RH.$("#skipMission", root);
    btn.addEventListener("click", () => {
      if (level >= cfg.hints.length) return;
      const li = document.createElement("li");
      li.innerHTML = `<b class="n">${L.lv} ${level + 1}</b><span>${cfg.hints[level]}</span>`;
      list.appendChild(li); level++;
      RH.$(".lvl", root).textContent = `${level}/3`;
      RH.$(".t", root).textContent = level >= cfg.hints.length ? L.none : L.more;
      btn.disabled = level >= cfg.hints.length;
      RH.sfx("hint"); RH.buzz(10);
      cfg.onHint && cfg.onHint(level);
    });
    skip.addEventListener("click", () => {
      if (!armed) { armed = setTimeout(() => { armed = 0; skip.textContent = L.skip; skip.classList.remove("armed"); }, 3500); skip.textContent = L.sure; skip.classList.add("armed"); RH.sfx("tap"); return; }
      clearTimeout(armed); armed = 0; cfg.onSkip && cfg.onSkip();
    });
    return { get level() { return level; }, reset() { level = 0; list.innerHTML = ""; btn.disabled = false; RH.$(".lvl", root).textContent = "0/3"; RH.$(".t", root).textContent = L.hint; } };
  };

  /* ---------------- boot ---------------- */
  const boot = () => { mountLangToggles(); mountMute(); };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
