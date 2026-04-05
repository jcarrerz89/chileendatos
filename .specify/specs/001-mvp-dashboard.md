# Feature Specification: MVP Dashboard Economico

**Feature Branch**: `001-mvp-dashboard`
**Created**: 2026-04-05
**Status**: In Progress
**Constitution**: v1.0.0

## User Scenarios & Testing

### User Story 1 - Ver resumen de indicadores economicos (Priority: P1)

Un ciudadano chileno accede al dashboard y ve de un vistazo el estado
de los principales indicadores economicos del pais: inflacion, PIB,
deuda publica, balance fiscal y desempleo. Cada indicador muestra su
valor actual, tendencia reciente (sparkline), y variacion porcentual.

**Why this priority**: Es la razon de existir del proyecto. Sin esta
vista, no hay producto.

**Independent Test**: Acceder a la URL raiz y verificar que se muestran
5 cards con datos reales de Firestore.

**Acceptance Scenarios**:

1. **Given** datos de 5 indicadores en Firestore, **When** un usuario
   accede a `/`, **Then** ve una grilla con 5 IndicatorCards mostrando
   valor actual, sparkline de ultimos 12 periodos, y variacion %.
2. **Given** Firestore no tiene datos, **When** un usuario accede a `/`,
   **Then** ve un mensaje indicando que se necesita ejecutar la ingesta.

---

### User Story 2 - Explorar detalle de un indicador (Priority: P1)

Un usuario hace click en un indicador y ve su serie historica completa
en un grafico, la fuente oficial con enlace directo, fecha de obtencion,
y metodologia de calculo.

**Why this priority**: La trazabilidad es el diferenciador del proyecto
(Principio I). Sin la pagina de detalle, los datos no son verificables.

**Independent Test**: Navegar a `/indicadores/inflacion-ipc` y verificar
que muestra grafico, valor actual, y enlace a la fuente original.

**Acceptance Scenarios**:

1. **Given** datos de inflacion-ipc en Firestore, **When** usuario
   navega a `/indicadores/inflacion-ipc`, **Then** ve TimeSeriesChart
   con serie historica, valor actual destacado, SourceAttribution con
   nombre de fuente, URL clickeable, y fecha de obtencion.
2. **Given** un indicador derivado con formula, **When** usuario ve su
   detalle, **Then** ve la formula y los indicadores componentes.
3. **Given** un slug inexistente, **When** usuario navega a
   `/indicadores/no-existe`, **Then** ve pagina 404.

---

### User Story 3 - Comparar Chile con otros paises (Priority: P2)

Un usuario quiere poner en perspectiva un indicador chileno comparandolo
con paises OCDE y Latinoamerica. Accede a la pagina de comparacion y ve
graficos de barras donde Chile esta destacado visualmente.

**Why this priority**: El contexto comparativo es esencial para combatir
desinformacion (Principio V), pero el dashboard funciona sin el.

**Independent Test**: Acceder a `/comparacion` y verificar que muestra
al menos 3 graficos comparativos con Chile destacado en rojo.

**Acceptance Scenarios**:

