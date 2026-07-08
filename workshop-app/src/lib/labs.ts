export const WORKSHOP_LAB_IDS = [
  "lab-01",
  "lab-02",
  "lab-03",
  "lab-04",
  "lab-05",
  "lab-06",
  "lab-07",
  "lab-08",
  "lab-09",
  "lab-10",
] as const;

export type WorkshopLabId = (typeof WORKSHOP_LAB_IDS)[number];
export type LabQuestionId = WorkshopLabId | "general";
export type LabInterest = WorkshopLabId | "all";

export type LabProgressStatus = "not_started" | "in_progress" | "completed";

export function labNumber(labId: WorkshopLabId): number {
  return Number.parseInt(labId.replace("lab-", ""), 10);
}

export function compareLabIds(a: WorkshopLabId, b: WorkshopLabId): number {
  return labNumber(a) - labNumber(b);
}

export function maxLabId(a: WorkshopLabId | null, b: WorkshopLabId): WorkshopLabId {
  if (!a) return b;
  return compareLabIds(a, b) >= 0 ? a : b;
}

export function formatDuration(seconds: number): string {
  if (seconds <= 0) return "0s";
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  if (minutes < 60) {
    return remainder > 0 ? `${minutes}m ${remainder}s` : `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

export function sumCompletedLabDurations(
  rows: { status: string; duration_seconds: number | null }[]
): number {
  return rows.reduce(
    (sum, row) =>
      sum + (row.status === "completed" && row.duration_seconds ? row.duration_seconds : 0),
    0
  );
}

export function labLabel(labId: WorkshopLabId | LabQuestionId | "all"): string {
  if (labId === "general") return "General / Q&A";
  if (labId === "all") return "All labs";
  return `Lab ${labNumber(labId as WorkshopLabId)}`;
}
