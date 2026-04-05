<!--
Sync Impact Report
- Version change: 0.0.0 → 1.0.0
- Added principles: Trazabilidad, Versionado de Datos, Transparencia,
  Reproducibilidad, Contexto, Anti-Desinformacion, Modelo Normalizado
- Added sections: Fuentes de Datos, Stack Tecnico
- Templates requiring updates: ✅ constitution updated
- Follow-up TODOs: none
-->

# Chile en Datos Constitution

## Core Principles

### I. Trazabilidad

Cada dato publicado DEBE incluir un enlace directo a su fuente oficial
original. No se permite publicar ningun valor sin una URL verificable que
apunte al dato en la fuente primaria. Esto es lo que separa informacion
de opinion.

### II. Versionado de Datos

Los datos NUNCA se sobrescriben. Cuando una fuente oficial corrige una
cifra retroactivamente, el sistema DEBE almacenar ambas versiones con
sus respectivas fechas de obtencion. El usuario puede ver el historial
completo de revisiones de cualquier dato. Razon: las fuentes oficiales
publican datos preliminares que luego corrigen; ambos tienen valor
informativo.

### III. Transparencia en Indicadores Derivados

Todo indicador calculado a partir de otros datos DEBE mostrar su formula
y las fuentes de cada componente. No se permiten "cajas negras". Un
indicador derivado sin formula visible no se publica.

### IV. Reproducibilidad

Cualquier persona DEBE poder verificar cualquier cifra del dashboard de
forma independiente: accediendo a la fuente original via el enlace
provisto, viendo cuando se obtuvo el dato, y reproduciendo el calculo si
es un indicador derivado. Si un dato no es reproducible, no se publica.

### V. Contexto Obligatorio

Un numero aislado no tiene valor informativo. Cada indicador DEBE
presentarse con: comparacion con paises similares (OCDE, Latam),
tendencia historica, y rangos que organismos internacionales consideran
saludables. Razon: sin contexto, cualquier cifra puede usarse para
desinformar.

### VI. Capa Anti-Desinformacion

Cada indicador DEBE incluir: que es (definicion simple), por que importa,
como se calcula, y que NO significa (mitos comunes desmentidos). Esta
capa es lo que diferencia al proyecto de un simple agregador de datos.

### VII. Modelo de Datos Normalizado

Desde el dia 1, cada dato almacenado DEBE contener: valor + unidad,
fecha de referencia, fecha de obtencion, fuente + URL verificable,
granularidad temporal, y nota metodologica. No se aceptan datos sin
estos campos completos. Razon: sin normalizacion, cada nueva fuente
se convierte en un parche y el cruce de datos es imposible.

## Fuentes de Datos

Solo se consumen fuentes oficiales, publicas y gratuitas:
- Banco Central de Chile (API BDE)
- mindicador.cl (consolidador de indicadores diarios)
- DIPRES — Presupuesto Abierto (ejecucion presupuestaria)
- INE — Instituto Nacional de Estadisticas (empleo, precios)
- FMI — DataMapper / World Economic Outlook
- Banco Mundial — Open Data API
- OCDE — SDMX API (Chile es miembro)

La ingesta es batch (diaria o semanal), no en tiempo real. Cada fuente
tiene un fetcher independiente con su propia logica de normalizacion.

## Stack Tecnico

- **Frontend**: Next.js 16 (App Router), Tailwind CSS, Recharts
- **Backend/Datos**: Firebase Firestore (Admin SDK en server components)
- **Ingesta**: Scripts TypeScript via tsx, ejecutables via CLI o GitHub Actions
- **Hosting**: Vercel (free tier)
- **Idioma UI**: Espanol (es-CL), sin framework i18n
- **Costo objetivo**: ~$0 para MVP

## Governance

La constitution rige todas las decisiones de diseno y desarrollo del
proyecto. Los principios de Trazabilidad (I), Versionado (II) y
Reproducibilidad (IV) son innegociables y no pueden relajarse.

Enmiendas requieren:
1. Documentacion del cambio propuesto y su justificacion
2. Evaluacion de impacto en datos ya publicados
3. Actualizacion de este documento con versionado semantico

Versionado semantico:
- MAJOR: remocion o redefinicion de principios innegociables
- MINOR: nuevo principio o expansion material de guidance
- PATCH: clarificaciones, correccion de redaccion

**Version**: 1.0.0 | **Ratified**: 2026-04-05 | **Last Amended**: 2026-04-05
