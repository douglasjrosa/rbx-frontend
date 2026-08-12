---
name: google-ads-browser-ui
description: >-
  Analyzes and edits Google Ads campaigns through the Ads web UI via the
  cursor-ide-browser MCP when the API developer token is read-only. Use when
  the user asks to change budgets, bids, status, keywords, ads, negatives,
  assets, or settings in Google Ads; review campaign performance in the UI;
  work in Ribermax Embalagens, Ribermax MCC, or Ribermax_Bravio_200km; or says
  API cannot mutate / edit via browser.
---

# Google Ads Browser UI (Analysis + Edits)

Use the **Google Ads web interface** for writes. The project developer token is
**read-only** — do not attempt mutate calls via `google-ads-api` scripts.

- Strategy / ROI rules → `google-ads-marketing` skill
- Read-only API / GAQL → `google-ads-api` skill (optional diagnostics only)
- UI map (PT-BR) → [ui-navigation.md](ui-navigation.md)
- Step recipes → [edit-workflows.md](edit-workflows.md)

## Account context (Ribermax)

The agent has UI access to both the **manager** and the **client** account.
Default work happens in the **client** account (user account), not the MCC.

| Entity | Name in UI | ID (UI) | Digits | Role |
|--------|------------|---------|--------|------|
| Client (primary) | **Ribermax Embalagens** | `338-295-5114` | `3382955114` | Edit campaigns here |
| Manager (MCC) | Ribermax MCC | `752-489-5847` | `7524895847` | Rollup / sub-accounts only |

Signed-in Google user (UI): `embalagens.madeira@gmail.com`.

Client campaigns URL pattern:

`https://ads.google.com/aw/campaigns?ocid=103984489&...`

(`ocid` / `uscid` for Embalagens ≈ `103984489` — copy from the live tab.)

UI language: **Português (Brasil)**. Match button/menu labels in PT-BR.

Prefer the user-attached Ads tab when present.

## Active work focus

**Primary campaign:** `Ribermax_Bravio_200km`

| Field | Current baseline (UI) |
|-------|------------------------|
| Account | Ribermax Embalagens |
| Type | Pesquisa (Search) |
| Status | Pausada |
| Budget | R$ 40,00/dia |
| Bidding | CPA desejado (Target CPA) |

Unless the user names another campaign, analyze and edit **only**
`Ribermax_Bravio_200km`. Do not change sibling campaigns by accident.

Related (do not touch unless asked):

| Campaign | Status | Notes |
|----------|--------|-------|
| `Ribermax - 200km` | Pausada | Search, Max. conversões, R$ 15/dia |
| `mkt geral 1.0` | Removida | Ignore |
| `Display 1.0` / `Display gráfico 1.0` | Removida | Ignore |
| `Caixa de Madeira Fumigada` | Removida | Smart; ignore |

Account banner may say no ads are serving because campaigns/ad groups are
paused — expected while Bravio stays paused.

## How to open the focus campaign

1. Confirm account picker shows **Ribermax Embalagens 338-295-5114**  
   (if on MCC, switch via account picker or Contas → client row).
2. Left rail **Campanhas** → **Campanhas**.
3. In the table, open row **`Ribermax_Bravio_200km`** (or filter by name).
4. Scope filters / view to this campaign before bulk actions.

## Tooling rules (cursor-ide-browser)

1. `browser_tabs` list → identify the Ads tab (`viewId`).
2. If tab exists: `browser_lock` **lock** before interactions.
3. Drive UI with `browser_snapshot` (refs) + click/type/fill/select.
4. Use `browser_take_screenshot` to verify charts/tables after edits.
5. Prefer short CDP waits / fresh snapshots over long sleeps.
6. `browser_lock` **unlock** when finished for the turn.
7. Stop after ~4 failed attempts on the same action; report blocker.
8. If login / 2FA / captcha / “Take Control” / ad-blocker hard block → stop
   and ask the user.

**Ad blockers:** Ads UI may show “Turn off ad blockers”. If tables stay empty
or actions fail, ask the user to disable blockers for `ads.google.com`.

## Operating mode

### Analyze (default first)

1. Confirm **Ribermax Embalagens** (not MCC-only rollup).
2. Scope to **`Ribermax_Bravio_200km`**.
3. Set date range (often últimos 7 / 30 dias).
4. Review campaign → grupos de anúncios → anúncios / palavras-chave /
   termos de pesquisa / configurações / lances.
5. Summarize findings + proposed edits **before** changing anything risky.

### Edit (writes in UI)

1. State the exact change and expected KPI impact (tie to marketing skill).
2. Prefer **one meaningful change** per learning window.
3. Navigate to the entity → edit → confirm save toast / updated value.
4. Capture post-edit evidence (snapshot or screenshot).
5. Log what changed (entity name, field, old → new).

### Destructive / high-impact — ask first unless user already approved

- Remove campaigns, ad groups, keywords, conversion actions
- Pause all / large budget cuts (>20%)
- Bid strategy switches (e.g. Max Conv → tCPA/tROAS) or large CPA target jumps
- Conversion goal / primary conversion changes
- Shared budget or portfolio strategy rewiring
- Enabling Bravio to spend without an agreed budget/CPA plan

Safe without extra ask when user requested the task: pause/enable single
entity inside Bravio, small budget nudge (±10–20%), add negatives from agreed
list, RSA asset top-ups, label edits.

## MCC vs client

| Goal | Where |
|------|--------|
| Day-to-day Bravio work | **Ribermax Embalagens** → Campanhas |
| List sub-accounts, budgets rollup | MCC → **Contas** → Performance / Orçamentos |
| Goals / conversions | Embalagens → **Metas** |
| Change history audit | Embalagens → **Histórico de alterações** |

Client left rail has **no Contas** item (that is MCC-only). Embalagens shows:
Campanhas, Metas, Ferramentas, Faturamento, Adm.

## Primary nav — client (Embalagens)

| Menuitem | Use for |
|----------|---------|
| **Criar** (+) | New campaign / ad / keyword flows |
| **Campanhas** | Overview, recommendations, campaigns tree, change history |
| **Metas** | Conversions, attribution, audience goals |
| **Ferramentas** | Shared library, bidding, policy, planning |
| **Faturamento** | Billing (avoid unless asked) |
| **Adm.** | Access, preferences, linked accounts |

Under **Campanhas**: Visão geral → Recomendações → Insights e relatórios →
Campanhas (Campanhas, Grupos de anúncios, Anúncios, Experimentos, …) →
Públicos-alvo, palavras-chave e conteúdo → Histórico de alterações.

See [ui-navigation.md](ui-navigation.md).

## Analysis checklist (Bravio)

- [ ] Account = Ribermax Embalagens
- [ ] Campaign = `Ribermax_Bravio_200km` only
- [ ] Date range + filters understood
- [ ] Status / budget / CPA target noted
- [ ] Cost / conv / CPA metrics visible (add Colunas if missing)
- [ ] Search terms waste candidates noted
- [ ] Budget limited? Learning? Policy issues?

## Edit checklist

- [ ] User intent matched; marketing skill constraints applied
- [ ] Right campaign = Bravio (no sibling edits)
- [ ] Change applied and UI confirms
- [ ] Summary returned to user in PT-BR

## Agent response style

- Chat to user: **Português (Brasil)**
- Be concise: what you found, what you changed (or propose), next check date
- Do not claim API mutates succeeded — writes are UI-only
- If read-only API helps analysis, say you used API for read and UI for edit
