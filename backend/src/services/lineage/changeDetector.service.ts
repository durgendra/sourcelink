import type { SourceVersionDocument } from "../../models/SourceVersion.model";

export const detectChange = (previousVersion: SourceVersionDocument | null, nextText: string) => {
  if (!previousVersion) {
    return { changed: true, deltaSummary: ["Initial source version created"] };
  }

  const oldText = previousVersion.sourceText;
  if (oldText === nextText) {
    return { changed: false, deltaSummary: ["No text change detected"] };
  }

  const deltaSummary: string[] = [];
  if (/official partner/i.test(oldText) && !/official partner/i.test(nextText)) {
    deltaSummary.push("Partner affiliation language restricted");
  }
  if (/authorized reseller/i.test(nextText)) {
    deltaSummary.push("Approved reseller language retained");
  }
  if (/trademark/i.test(nextText) && !/trademark/i.test(oldText)) {
    deltaSummary.push("Trademark disclaimer updated");
  }

  if (!deltaSummary.length) {
    deltaSummary.push("Source text materially changed");
  }

  return { changed: true, deltaSummary };
};
