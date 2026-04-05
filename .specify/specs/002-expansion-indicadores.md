# Feature Specification: Expansion de Indicadores

**Feature Branch**: `002-expansion-indicadores`
**Created**: 2026-04-05
**Status**: Draft
**Constitution**: v1.0.0

## Analisis de brechas

El MVP cubre ~40% del panorama macro relevante. Brechas criticas:

- **Sector externo vacio**: Chile es economia abierta (exportaciones ~30% PIB)
  y la categoria `externo` no tiene indicadores activos
- **Politica monetaria ausente**: IPC sin TPM es efecto sin causa
- **Actividad solo anual**: PIB anual no sirve para debate mensual
- **Desigualdad y dimension social ausentes**: Gini, pobreza, poder adquisitivo

---

## Fase 3 — Siguiente (P1, esfuerzo bajo)

### Indicador 6: IMACEC

- **Definicion**: Estimacion mensual de la variacion del PIB
- **Por que importa**: Primera senal de si la economia mejora o empeora.
  Cuando cae, hay menos ventas, menos produccion, mayor riesgo de despidos
- **Fuente**: mindicador.cl (`/api/imacec`) — Banco Central
- **Frecuencia**: Mensual
- **Que NO significa**:
  - NO es el PIB — es estimacion preliminar revisable
  - IMACEC positivo NO significa que todos los sectores crecen
  - Un mes alto NO implica tendencia positiva (efectos estacionales)
- **Nota tecnica**: Fetcher `mindicadorIMACEC` ya existe

### Indicador 7: TPM (Tasa de Politica Monetaria)

- **Definicion**: Tasa de interes de referencia del Banco Central para
  controlar la inflacion
- **Por que importa**: Cuando sube, suben los creditos hipotecarios, de
  consumo y comerciales. Afecta directamente cuanto paga cada chileno
  por su deuda
- **Fuente**: mindicador.cl (`/api/tpm`) — Banco Central
- **Frecuencia**: 8 decisiones al ano
- **Que NO significa**:
  - NO es la tasa de su credito (bancos agregan spread)
  - Baja de TPM NO significa que el BCCh "arreglo" la economia
  - TPM NO controla el dolar directamente
- **Nota tecnica**: Fetcher `mindicadorTPM` ya existe

### Indicador 8: Tipo de Cambio Dolar

- **Definicion**: Precio del dolar en pesos chilenos (tipo de cambio
  observado del Banco Central)
- **Por que importa**: Chile importa combustibles, alimentos procesados,
  tecnologia. Dolar alto encarece estos bienes
- **Fuente**: mindicador.cl (`/api/dolar`) — Banco Central
- **Frecuencia**: Diaria
- **Que NO significa**:
  - Dolar alto NO siempre es malo (beneficia exportadores)
  - NO depende solo de Chile (condiciones globales, Fed, cobre)
  - El Banco Central NO fija el dolar (tipo de cambio flotante desde 1999)
- **Nota tecnica**: Fetcher `mindicadorDolar` ya existe

### Indicador 9: Precio del Cobre

- **Definicion**: Precio de la libra de cobre (LME). Chile es el mayor
  productor mundial; el cobre es ~50% de las exportaciones
- **Por que importa**: Cuando sube, el fisco recauda mas, el dolar baja,
  la economia se dinamiza. Cuando cae, ocurre lo contrario
- **Fuente**: mindicador.cl (`/api/libra_de_cobre`) — LME/Cochilco
- **Frecuencia**: Diaria
- **Que NO significa**:
  - Cobre alto NO significa que Chile es rico (distribucion desigual)
  - Chile NO controla el precio (demanda global, especialmente China)
  - Cobre NO es "todo" (~10-12% PIB directo, pero impacto fiscal
    y cambiario desproporcionado)
- **Nota tecnica**: Requiere nuevo fetcher `mindicadorCobre`

### Derivado 1: Indice de Presion Inflacionaria

- **Formula**: Panel comparativo IPC (12 meses) + TPM + variacion dolar
  (12 meses), con banda de meta de inflacion BCCh (3% +/- 1pp)
- **Fuentes**: IPC (existente) + TPM (nuevo) + Dolar (nuevo)
- **Por que importa**: Muestra no solo si los precios subieron, sino POR
  QUE (dolar caro = inflacion importada vs. TPM baja = exceso de demanda)
  y que esta haciendo el BCCh al respecto

---

## Fase 4 — Despues (P2, esfuerzo medio)

### Indicador 10: Balanza Comercial

- **Definicion**: Diferencia entre exportaciones e importaciones en USD
- **Fuente**: World Bank (`NE.RSB.GNFS.ZS`) / Banco Central
- **Que NO significa**: Deficit NO es quiebra; superavit NO es siempre bueno

### Indicador 11: Ingresos del Gobierno (% PIB)

- **Definicion**: Total recaudado (impuestos + CODELCO + contribuciones)
- **Fuente**: IMF (`GGR_NGDP`) — fetcher `imfGovRevenue` ya existe
- **Que NO significa**: Mas ingresos NO es siempre mas impuestos

### Indicador 12: Gasto del Gobierno (% PIB)

- **Definicion**: Total gastado (corriente + capital)
- **Fuente**: IMF (`GGX_NGDP`) — fetcher `imfGovExpenditure` ya existe
- **Que NO significa**: Gastar menos que OECD NO es gastar mal

### Indicador 13: Cuenta Corriente (% PIB)

- **Definicion**: Todas las transacciones economicas con el exterior
- **Fuente**: IMF (`BCA_NGDPD`)
- **Que NO significa**: Deficit NO es deuda; puede ser inversion extranjera

### Derivado 2: Dependencia Fiscal del Cobre

- **Formula**: Correlacion ingresos gobierno vs precio cobre (scatter +
  serie temporal dual)
- **Fuentes**: IMF (ingresos) + mindicador (cobre)
- **Por que importa**: Muestra cuanto del presupuesto depende de un
  commodity volatil que Chile no controla

---

## Fase 5 — Futuro (P2-P3, esfuerzo alto)

### Indicador 14: Desigualdad (Gini)

- **Fuente**: World Bank (`SI.POV.GINI`) — frecuencia irregular
- **Chile ~45 vs OECD ~31**: tema central del debate social

### Indicador 15: Tasa de Pobreza

- **Fuente**: World Bank (`SI.POV.NAHC`) + CASEN
- **Chile paso de ~45% (1990) a ~6.5% (2022)**

### Derivado 3: Poder Adquisitivo del Salario

- **Formula**: Indice remuneraciones reales INE / IPC
- **Responde**: "Me alcanza mas o menos que antes?"

### Derivado 4: Vulnerabilidad Externa

- **Formula**: Cuenta corriente + deuda externa + reservas/importaciones
- **Requiere**: API Banco Central (registro gratuito)

### Derivado 5: Brecha PIB Potencial

- **Formula**: PIB real vs PIB potencial BCCh
- **Requiere**: Datos IPoM (posiblemente manual)

---

## Las 10 preguntas del ciudadano

La combinacion completa responde:

1. Estan subiendo los precios? → IPC
2. Por que suben? → TPM + Dolar + Cobre
3. Crece la economia? → PIB + IMACEC
4. Hay trabajo? → Desempleo
5. Cuanto debe el gobierno? → Deuda Publica
6. Gasta mas de lo que recibe? → Balance = Ingresos - Gasto
7. De donde viene la plata? → Ingresos + Dependencia del Cobre
8. Estamos bien comparados? → Benchmarks OECD en todos
9. La riqueza se reparte bien? → Gini + Pobreza
10. Me alcanza para vivir? → Poder Adquisitivo
