import { cleanText } from "../parser/textCleaner.service";

export const extractMockClaims = (text: string) => {
  const normalized = cleanText(text).toLowerCase();
  return {
    partnerStatus: /official apple partner|official partner|authorized reseller/.exec(normalized)?.[0] ?? null,
    incorrectProductName: /iphone pro maxx/.exec(normalized)?.[0] ?? null,
    supportClaim: /lifetime support/.exec(normalized)?.[0] ?? null,
    disclaimerPresent: normalized.includes("trademark"),
    oldLogo: normalized.includes("old logo") || normalized.includes("legacy logo")
  };
};
