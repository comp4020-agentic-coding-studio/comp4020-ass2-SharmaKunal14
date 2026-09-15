import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

// The published timetable is a promise: a one-hour Monday lecture and a
// two-hour Wednesday workshop, twelve weeks, one break week after week 6.
// Nothing in the build knows that, so a date edit could quietly move a
// workshop to a Tuesday or lose the break while every page still renders.
//
// Durations are read from structured frontmatter (`stages`, `investigation`),
// never parsed out of prose. A keyword search over a page body would pass on
// a sentence that merely mentions "40 minutes" and would say nothing about
// whether the published schedule adds up.

interface ApiNode {
  id: string;
  type: string;
  meta?: Record<string, unknown>;
}

const api = JSON.parse(
  readFileSync(resolve("dist/api/index.json"), "utf8"),
) as { nodes: ApiNode[] };

const byType = (type: string) => api.nodes.filter((n) => n.type === type);
const weekOf = (n: ApiNode) => Number(n.meta?.week);
const dateOf = (n: ApiNode) => String(n.meta?.date);
/** Bare `YYYY-MM-DD` calendar dates, compared as calendar dates. */
const day = (iso: string) => new Date(`${iso}T00:00:00Z`).getUTCDay();
const daysBetween = (a: string, b: string) =>
  (Date.parse(`${b}T00:00:00Z`) - Date.parse(`${a}T00:00:00Z`)) / 86_400_000;

const WEEKS = Array.from({ length: 12 }, (_, i) => i + 1);
const MONDAY = 1;
const WEDNESDAY = 3;

describe("teaching schedule", () => {
  it("has exactly one lecture and one workshop for each of twelve weeks", () => {
    for (const collection of ["lectures", "sessions"]) {
      const weeks = byType(collection).map(weekOf).sort((a, b) => a - b);
      expect(weeks, `${collection} week numbers`).toEqual(WEEKS);
    }
  });

  it("puts every lecture on a Monday and every workshop on a Wednesday", () => {
    for (const lecture of byType("lectures")) {
      expect(day(dateOf(lecture)), `${lecture.id} (${dateOf(lecture)})`).toBe(MONDAY);
    }
    for (const workshop of byType("sessions")) {
      expect(day(dateOf(workshop)), `${workshop.id} (${dateOf(workshop)})`).toBe(WEDNESDAY);
    }
  });

  it("pairs each workshop two days after its own week's lecture", () => {
    for (const week of WEEKS) {
      const lecture = byType("lectures").find((n) => weekOf(n) === week)!;
      const workshop = byType("sessions").find((n) => weekOf(n) === week)!;
      expect(
        daysBetween(dateOf(lecture), dateOf(workshop)),
        `week ${week}: ${dateOf(lecture)} -> ${dateOf(workshop)}`,
      ).toBe(2);
    }
  });

  it("keeps a break week between week 6 and week 7", () => {
    const lectureIn = (week: number) =>
      dateOf(byType("lectures").find((n) => weekOf(n) === week)!);
    // Teaching weeks are seven days apart; the break makes this gap fourteen.
    expect(daysBetween(lectureIn(6), lectureIn(7))).toBe(14);
    for (const week of WEEKS.slice(0, -1)) {
      if (week === 6) continue;
      expect(daysBetween(lectureIn(week), lectureIn(week + 1)), `weeks ${week}-${week + 1}`).toBe(7);
    }
  });

  it("publishes a workshop timetable that adds up", () => {
    for (const workshop of byType("sessions")) {
      const stages = workshop.meta?.stages as Record<string, number> | undefined;
      expect(stages, `${workshop.id} declares no stages`).toBeTypeOf("object");
      const total = Object.values(stages!).reduce((sum, n) => sum + n, 0);
      expect(total, `${workshop.id} stages`).toBe(120);
      expect(stages!.investigate, `${workshop.id} investigate stage`).toBe(40);

      const parts = workshop.meta?.investigation as number[] | undefined;
      expect(Array.isArray(parts), `${workshop.id} declares no investigation split`).toBe(true);
      expect(
        parts!.reduce((sum, n) => sum + n, 0),
        `${workshop.id} investigation subtasks`,
      ).toBe(40);
    }
  });
});
