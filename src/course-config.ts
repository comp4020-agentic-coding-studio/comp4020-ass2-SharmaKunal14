import type { CourseMetaInput } from "astro-course-university";
import { z } from "astro/zod";

// The level digits ANU uses: 1000--4000 undergraduate, 6000 and 8000
// postgraduate. Both the code pattern and the level field derive from this.
const LEVELS = [1, 2, 3, 4, 6, 8] as const;
const allowedCode = new RegExp(`^SLOP[${LEVELS.join("")}]\\d{3}$`);

export const slopCourseMetaSchema = z
  .strictObject({
    code: z.string().regex(allowedCode, {
      message: "use SLOP plus a 1000–4000, 6000 or 8000 level code",
    }),
    title: z.string().trim().min(1).max(100),
    session: z.string().trim().min(1).max(40),
    year: z.number().int().min(2026).max(2200),
    level: z.literal(LEVELS),
    startDate: z.iso.date(),
    endDate: z.iso.date(),
    description: z.string().trim().min(80).max(300),
    tags: z.array(z.string().trim().min(2).max(24)).min(1).max(3),
    // Added to the template's record schema. `courseMetaSchema` in
    // astro-course-university already accepts learning outcomes and emits
    // them on /api/index.json; the template's local schema is strict and
    // omitted them, so they had nowhere to live but prose. Declaring them
    // here makes them course data the catalogue can read, and keeps one
    // source of truth for the five outcomes every assessment maps to.
    learningOutcomes: z.array(z.string().trim().min(1)).min(1).max(8),
  })
  .superRefine((course, ctx) => {
    const codeLevel = Number(course.code.at(4));
    if (course.level !== codeLevel) {
      ctx.addIssue({
        code: "custom",
        path: ["level"],
        message: `must match ${course.code}'s first digit (${codeLevel})`,
      });
    }
    if (course.startDate > course.endDate) {
      ctx.addIssue({
        code: "custom",
        path: ["startDate"],
        message: "must not be after endDate",
      });
    }
  });

// The single source of truth for the course record. The generated homepage,
// navigation label and /api/index.json all read this object.
//
// Teaching runs 2027-02-22 to 2027-05-19 (twelve weeks, one break week
// commencing 2027-04-05). The record ends on 2027-06-07 so the final
// assessment deadline falls inside the course period; the last teaching
// week and the last deadline are deliberately different dates.
export const courseMeta = slopCourseMetaSchema.parse({
  code: "SLOP8350",
  title: "Generation Loss",
  session: "Semester 1",
  year: 2027,
  level: 8,
  startDate: "2027-02-22",
  endDate: "2027-06-07",
  description:
    "Copies leave clues. In this course, you will investigate what changes " +
    "when recordings, images and texts are copied, reconstruct possible " +
    "histories from incomplete evidence, and decide what is worth preserving.",
  tags: ["media archaeology", "provenance", "information"],
  learningOutcomes: [
    "Characterise changes caused by a copying process using reproducible measurements and controls.",
    "Construct and compare plausible copying histories, marking unresolved relationships.",
    "Evaluate whether a feature supports a provenance claim or has another explanation.",
    "Evaluate a restoration or preservation claim against the available evidence.",
    "Defend a preservation decision with explicit costs, assumptions and tradeoffs.",
  ],
}) satisfies CourseMetaInput;
