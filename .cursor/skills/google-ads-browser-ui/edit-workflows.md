# Browser edit workflows

Follow `google-ads-marketing` for whether a change is wise. These recipes are
UI how-tos only.

**Default scope:** account **Ribermax Embalagens** + campaign
**`Ribermax_Bravio_200km`** unless the user names another entity.

## A. Campaign performance scan (Bravio)

1. Account switcher → **Ribermax Embalagens 338-295-5114**.
2. **Campanhas** → **Campanhas** (list).
3. Locate **`Ribermax_Bravio_200km`** (Search, CPA desejado).
4. Date: últimos 30 dias (or user range). Prefer a range that includes periods
   when the campaign was enabled if current window shows zeros while paused.
5. Colunas: Custo, Conversões, Custo/conv., Cliques, Impr., CTR, Estratégia de
   lance, Orçamento, Status.
6. Open Bravio → grupos de anúncios / anúncios / palavras-chave / termos.
7. Note: paused status, CPA target, budget R$ 40 baseline, waste queries.
8. Report top issues; propose ≤3 actions — **Bravio only**.

## B. Pause / enable campaign or ad group

1. Open entity list → find row by name.
2. Click status indicator → **Pausar** or **Ativar**  
   **or** checkbox → toolbar → Pausar / Ativar.
3. Confirm UI status changed.
4. Record name + action.

## C. Change daily budget (±10–20%)

1. Campanhas list → click Orçamento cell (or Editar orçamento).
2. Enter new daily budget in BRL.
3. Salvar.
4. Verify cell shows new value.
5. Avoid >20% jumps unless user explicitly wants aggressive scale.

## D. Adjust bid strategy target (tCPA / tROAS)

1. Confirm conversion tracking health under **Metas** first.
2. Campanha → Configurações → Lances  
   **or** list column Estratégia de lance.
3. If switching strategy type (not just target), treat as high-impact —
   confirm with user.
4. Set target from recent actuals (marketing skill), not aspirational.
5. Salvar; note learning likely restarts.

## E. Search terms → negatives

1. Campaign or ad group → **Termos de pesquisa** (or Insights).
2. Sort by Custo; find irrelevant queries with spend.
3. Select terms → **Adicionar como palavra-chave negativa**  
   (phrase/exact as appropriate).
4. Prefer campaign or shared list for reuse; account-level for never-terms.
5. Do not negative brand terms that belong to a brand campaign without check.

## F. Add / edit keywords (Search)

1. **Palavras-chave** → + / Adicionar palavras-chave.
2. Choose campaign + ad group theme match.
3. Match types per strategy (broad + Smart Bidding default in marketing skill).
4. Save; verify in table.

## G. RSA / assets

1. **Anúncios** → open RSA → Editar.
2. Fill empty headline/description slots; keep lines standalone.
3. Pin only if user/compliance requires.
4. For sitelinks/callouts: Assets at campaign or account level.
5. Save; check strength / policy warnings.

## H. Performance Max guardrails

1. Open PMax campaign → grupos de assets / insights de canal (if available).
2. Brand exclusions / negative keywords where UI provides them.
3. Refresh asset groups with more images/headlines before structural splits.
4. Do not expect classic keyword bid edits inside PMax.

## I. Conversion action review (before bidding edits)

1. **Metas** → Conversões / Resumo.
2. List actions: primary vs secondary, source (GA4 / tag / import).
3. For this project, expect WhatsApp / `whatsapp_click` style contact goals.
4. Do not flip primary goals without explicit approval.

## J. Post-edit verification

1. Entity shows new value/status.
2. Optional: **Histórico de alterações** — change present.
3. Overview cards not required to update instantly; trust table + history.
4. Tell user what to monitor for 7–14 days (learning).

## Bulk edit caution

Toolbar bulk edits are powerful. If multiple rows selected:

- Re-read selection count before Aplicar.
- Prefer filter → select visible relevant rows only.
- Never “select all” across the account unless user asked for account-wide
  change.

## Rollback

1. Histórico de alterações → locate change.
2. Use UI undo when offered; otherwise manually revert field to previous value
   from history details.
3. Tell user if undo is unavailable.
