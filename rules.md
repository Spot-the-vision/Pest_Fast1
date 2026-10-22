# rules.md — Behavioral Coding Principles for AI Pair Programming

These four core principles, adapted from Andrej Karpathy's philosophy on software development, govern all AI assistant behavior in this codebase. They take precedence over speculation, assumptions, or premature optimization.

---

## 1. Think Before Coding

- **Don't Assume:** Never guess at API contracts, database schemas, styling tokens, or business flow states. Verify existing code in `packages/` and `apps/` first.
- **Surface Tradeoffs:** If a requested change introduces complexity, performance degradation, or risks breaking cross-dashboard sync, explicitly highlight the tradeoff.
- **Push Back on Complexity:** Prefer straightforward, idiomatic solutions over clever, layered abstractions.
- **Stop and Ask:** If requirements or UI states are ambiguous, stop and ask the user rather than proceeding with assumptions.

---

## 2. Simplicity First

- **Minimum Code That Solves the Problem:** Write only the code necessary to accomplish the user's task.
- **Nothing Speculative:** Do not build for hypothetical future requirements. No unused parameters, premature interfaces, or unneeded fallback ladders.
- **No Single-Use Abstractions:** Do not create utility functions, hooks, or helper classes for code used in only one place. Inline it until a second caller appears.
- **Reuse Existing Packages:** Always leverage `@pest-free/ui-kit`, `@pest-free/shared-config`, `@pest-free/shared-utils`, and `@pest-free/shared-hooks` before writing new logic.

---

## 3. Surgical Changes

- **Touch Only What You Must:** Keep diffs as small and focused as possible. Do not modify unrelated lines, reformat entire files, or alter whitespace outside your target block.
- **Match Existing Style:** Follow existing patterns in `.js`, `.jsx`, and `.mjs`. Preserve naming conventions, indentation, and structure.
- **Zero Drive-By Refactoring:** Do not clean up or "fix" working adjacent code outside the task scope. That belongs in dedicated refactoring commits.
- **Clean Up Your Own Orphans:** If your change replaces a function, variable, or asset, remove the old one immediately. Do not leave dead code behind.

---

## 4. Goal-Driven Execution

- **Define Verifiable Criteria:** Before modifying code, establish how the outcome will be validated (e.g., specific test passing, port responding 200 OK, UI state transitioning).
- **Step-by-Step Plans:** For multi-step tasks, outline a concrete sequence with verification checks at every step.
- **Validate Before Completion:** Never declare a task complete without running:
  - Unit tests: `npm --prefix apps/customer-app test`
  - Build check: `npm run build`
  - Live flow checks where applicable.

---

## 5. Non-Negotiable Codebase Invariants

1. **Strictly Pure JavaScript:** Never introduce TypeScript (`.ts`, `.tsx`, `tsconfig.json`) or raw HTML pages.
2. **Preserve UI & Brand Identity:** Never modify brand colors (Emerald `#003527`, Gold `#F8E7C9`), fonts, layout hierarchies, or button labels unless explicitly instructed.
3. **App-Ready Layout Primitives:** When building Customer or Worker interfaces, use semantic primitives (`View`, `Text`, `TouchableOpacity`, `ScrollView`, `Modal`) from `@pest-free/ui-kit` to ensure mobile app wrap compatibility.
4. **State Machine Integrity:** All booking transitions must abide by `@pest-free/shared-utils/booking.js`. Illegal state jumps are strictly forbidden.
