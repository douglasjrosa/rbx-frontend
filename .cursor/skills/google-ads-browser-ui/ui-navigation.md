# Google Ads UI navigation (PT-BR)

Labels match the Ribermax Ads UI (client + MCC). Prefer accessible names from
`browser_snapshot` over brittle CSS.

## Default account shell (client)

Most work uses **Ribermax Embalagens** (`338-295-5114`), not the MCC.

| Cue | Value |
|-----|--------|
| Page title prefix | `… - Ribermax Embalagens - Google Ads` |
| Account picker | `Ribermax Embalagens 338-295-5114` |
| Focus campaign | `Ribermax_Bravio_200km` |
| Example campaigns URL | `/aw/campaigns?ocid=103984489&…` |

MCC shell title uses `Ribermax MCC` and includes a **Contas** left-rail item.
If you see Contas, you are in the manager — switch to Embalagens before editing
Bravio.

## Shell chrome

| Control | Typical accessible name |
|---------|-------------------------|
| Account switcher | `Ribermax MCC 752-489-5847` or client name + ID |
| Page search | `Pesquisa na página` |
| Refresh | `Atualizar` |
| Create | `Criar` |
| Date range | e.g. `4 a 11 ago. 2026` / `Mostrar dados dos últimos 30 dias` |
| View filter | `Visualização … Todas as campanhas` |
| Campaign filter | `Campanhas (N) Selecione uma campanha` |
| Status filters | `Status da campanha: …`, `Status do grupo de anúncios: …` |
| Add filter | `Adicionar filtro` |
| Columns | `Colunas` |
| Download | `Download` |

URL hints (path after `/aw/`):

| Path | Page |
|------|------|
| `overview` | Visão geral |
| `accounts` | Contas / Performance |
| `campaigns` | Lista de campanhas |
| `adgroups` | Grupos de anúncios |
| `ads` | Anúncios |
| `keywords` | Palavras-chave |
| `assetreport` / assets | Assets |
| `conversions` | Conversões (Metas) |
| `changewww` / change history | Histórico de alterações |

Query params `ocid`, `uscid`, `ascid` identify account context — do not invent
IDs; copy from the live tab.

## Left rail — Contas (MCC)

Submenu when Contas is active:

- **Performance** — sub-account metrics table
- **Orçamentos** — account budgets
- **Notificações**
- **Configurações da subconta**

Open a client: click account name in the Contas table, or use the top account
switcher.

Empty table tip: message may say change filter from **Vinculadas diretamente**
to **Todas**.

## Left rail — Campanhas (Embalagens client)

Secondary items observed:

- **Visão geral**
- **Recomendações**
- **Insights e relatórios** (collapsed)
- **Campanhas** (expanded) → Campanhas, Grupos de anúncios, Anúncios,
  Experimentos, Grupos de campanhas
- **Recursos** / **Produtos** (collapsed; as available)
- **Públicos-alvo, palavras-chave e conteúdo** (collapsed) → keywords,
  search terms, audiences, locations, etc.
- **Histórico de alterações**

Campaign list tabs: **Campanhas** | **Rascunhos** | **Configurações**.

For Search (Bravio): use classic ad groups, ads, keywords, search terms.

**Performance Max** (if present later) uses **grupos de assets** instead —
do not expect classic keyword bids inside PMax.

## Metas

Use for conversion actions, goals, value settings — critical before bid
changes. Prefer viewing **Conversões** and confirming primary vs secondary
actions.

## Ferramentas

Shared libraries: negative keyword lists, audiences, bid strategies, content
suitability, policy manager, keyword planner (labels vary). Use for
account-level shared negatives and portfolio strategies.

## Tables — how to edit rows

Common pattern:

1. Ensure columns include the field (Colunas → mark Custo, Conversões,
   Custo/conv., Valor da conv./custo, Orçamento, Estratégia de lance, …).
2. Click the **cell** (budget, status dot, bid) to inline-edit when available.
3. Or select row checkbox → blue toolbar → Editar / Pausar / Ativar / Alterar
   orçamento / Alterar lances.
4. Confirm dialogs (**Salvar**, **Aplicar**, **Confirmar**).
5. Wait for toast / refreshed cell; snapshot again.

Status icons: green = eligible/enabled, yellow = limited, gray = paused,
red = not eligible / error — read the tooltip before changing.

## Filters and segments

- Narrow with **Adicionar filtro** (campanha, tipo, status, rótulo).
- **Segmentação** on tables splits metrics (device, time, rede) — use for
  analysis; turn off before bulk edits to avoid confusion.
- Saved **Visualizações** speed repeat analysis; do not assume user’s private
  views exist.

## Create flows

**Criar** opens campaign / ad / keyword creation wizards. Prefer explicit user
request before starting a full new campaign wizard (many steps, easy to
mis-set bidding/goals).

## Change history

After edits: **Histórico de alterações** to verify user + timestamp + change
type. Good rollback breadcrumb if something looks wrong.

## Known UI friction

- Heavy Ads DOM: always re-snapshot after navigation; refs go stale.
- Loading spinners on charts/tables — wait and re-snapshot.
- Modals / coach marks / “Instalar o app” — dismiss if blocking.
- Ad blocker interstitial can break grids — escalate to user.
- MCC overview may show **R$ 0,00** if no client selected or filters hide
  spend — switch into the client before concluding “no traffic”.
