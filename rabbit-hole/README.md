# Rabbit Hole

A birthday gift that turns into a week-long mystery. Someone books it for a friend, and a personal AI agent made just for that friend texts them one challenge a day, built from their own life. On the last day, the agent opens a vault with the real gift inside.

This folder is a clickable prototype. Nothing is sent to anyone, there is no backend, and all characters in the demo are fictional.

## What's here

| Path | What it is |
|---|---|
| `index.html` | The landing page: pitch, pricing, FAQ, and a playable demo where you are Noa receiving the game. English and Hebrew. |
| `games/` | The demo's four missions: `cipher.html` (decode a word on a wheel), `map.html` (find a bench with a magnifier), `photo.html` (photo-booth agent ID that never leaves the phone) and `reveal.html` (the Day 7 vault, opened with the three mission stamps). |
| `builder.html` | The agent builder: the buyer's side of the product. Interview, fact check, three generated agents, test chat, a seven-day plan, and a mode that plays the whole week in one sitting. |
| `assets/` | Shared runtime (`rh.js`: language, sound, confetti, hints, mission gating), the landing page and demo chat scripts, and styles. |

## Running it

Serve the folder with any static server, for example from the repository root:

```bash
python3 -m http.server 8765
```

Then open `http://localhost:8765/rabbit-hole/`. Add `?lang=he` for Hebrew.

The builder has two modes:

- **Locally**, it runs in sample mode with pre-written replies, so every screen can be clicked through without an API key.
- **As a published Claude artifact**, it calls Claude live through the artifact `sample` capability, using the viewer's own Claude usage. The current version is published privately at https://claude.ai/artifact/82NCjGi8R7PAqdt6gjD76n. To update it, republish `builder.html` to that artifact.

## How the builder works

1. **Interview.** Vesper asks for stories rather than form fields: who they are, a habit, a shared memory, a place that matters, what they're into, how hard to tease, how they feel about puzzles, and what's off limits. It asks one follow-up when an answer is thin. The gift is asked last.
2. **Check the facts.** Answers become short facts the buyer can edit or delete. These are the only things the agent may say about the receiver's past.
3. **Choose the agent.** Claude writes three original characters rooted in the facts, such as a lemon tree by the childhood gate or a sourdough starter.
4. **Test chat.** The buyer plays the receiver and tries to catch the agent out, with ready-made traps like "What's my gift?" and "Remember our trip to Lisbon?".
5. **The week.** A seven-day plan. The page encodes ciphers itself, inserts the gift on Day 7, and runs a second check that flags any detail the case file doesn't support.
6. **Play the week.** The buyer plays all seven days in one sitting. The agent remembers earlier days, the sender gets a short daily update, STOP ends the game, and a serious disclosure pauses it.

Safeguards built into the prompts and page:

- The gift text is stripped from everything sent to Claude.
- The agent can't see photos.
- It never asks the receiver to visit a place unless the buyer said they can get there.
- It deflects memories it wasn't given.
- It says it's an AI character when sincerely asked.

## Current status

**Working:**

- The landing page and demo run end to end in English and Hebrew.
- The builder works in both languages. In sample mode it was run start to finish with no script errors, and no gift text appeared in any prompt.
- Tested live on Claude:
  - The English flow, including a full seven-day playthrough with Day 7 memory and the gift reveal.
  - A Hebrew pass covering the agents, the invention check, a Hebrew cipher and the sender update.
- The agents read as personal on the sample friend, and they passed the traps: the sealed gift, the invented trip, an off-limits topic, and "are you real?".

**Not yet verified:**

- STOP and the pause for a serious disclosure have only run in sample mode, not live.
- The English builder hasn't been re-run live since the last round of changes.
- Every test used the fictional Noa. It hasn't been tried on a real person, which is the real test of whether it feels personal or a little creepy.
- Touch drag on the cipher wheel and the map magnifier, and the camera path in the photo mission, haven't been tested on a real phone.

**Known gaps:**

- **Approve leads nowhere.** There's no payment, waitlist, email capture or analytics, so interest can't be measured yet.
- **No delivery.** Nothing sends texts or schedules mornings. The FAQ promises a daily text with a private link, which needs an SMS or WhatsApp provider.
- **No daily update for the buyer in the real game.** The builder shows what the sender would get, but nothing sends it.
- **Plan differences are thin.** Field Agent and Full Operation are both seven days. Only the Day 7 video note differs in the builder.
- **The demo and the builder are separate.** The landing page demo is a fixed script about Noa. It doesn't use an agent from the builder.
- **The invention check can miss things.** It's a second model pass, not a guarantee. The buyer still has to read the week.
- **No friend contributions.** Inviting friends to add a memory each isn't built. It may be the strongest way to make the week feel personal.

## Next steps

1. **Test on real people.** Run the builder about real friends, in English and Hebrew. Then run three to five weeks by hand: the builder drafts each morning, a person approves it, and it's sent over WhatsApp. Watch whether receivers finish the week, and where it feels too personal.
2. **Measure demand.** Add analytics to the landing page and a real ask at Approve, such as a waitlist or deposit, before building a backend.
3. **Legal check.** Get advice on messaging someone who never opted in, under Israel's spam law (Communications Law §30A) and the US TCPA, and on storing stories about a third party.
4. **Delivery and scheduling.** Pick the channel (SMS or WhatsApp; WhatsApp needs approved templates for messages the business starts). Send the morning messages, handle replies and STOP, and store state per game.
5. **Connect the plan to the games.** Feed the generated cipher, map and photo days into the existing mission pages instead of the fixed Noa content. The map is the hardest, because it's hand-drawn today.
6. **Friend contributions.** Let the buyer invite two or three friends to add a memory each, through the same fact check.
7. **Sharpen the plans.** Decide what Full Operation adds beyond the video: side quests, a physical finale, or the keepsake PDF.
8. **Accessibility pass.** Test the games with keyboard only and on phones. The map magnifier still needs a proper value for screen readers.
