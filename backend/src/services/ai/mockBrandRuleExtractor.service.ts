export const extractMockBrandRules = (text: string) => {
  const normalized = text.toLowerCase();
  return {
    logoRule: normalized.includes("logo") ? "Use current approved logo only." : null,
    productNamingRule: normalized.includes("product") || normalized.includes("iphone") ? "Use approved product naming list." : null,
    disclaimerRule: normalized.includes("trademark") ? "Include required trademark disclaimer." : null,
    partnerLanguageRule: normalized.includes("partner") || normalized.includes("reseller")
      ? "Use approved reseller-status language only when verified."
      : null
  };
};
