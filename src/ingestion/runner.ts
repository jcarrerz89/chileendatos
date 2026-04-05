import { getIndicatorIngestion, getAllIndicatorIds, INDICATORS } from './indicators';
import { normalize, periodIdFromDate } from './core/normalize';
import { writeDataPoint } from './core/versioning';
import { createIngestionLog, completeIngestionLog } from './core/logger';

interface RunOptions {
  indicator?: string;
  all?: boolean;
  from?: string;
  to?: string;
}

function parseArgs(): RunOptions {
  const args = process.argv.slice(2);
  const options: RunOptions = {};

  for (const arg of args) {
    if (arg === '--all') {
      options.all = true;
    } else if (arg.startsWith('--indicator=')) {
      options.indicator = arg.split('=')[1];
    } else if (arg.startsWith('--from=')) {
      options.from = arg.split('=')[1];
    } else if (arg.startsWith('--to=')) {
      options.to = arg.split('=')[1];
    }
  }

  return options;
}

async function ingestIndicator(
  indicatorId: string,
  from?: Date,
  to?: Date
): Promise<void> {
  const config = getIndicatorIngestion(indicatorId);
  if (!config) {
    console.error(`Indicador desconocido: ${indicatorId}`);
    return;
  }

  console.log(`\n--- Ingesta: ${indicatorId} ---`);

  // Use the first source (primary)
  const source = config.sources[0];
  const logId = await createIngestionLog(indicatorId, source.sourceId);

  try {
    const rawPoints = await source.fetch({
      startDate: from,
      endDate: to,
    });

    console.log(`  Puntos obtenidos: ${rawPoints.length}`);

    let created = 0;
    let updated = 0;
    let unchanged = 0;

    for (const raw of rawPoints) {
      const normalized = normalize(raw, {
        granularity: config.granularity,
        source: source.sourceId,
        methodology: config.methodology,
      });

      const result = await writeDataPoint(indicatorId, normalized);

      if (result.action === 'created') created++;
      else if (result.action === 'updated') updated++;
      else unchanged++;
    }

    console.log(`  Creados: ${created}, Actualizados: ${updated}, Sin cambio: ${unchanged}`);

    await completeIngestionLog(logId, {
      status: 'success',
      pointsProcessed: rawPoints.length,
      pointsUpdated: created + updated,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`  Error: ${message}`);

    await completeIngestionLog(logId, {
      status: 'error',
      pointsProcessed: 0,
      pointsUpdated: 0,
      error: message,
    });
  }
}

async function main(): Promise<void> {
  const options = parseArgs();

  const from = options.from ? new Date(options.from) : undefined;
  const to = options.to ? new Date(options.to) : undefined;

  if (options.all) {
    const ids = getAllIndicatorIds();
    console.log(`Ingesta de todos los indicadores: ${ids.join(', ')}`);
    for (const id of ids) {
      await ingestIndicator(id, from, to);
    }
  } else if (options.indicator) {
    await ingestIndicator(options.indicator, from, to);
  } else {
    console.log('Uso:');
    console.log('  npx tsx src/ingestion/runner.ts --indicator=inflacion-ipc');
    console.log('  npx tsx src/ingestion/runner.ts --all');
    console.log('  npx tsx src/ingestion/runner.ts --all --from=2020-01-01');
    console.log('');
    console.log('Indicadores disponibles:');
    for (const id of getAllIndicatorIds()) {
      console.log(`  - ${id}`);
    }
  }
}

main().catch(console.error);