1. **Given** datos comparativos disponibles, **When** usuario accede a
   `/comparacion`, **Then** ve graficos de barras horizontales con Chile
   destacado en color rojo (#D52B1E) para deuda/PIB, crecimiento PIB,
   y desempleo.

---

### User Story 4 - Verificar fuentes y metodologia (Priority: P2)

Un usuario esceptico quiere entender de donde vienen los datos y como
se calculan. Accede a la pagina de metodologia y ve cada fuente con su
descripcion, URL de API, y los indicadores que alimenta.

**Why this priority**: Cumple los principios de Reproducibilidad (IV) y
Anti-Desinformacion (VI). Es lo que da credibilidad al proyecto.

**Independent Test**: Acceder a `/metodologia` y verificar que lista las
7 fuentes de datos con enlaces funcionales.

**Acceptance Scenarios**:

1. **Given** la pagina de metodologia, **When** usuario accede a
   `/metodologia`, **Then** ve principios de datos (trazabilidad,
   versionado, transparencia, reproducibilidad) y 7 fuentes con nombre,
   descripcion, indicadores usados, y enlace a API/datos abiertos.

---

### User Story 5 - Ingestar datos desde fuentes oficiales (Priority: P1)

Un operador del sistema ejecuta un comando CLI para obtener datos de las
fuentes oficiales, normalizarlos, y almacenarlos en Firestore con
versionado completo.

**Why this priority**: Sin ingesta no hay datos. Es prerequisito de todo
lo demas.

**Independent Test**: Ejecutar `npx tsx src/ingestion/runner.ts --all
--from=2020-01-01` y verificar que Firestore tiene documentos nuevos en
las subcolecciones de datapoints.

**Acceptance Scenarios**:

1. **Given** fuentes API disponibles, **When** operador ejecuta el runner
   con `--indicator=inflacion-ipc`, **Then** obtiene datos de
   mindicador.cl, los normaliza (valor, unidad, fechas, fuente URL,
   granularidad, metodologia), y los escribe en Firestore.
2. **Given** un dato ya existente con mismo valor, **When** se ejecuta
   ingesta, **Then** solo actualiza `acquiredAt`, no crea version nueva.
3. **Given** un dato existente con valor diferente, **When** se ejecuta
   ingesta, **Then** archiva la version anterior en subcollection
   `versions/`, incrementa el numero de version, y actualiza el doc
   principal.
4. **Given** una fuente que retorna error, **When** se ejecuta ingesta,
   **Then** registra el error en `ingestion_logs` y continua con el
   siguiente indicador.

---

### Edge Cases

- Que pasa cuando mindicador.cl retorna HTTP 500 para ciertos anos?
  → El runner registra el error y continua. No se pierden datos previos.
- Que pasa cuando el Banco Mundial no tiene datos para un indicador de Chile?
  → Se usa fuente alternativa (FMI). El sistema soporta multiples fuentes
  por indicador.
- Que pasa cuando Firestore no esta configurado?
  → La home page muestra un placeholder con instrucciones de setup.
- Que pasa cuando un indice compuesto no existe?
  → Firestore retorna error descriptivo con link para crearlo.

## Requirements

### Functional Requirements

- **FR-001**: El sistema DEBE mostrar 5 indicadores MVP (inflacion IPC,
  crecimiento PIB, deuda publica % PIB, balance fiscal, desempleo) en la
  pagina principal con valor actual y tendencia.
- **FR-002**: Cada dato DEBE almacenarse con: valor, unidad, fecha de
  referencia, fecha de obtencion, fuente, URL verificable, granularidad,
  y nota metodologica (Principio VII).
- **FR-003**: El sistema DEBE versionar datos: nunca sobrescribir, archivar
  versiones anteriores cuando una fuente corrige retroactivamente
  (Principio II).
- **FR-004**: Cada indicador DEBE mostrar un enlace directo a la fuente
  oficial donde el usuario puede verificar el dato (Principio I).
- **FR-005**: El sistema DEBE soportar ingesta batch via CLI con flags
  `--indicator`, `--all`, `--from`, `--to`.
- **FR-006**: La pagina de comparacion DEBE mostrar Chile destacado
  visualmente respecto a paises OCDE y Latam (Principio V).
- **FR-007**: La pagina de metodologia DEBE listar todas las fuentes con
  descripcion, URL, e indicadores que alimentan (Principio IV).
- **FR-008**: Las reglas de Firestore DEBE permitir lectura publica y
  restringir escritura a Admin SDK.
- **FR-009**: El sistema DEBE registrar cada ejecucion de ingesta en
  `ingestion_logs` con status, puntos procesados, y errores.
- **FR-010**: La UI DEBE estar en espanol (es-CL) con formatos de numero
  y fecha chilenos.

### Key Entities

- **Indicator**: Metadata de un indicador (slug, nombre, descripcion,
  unidad, categoria, fuentes, formula, displayOrder).
- **DataPoint**: Un valor para un periodo especifico de un indicador.
  Incluye todos los campos del modelo normalizado (FR-002). Identificado
  por `{indicatorId}/datapoints/{periodId}`.
- **DataPointVersion**: Version historica de un DataPoint, almacenada en
  subcollection `versions/`. Preserva valor anterior cuando la fuente
  corrige retroactivamente.
- **IngestionLog**: Registro de una ejecucion de ingesta con status y
  metricas.
- **Source**: Registro de una fuente de datos con estado de salud.

## Success Criteria

### Measurable Outcomes

- **SC-001**: El dashboard muestra 5 indicadores con datos reales en la
  pagina principal al acceder via navegador.
- **SC-002**: Cada indicador tiene un enlace clickeable que lleva
  directamente a la fuente oficial del dato.
- **SC-003**: La ingesta de todos los indicadores completa en menos de
  2 minutos via CLI.
- **SC-004**: Los datos cubren al menos desde 2015 para indicadores
  anuales y desde 2024 para mensuales.
- **SC-005**: La pagina de comparacion muestra a Chile en contexto con
  al menos 8 paises de referencia.
- **SC-006**: El sitio carga en menos de 3 segundos (ISR con revalidate
  de 1 hora).
- **SC-007**: El costo de hosting y base de datos es $0 (free tier).

## Assumptions

- Los usuarios tienen conexion a internet estable.
- Las APIs de las fuentes oficiales estan disponibles (uptime razonable).
- El registro en la API del Banco Central de Chile es gratuito y se
  obtiene en menos de 48 horas.
- Soporte movil basico via responsive design de Tailwind (no app nativa).
- Internacionalizacion (multi-idioma) fuera de scope para MVP.
- Autenticacion de usuarios fuera de scope (dashboard 100% publico).
