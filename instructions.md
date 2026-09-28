# instructions.md — How an AI Agent Works in This Repo

This file owns **process** — how an agent should work, in what order to read things,
and how to keep task/token usage tight. It does not contain structure (→ `README.md`)
or the change log (→ `AGENTS.md`). If a note doesn't fit "how to work," it belongs in
one of those two files instead, not here.

---

## 1. Permission gate — ask before touching the codebase

Reading `README.md`, `AGENTS.md`, and this file is always allowed, no permission needed.

Everything else — opening, reading, or analyzing any actual code file in `apps/`,
`packages/`, or `docs/` — requires asking first:

- Name the **exact file(s) or folder** you want to open, and **why** (one line).
- Wait for an explicit yes.
- Only then open/read/analyze it. If the answer is no, or there's no answer yet, work
  from README/AGENTS.md alone and say what you couldn't confirm without that file.

This applies even inside your own owned app, and even for a task that seems to obviously
require it — always name the file and ask first, rather than assuming permission because
the task implies it.

## 2. Onboarding read-order for a NEW agent/session

When starting a fresh session on this repo — especially right after someone else
pushed — do **not** scan the codebase. Read, in this order, and stop as soon as you
have what you need:

1. `instructions.md` (this file) — how to work.
2. `README.md` → Status Tracker — what's done, what's not.
3. `AGENTS.md` → Hard Boundaries + Domain Rules (always) + the **most recent Change Log
   entries relevant to your task** — what recently changed and why.
4. Anything beyond that — a specific app file, a doc in `docs/` — goes through the
   permission gate in section 1 first.

Do not open the other two people's app folders, and do not re-read the frozen Migration
History in `AGENTS.md` unless a task specifically asks about that setup phase.

## 3. Token-efficiency rules

- Read only what sections 1–2 say to read, or what you were just given permission for.
- Don't paste large file contents back in your response — reference the file and line.
- Don't re-explain the project, boundaries, or domain rules in your replies — they're
  already written down; just follow them.
- Prefer a short diff over a rewritten file. Never regenerate something that already
  works to "clean it up" unless asked.

## 4. Task chunking — no big-bang changes

- Break every feature request into the smallest change that is independently useful
  and testable. One focused change per pass.
- Never touch more than one owner's app/package in the same change (see boundaries in
  `AGENTS.md`). If a request seems to need that, say so and split it into per-owner
  pieces instead of doing it all yourself.
- Sequence, don't parallelize: finish and confirm one chunk before starting the next.
  If a task looks like it needs 5+ steps, list the steps first (one line each), then do
  step 1 only, and stop for confirmation before continuing.
- If a request is vague ("add live tracking"), pick the smallest first slice and say
  that's the slice you're doing, rather than attempting the whole feature at once.

## 5. Standard loop for any task

1. **Plan** — 1–3 lines: what you're about to change, in which app/package.
2. **Ask** — if it requires opening a code file, name it and get permission (section 1).
3. **Check** — does this cross a boundary or touch a domain rule in `AGENTS.md`? If
   yes, stop and flag it instead of proceeding.
4. **Implement** — the smallest working diff for this chunk only.
5. **Log** — append one entry to `AGENTS.md` → Change Log using its template, including
   "Still missing / not yet added," and leave the three review checkboxes unticked for
   Person A/B/C to confirm.
6. **Update tracker** — if a `README.md` status-tracker row changed state, update it.
7. **Report** — a short summary (what changed, what's left, what needs review), not a
   full file dump.

## 6. Escalation

Anything involving money (UPI/payments), KYC/PII, or the masked-contact/approval logic —
don't guess. Leave a `// TODO(agent): confirm with C — ...` comment (or the relevant
owner) and ask, per `AGENTS.md`.

## 7. Where things go (quick reference)

| Kind of content | File |
|---|---|
| Project structure, ports, credentials, run commands, progress status | `README.md` |
| Ownership boundaries, domain rules, per-change log with 3-person review | `AGENTS.md` |
| How an agent should work, read-order, permission gate, chunking, escalation | `instructions.md` |

If you're about to add a paragraph and you're not sure which file it belongs in, check
this table before writing it anywhere.