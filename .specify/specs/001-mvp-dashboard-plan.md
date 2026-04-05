# Implementation Plan: MVP Dashboard Economico

**Spec**: 001-mvp-dashboard
**Created**: 2026-04-05
**Status**: In Progress (Fase 0-2 completadas)

## Constitution Compliance Check

| Principio | Status | Implementacion |
|---|---|---|
| I. Trazabilidad | ✅ | SourceAttribution.tsx muestra fuente + URL + fecha obtencion |
| II. Versionado | ✅ | core/versioning.ts archiva en subcollection antes de actualizar |
| III. Transparencia derivados | ✅ | FormulaDisplay.tsx muestra formula y componentes |
| IV. Reproducibilidad | ✅ | Metodologia page lista todas las fuentes con links |
| V. Contexto | ✅ | Comparacion page con Chile vs OCDE/Latam |
| VI. Anti-Desinformacion | ⚠ Parcial | Descripcion existe, falta "que NO significa" |
| VII. Modelo normalizado | ✅ | DataPoint type tiene todos los campos requeridos |

## Architecture

### Data Model (Firestore)

```
indicators/{slug}                    → Metadata del indicador
  /datapoints/{periodId}             → Dato normalizado + isLatest
    /versions/{versionId}            → Historial de correcciones
ingestion_logs/{logId}               → Audit trail de ingesta
sources/{sourceId}                   → Estado de fuentes
```

### Data Flow

```
APIs oficiales → Source Fetchers → Normalize → Version Check → Firestore
                                                                  ↓
                     Next.js Server Components ← Admin SDK Queries
                                                                  ↓
                              ISR (revalidate: 1h) → Static HTML → Usuario
```

## Implementation Status

### ✅ Completado

**Fase 0 — Scaffolding**
- Next.js 16 project con TypeScript, Tailwind, App Router
- Firebase Firestore configurado (project: chileendatos, region: us-east1)
- Tipos TypeScript: `src/lib/types/indicator.ts`, `src/lib/types/source.ts`
- Firebase Admin + Client SDK: `src/lib/firebase/`
- Formatters es-CL: `src/lib/formatters.ts`
- Constants: `src/lib/constants.ts`

**Fase 1 — Capa de datos**
- Source fetchers: mindicador.ts, worldbank.ts, imf.ts
- Core ingestion: normalize.ts, versioning.ts, logger.ts
- Indicator orchestrators: inflacion-ipc, pib-crecimiento, deuda-externa,
  balance-fiscal, desempleo
- Runner CLI: `src/ingestion/runner.ts`
- Seed script: `src/ingestion/seed-indicators.ts`
- Datos ingestados y verificados en Firestore

**Fase 2 — Frontend**
- Layout: Header.tsx, Footer.tsx (lang="es")
- Charts: SparkLine.tsx, TimeSeriesChart.tsx, ComparisonBarChart.tsx
- Indicators: IndicatorCard.tsx, SourceAttribution.tsx, FormulaDisplay.tsx,
  VersionHistory.tsx
- UI: Card.tsx, Badge.tsx, Skeleton.tsx
- Pages: home, indicadores/[slug], comparacion, metodologia
- API: revalidate webhook
- Firestore rules + indexes desplegados

### ⬜ Pendiente

**Fase 3 — Deploy y automatizacion**
- [ ] Deploy a Vercel
- [ ] GitHub repo + push inicial
- [ ] GitHub Action para ingesta automatica (cron diario/semanal)
- [ ] Pagina `/indicadores` (lista completa de indicadores)

**Fase 4 — Fuentes adicionales**
- [ ] Registrar API Banco Central de Chile
- [ ] Fetcher BCCh (datos mas granulares)
- [ ] Fetcher DIPRES (ejecucion presupuestaria)
- [ ] Fetcher INE (empleo directo)
- [ ] Fetcher OECD (datos comparativos dinamicos)

**Fase 5 — Profundizacion**
- [ ] Indicadores derivados: deuda per capita, poder adquisitivo del
      salario, posicion fiscal relativa vs OCDE
- [ ] Capa "que NO significa" para cada indicador (Principio VI)
- [ ] Comparacion OCDE con datos dinamicos (reemplazar datos estaticos)
- [ ] VersionHistory integrado en pagina de detalle con datos reales

## Key Files

| Archivo | Proposito |
|---|---|
| `src/lib/types/indicator.ts` | Interfaces base: Indicator, DataPoint, Version |
| `src/lib/firebase/admin.ts` | Admin SDK init (server components + ingestion) |
| `src/lib/firebase/collections.ts` | Helpers tipados para colecciones |
| `src/ingestion/core/versioning.ts` | Logica de versionado (nunca sobrescribir) |
| `src/ingestion/runner.ts` | CLI de ingesta |
| `src/lib/queries/datapoints.ts` | Queries server-side para el frontend |
| `src/app/page.tsx` | Dashboard principal |
| `src/app/indicadores/[slug]/page.tsx` | Detalle de indicador |

## Verification

```bash
# 1. Dev server con datos reales
GOOGLE_CLOUD_PROJECT=chileendatos npm run dev
# Verificar: http://localhost:3000 muestra 5 indicadores

# 2. Ingesta
GOOGLE_CLOUD_PROJECT=chileendatos npx tsx src/ingestion/runner.ts --all --from=2015-01-01
# Verificar: output muestra puntos creados sin errores

# 3. Build
npx next build
# Verificar: compila sin errores, genera rutas estaticas

# 4. Firestore
# Console: https://console.firebase.google.com/project/chileendatos/firestore
# Verificar: coleccion indicators tiene 5 docs, cada uno con datapoints
```
