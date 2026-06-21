import { describe, expect, it } from "vitest";
import {
  parseExplainInput,
  parseStructuredExplanation,
  structuredToLegacyText,
} from "./explainSchema";

describe("parseStructuredExplanation", () => {
  it("parses valid JSON with SWOT and summary", () => {
    const raw = {
      swot: {
        strengths: [{ text: "Gap of **120 L**" }],
        weaknesses: [{ text: "Low recent average" }],
        opportunities: [{ text: "Trade spend allocated" }],
        threats: [{ text: "High saturation" }],
      },
      summary: ["First paragraph.", "Second paragraph."],
    };
    const result = parseStructuredExplanation(raw);
    expect(result?.swot.strengths[0].text).toBe("Gap of **120 L**");
    expect(result?.summary).toHaveLength(2);
  });

  it("accepts metric refs on SWOT items", () => {
    const raw = {
      swot: {
        strengths: [{ text: "Strong gap", refs: [{ kind: "metric", key: "gapLiters" }] }],
        weaknesses: [],
        opportunities: [],
        threats: [],
      },
      summary: ["Summary."],
    };
    const result = parseStructuredExplanation(raw);
    expect(result?.swot.strengths[0].refs?.[0]).toEqual({ kind: "metric", key: "gapLiters" });
  });

  it("returns null for invalid input", () => {
    expect(parseStructuredExplanation(null)).toBeNull();
    expect(parseStructuredExplanation("{bad json")).toBeNull();
    expect(parseStructuredExplanation({ swot: {} })).toBeNull();
  });
});

describe("parseExplainInput", () => {
  it("falls back to legacy SWOT text format", () => {
    const legacy = [
      "SWOT ANALYSIS",
      "Strengths:",
      "- Strong predicted volume",
      "Weaknesses:",
      "- Limited history",
      "Opportunities:",
      "- Seasonal uplift",
      "Threats:",
      "- Competition",
      "",
      "BUSINESS SUMMARY",
      "",
      "This outlet shows **uplift** potential.",
    ].join("\n");

    const result = parseExplainInput(legacy);
    expect(result?.swot.strengths[0].text).toContain("Strong predicted volume");
    expect(result?.summary[0]).toContain("uplift");
  });
});

describe("structuredToLegacyText", () => {
  it("round-trips to legacy section headers", () => {
    const structured = parseStructuredExplanation({
      swot: {
        strengths: [{ text: "A" }],
        weaknesses: [{ text: "B" }],
        opportunities: [{ text: "C" }],
        threats: [{ text: "D" }],
      },
      summary: ["Summary line."],
    });
    expect(structured).not.toBeNull();
    const text = structuredToLegacyText(structured!);
    expect(text).toContain("SWOT ANALYSIS");
    expect(text).toContain("BUSINESS SUMMARY");
    expect(text).toContain("Summary line.");
  });
});
