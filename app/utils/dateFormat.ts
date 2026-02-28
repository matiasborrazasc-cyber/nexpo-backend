/**
 * Convierte una fecha (ISO, Date, o YYYY-MM-DD) a formato MySQL DATE (YYYY-MM-DD).
 * Evita el error ER_TRUNCATED_WRONG_VALUE cuando el frontend envía ISO (ej. 2020-02-20T03:00:00.000Z).
 */
export function toMySQLDate(value: string): string {
    if (!value || typeof value !== 'string') return '';
    const trimmed = value.trim();
    if (!trimmed) return '';
    if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed;
    const d = new Date(trimmed);
    if (isNaN(d.getTime())) return trimmed;
    return d.toISOString().slice(0, 10);
}
