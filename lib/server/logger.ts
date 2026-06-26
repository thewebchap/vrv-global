import "server-only";

/** Minimal structured logger for integration jobs. Swap for pino/winston later. */
type Level = "info" | "warn" | "error";

function emit(level: Level, scope: string, msg: string, meta?: unknown) {
  const line = `[${new Date().toISOString()}] [${level.toUpperCase()}] [${scope}] ${msg}`;
  const fn = level === "error" ? console.error : level === "warn" ? console.warn : console.log;
  if (meta !== undefined) fn(line, meta);
  else fn(line);
}

export function createLogger(scope: string) {
  return {
    info: (msg: string, meta?: unknown) => emit("info", scope, msg, meta),
    warn: (msg: string, meta?: unknown) => emit("warn", scope, msg, meta),
    error: (msg: string, meta?: unknown) => emit("error", scope, msg, meta),
  };
}
