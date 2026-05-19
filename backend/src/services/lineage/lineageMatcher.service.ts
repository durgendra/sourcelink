import type { SourceObjectDocument } from "../../models/SourceObject.model";

const includesAny = (haystack: string, needles: string[]) =>
  needles.some((needle) => haystack.includes(needle.toLowerCase()));

export const matchSourceInText = (source: SourceObjectDocument, text: string) => {
  const normalized = text.toLowerCase();
  const bySourceName = normalized.includes(source.name.toLowerCase());
  const partnerLanguage = includesAny(normalized, ["official apple partner", "authorized reseller", "official partner"]);
  const disclaimerGap = includesAny(normalized, ["iphone", "apple"]) && !normalized.includes("trademark");
  const oldLogo = Boolean((text as string).match(/old logo|legacy logo/i));
  const productNameIssue = normalized.includes("iphone pro maxx");
  const supportClaim = normalized.includes("lifetime support");

  return {
    isMatch: bySourceName || partnerLanguage || disclaimerGap || oldLogo || productNameIssue || supportClaim,
    reasons: {
      partnerLanguage,
      disclaimerGap,
      oldLogo,
      productNameIssue,
      supportClaim
    }
  };
};
