# Contributing

This repo is a monorepo split by ownership so that three people can work in parallel with
minimal merge conflicts. Read this fully before opening your first PR.

## Ownership boundaries (hard rule)

- **A** — only edits `apps/admin-dashboard/**` and `apps/agency-dashboard/**`. May draft
  migration files under `packages/db/migrations/**` but does not merge them — C reviews
  and merges all DB migrations.
- **B** — only edits `apps/worker-app/**` and `apps/customer-app/**`. Never touches
  backend or migrations.
- **C** — sole owner of `apps/api/**`, `packages/db/**`, and `packages/shared-types/**`.
  A and B **consume** `shared-types`, they never edit it directly — request new fields
  from C instead.
- **`packages/ui-kit/**`** is shared between A and B. Post in the team channel before
  editing a component someone else is using.

Sticking to these boundaries means two people almost never touch the same file, which is
what keeps merges painless.

## Branching model

- `main` — protected, always deployable.
- `dev` — integration branch. Feature branches merge here; `dev` merges to `main` at
  each milestone/release.
- Feature branches, prefixed with your initial:
  - `a/admin-worker-approval-view`
  - `a/agency-analytics-dashboard`
  - `b/customer-booking-flow`
  - `b/worker-masked-contact-screen`
  - `c/api-booking-approval-endpoint`
  - `c/db-migration-agency-analytics`

## Workflow for a new feature

1. If the feature needs new data on the wire (a new field, a new endpoint's request/response
   shape), **C writes the type in `packages/shared-types` first** and opens a small PR for
   just that. A/B can start building against it immediately using mock data.
2. A/B build the UI against the shared type + mocked data.
3. C builds the real endpoint against the same shared type.
4. A/B swap their mock for the real API call — because the shape was agreed upfront, this
   is a one-line change, not a rewrite.

## PR rules

- Keep PRs small and frequent (daily, ideally) — merge into `dev`, not `main`.
- Rebase your branch on `dev` daily rather than merging `dev` into your branch, so
  conflicts stay small and are caught early.
- CI (Turborepo) only rebuilds/tests the apps affected by your change — a PR to
  `agency-dashboard` won't trigger `worker-app` tests.
- One reviewer minimum. C reviews anything touching `packages/db` or `packages/shared-types`,
  regardless of who opened the PR.
- Migrations: A may draft a migration file and open a PR, but only C merges it, after
  checking it against the live schema.

## Commit messages

`<area>: <what changed>` — e.g. `agency-dashboard: add worker approval list view`,
`api: add booking approval endpoint`, `db: add index on booking.status`.
