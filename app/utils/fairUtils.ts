/** Extrae el UUID de fair de forma segura (string o {uuid, name}) */
export function getFairUuid(fair: any): string | null {
    if (fair == null || fair === undefined) return null;
    if (typeof fair === 'string' && fair.trim()) return fair.trim();
    if (typeof fair === 'object' && fair.uuid && typeof fair.uuid === 'string') return fair.uuid.trim();
    return null;
}

/** Convierte undefined a null para evitar errores SQL con mysql2 */
export const safe = (v: any) => (v === undefined ? null : v);
